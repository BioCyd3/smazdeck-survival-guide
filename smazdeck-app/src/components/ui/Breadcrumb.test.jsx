import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Breadcrumb from './Breadcrumb';

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Breadcrumb', () => {
  const mockItems = [
    { label: 'Smazdex', href: '/smazdex' },
    { label: 'Pikachu', href: '/smazdex/pikachu' },
    { label: 'Profile' }
  ];

  it('renders breadcrumb items correctly', () => {
    renderWithRouter(<Breadcrumb items={mockItems} />);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Smazdex')).toBeInTheDocument();
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });

  it('renders with custom separator', () => {
    renderWithRouter(<Breadcrumb items={mockItems} separator=">" />);
    
    const separators = screen.getAllByText('>');
    expect(separators).toHaveLength(3); // Home > Smazdex > Pikachu > Profile
  });

  it('does not show home when showHome is false', () => {
    renderWithRouter(<Breadcrumb items={mockItems} showHome={false} />);
    
    expect(screen.queryByText('Home')).not.toBeInTheDocument();
    expect(screen.getByText('Smazdex')).toBeInTheDocument();
  });

  it('truncates items when maxItems is specified', () => {
    const manyItems = [
      { label: 'Home', href: '/' },
      { label: 'Level 1', href: '/level1' },
      { label: 'Level 2', href: '/level2' },
      { label: 'Level 3', href: '/level3' },
      { label: 'Level 4', href: '/level4' },
      { label: 'Current' }
    ];

    renderWithRouter(<Breadcrumb items={manyItems} maxItems={4} showHome={false} />);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('...')).toBeInTheDocument();
    expect(screen.getByText('Level 4')).toBeInTheDocument();
    expect(screen.getByText('Current')).toBeInTheDocument();
    expect(screen.queryByText('Level 1')).not.toBeInTheDocument();
  });

  it('renders with icons', () => {
    const itemsWithIcons = [
      { label: 'Home', href: '/', icon: '🏠' },
      { label: 'Current', icon: '📄' }
    ];

    renderWithRouter(<Breadcrumb items={itemsWithIcons} showHome={false} />);
    
    expect(screen.getByText('🏠')).toBeInTheDocument();
    expect(screen.getByText('📄')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    renderWithRouter(<Breadcrumb items={mockItems} />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Breadcrumb navigation');
    
    const currentPage = screen.getByText('Profile');
    expect(currentPage).toHaveAttribute('aria-current', 'page');
  });

  it('renders nothing when items array is empty', () => {
    const { container } = renderWithRouter(<Breadcrumb items={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('applies custom className', () => {
    const { container } = renderWithRouter(
      <Breadcrumb items={mockItems} className="custom-class" />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('handles items without href (non-clickable)', () => {
    const itemsWithoutHref = [
      { label: 'Clickable', href: '/clickable' },
      { label: 'Non-clickable' }
    ];

    renderWithRouter(<Breadcrumb items={itemsWithoutHref} showHome={false} />);
    
    const clickableLink = screen.getByRole('link', { name: 'Clickable' });
    expect(clickableLink).toBeInTheDocument();
    
    const nonClickable = screen.getByText('Non-clickable');
    expect(nonClickable).not.toHaveAttribute('href');
  });
});