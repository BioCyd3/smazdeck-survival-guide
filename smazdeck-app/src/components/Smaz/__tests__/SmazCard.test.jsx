import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import SmazCard from '../SmazCard';

// Mock the Card component
vi.mock('../../ui/Card', () => ({
  default: ({ children, className, ...props }) => (
    <div data-testid="card" className={className} {...props}>
      {children}
    </div>
  ),
}));

// Mock the ProgressBar component
vi.mock('../../ui/ProgressBar', () => ({
  default: ({ value, label, variant }) => (
    <div data-testid="progress-bar" data-value={value} data-label={label} data-variant={variant}>
      {label}: {value}%
    </div>
  ),
}));

// Mock the LoadingSpinner component
vi.mock('../../ui/LoadingSpinner', () => ({
  default: ({ size }) => (
    <div data-testid="loading-spinner" data-size={size}>
      Loading...
    </div>
  ),
}));

const mockSmaz = {
  id: 'smaz-1',
  name: 'Test Smaz',
  slug: 'test-smaz',
  skills: [
    {
      skill_name: 'Test Skill',
      description: 'A test skill with damage effects',
    },
    {
      skill_name: 'Rage Skill',
      description: 'A rage-based skill',
    },
  ],
};

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('SmazCard', () => {
  it('renders smaz name and image correctly', () => {
    renderWithRouter(<SmazCard smaz={mockSmaz} />);
    
    expect(screen.getByText('Test Smaz')).toBeInTheDocument();
    expect(screen.getByAltText('Test Smaz portrait')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/smaz/smaz-1');
  });

  it('has proper accessibility attributes', () => {
    renderWithRouter(<SmazCard smaz={mockSmaz} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('aria-label', 'View Test Smaz profile');
  });

  it('shows loading spinner initially', () => {
    renderWithRouter(<SmazCard smaz={mockSmaz} />);
    
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('handles image loading error gracefully', () => {
    renderWithRouter(<SmazCard smaz={mockSmaz} />);
    
    const image = screen.getByAltText('Test Smaz portrait');
    fireEvent.error(image);
    
    // Should show fallback SVG (look for the path element which is part of the SVG)
    const svgPath = document.querySelector('path[d*="M16 7a4 4 0 11-8 0"]');
    expect(svgPath).toBeInTheDocument();
  });

  it('displays skill count badge', () => {
    renderWithRouter(<SmazCard smaz={mockSmaz} />);
    
    expect(screen.getByText('2')).toBeInTheDocument(); // 2 skills
  });

  it('shows rage skill indicator when smaz has rage skill', () => {
    renderWithRouter(<SmazCard smaz={mockSmaz} />);
    
    expect(screen.getByText('⚡')).toBeInTheDocument();
  });

  it('displays stats when showStats prop is true', () => {
    renderWithRouter(<SmazCard smaz={mockSmaz} showStats />);
    
    expect(screen.getAllByTestId('progress-bar')).toHaveLength(3);
    expect(screen.getByText(/ATK:/)).toBeInTheDocument();
    expect(screen.getByText(/DEF:/)).toBeInTheDocument();
    expect(screen.getByText(/HP:/)).toBeInTheDocument();
  });

  it('shows stats on hover', async () => {
    renderWithRouter(<SmazCard smaz={mockSmaz} />);
    
    const link = screen.getByRole('link');
    fireEvent.mouseEnter(link);
    
    await waitFor(() => {
      expect(screen.getAllByTestId('progress-bar')).toHaveLength(3);
    });
  });

  it('shows quick info on hover', async () => {
    renderWithRouter(<SmazCard smaz={mockSmaz} />);
    
    const link = screen.getByRole('link');
    fireEvent.mouseEnter(link);
    
    await waitFor(() => {
      expect(screen.getByText('Skills')).toBeInTheDocument();
      expect(screen.getByText('Type')).toBeInTheDocument();
      expect(screen.getByText('Rage')).toBeInTheDocument();
    });
  });

  it('renders in compact mode', () => {
    renderWithRouter(<SmazCard smaz={mockSmaz} compact />);
    
    expect(screen.getByText('2 skills')).toBeInTheDocument();
    // Should not show stats in compact mode even on hover
    const link = screen.getByRole('link');
    fireEvent.mouseEnter(link);
    expect(screen.queryByTestId('progress-bar')).not.toBeInTheDocument();
  });

  it('uses correct image path with slug', () => {
    renderWithRouter(<SmazCard smaz={mockSmaz} />);
    
    const image = screen.getByAltText('Test Smaz portrait');
    expect(image).toHaveAttribute('src', '/images/smazs/test-smaz.png');
  });

  it('falls back to id for image path when slug is missing', () => {
    const smazWithoutSlug = { ...mockSmaz, slug: undefined };
    renderWithRouter(<SmazCard smaz={smazWithoutSlug} />);
    
    const image = screen.getByAltText('Test Smaz portrait');
    expect(image).toHaveAttribute('src', '/images/smazs/smaz-1.png');
  });

  it('returns null when smaz prop is missing', () => {
    const { container } = renderWithRouter(<SmazCard smaz={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('navigates to correct profile page', () => {
    renderWithRouter(<SmazCard smaz={mockSmaz} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/smaz/smaz-1');
  });

  it('handles smaz without skills', () => {
    const smazWithoutSkills = { ...mockSmaz, skills: [] };
    renderWithRouter(<SmazCard smaz={smazWithoutSkills} />);
    
    expect(screen.queryByText('⚡')).not.toBeInTheDocument();
    expect(screen.queryByText(/\d+/)).not.toBeInTheDocument(); // No skill count badge
  });
});