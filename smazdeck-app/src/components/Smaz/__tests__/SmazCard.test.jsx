import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import SmazCard from '../SmazCard';

// Mock the Card component
vi.mock('../../ui/Card', () => ({
  default: ({ children, className }) => (
    <div data-testid="card" className={className}>
      {children}
    </div>
  ),
}));

const mockSmaz = {
  id: 'smaz-1',
  name: 'Test Smaz',
  slug: 'test-smaz',
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

  it('applies hover and focus styles', () => {
    renderWithRouter(<SmazCard smaz={mockSmaz} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveClass('hover:scale-105', 'focus:scale-105', 'focus:ring-2', 'focus:ring-amber-400');
  });

  it('handles image loading error gracefully', () => {
    renderWithRouter(<SmazCard smaz={mockSmaz} />);
    
    const image = screen.getByAltText('Test Smaz portrait');
    fireEvent.error(image);
    
    // Image should be hidden and fallback should be shown
    expect(image.style.display).toBe('none');
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

  it('applies Card component with correct styling', () => {
    renderWithRouter(<SmazCard smaz={mockSmaz} />);
    
    const card = screen.getByTestId('card');
    expect(card).toHaveClass('hover:border-amber-400');
  });
});