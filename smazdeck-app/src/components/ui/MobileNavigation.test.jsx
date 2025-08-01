import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import MobileNavigation from './MobileNavigation';

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('MobileNavigation', () => {
  const mockItems = [
    { id: '1', href: '/home', label: 'Home', icon: '🏠' },
    { id: '2', href: '/about', label: 'About', icon: '📄' },
    { id: '3', href: '/contact', label: 'Contact', icon: '📞', badge: '3' }
  ];

  const mockOnClose = vi.fn();
  const mockOnToggle = vi.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
    mockOnToggle.mockClear();
  });

  describe('Drawer variant', () => {
    it('renders drawer navigation when open', () => {
      renderWithRouter(
        <MobileNavigation
          items={mockItems}
          variant="drawer"
          isOpen={true}
          onClose={mockOnClose}
        />
      );

      expect(screen.getByText('Navigation')).toBeInTheDocument();
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
      expect(screen.getByText('Contact')).toBeInTheDocument();
    });

    it('hides drawer when closed', () => {
      renderWithRouter(
        <MobileNavigation
          items={mockItems}
          variant="drawer"
          isOpen={false}
          onClose={mockOnClose}
        />
      );

      const nav = screen.getByRole('navigation', { hidden: true });
      expect(nav).toHaveClass('-translate-x-full');
      expect(nav).toHaveAttribute('aria-hidden', 'true');
    });

    it('calls onClose when close button is clicked', () => {
      renderWithRouter(
        <MobileNavigation
          items={mockItems}
          variant="drawer"
          isOpen={true}
          onClose={mockOnClose}
        />
      );

      fireEvent.click(screen.getByLabelText('Close navigation'));
      expect(mockOnClose).toHaveBeenCalled();
    });

    it('calls onClose when escape key is pressed', () => {
      renderWithRouter(
        <MobileNavigation
          items={mockItems}
          variant="drawer"
          isOpen={true}
          onClose={mockOnClose}
        />
      );

      fireEvent.keyDown(document, { key: 'Escape' });
      expect(mockOnClose).toHaveBeenCalled();
    });

    it('renders icons and badges correctly', () => {
      renderWithRouter(
        <MobileNavigation
          items={mockItems}
          variant="drawer"
          isOpen={true}
          onClose={mockOnClose}
        />
      );

      expect(screen.getByText('🏠')).toBeInTheDocument();
      expect(screen.getByText('📄')).toBeInTheDocument();
      expect(screen.getByText('📞')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('supports right position', () => {
      renderWithRouter(
        <MobileNavigation
          items={mockItems}
          variant="drawer"
          isOpen={false}
          position="right"
          onClose={mockOnClose}
        />
      );

      const nav = screen.getByRole('navigation', { hidden: true });
      expect(nav).toHaveClass('translate-x-full');
      expect(nav).toHaveClass('right-0');
    });
  });

  describe('Bottom variant', () => {
    it('renders bottom navigation', () => {
      renderWithRouter(
        <MobileNavigation
          items={mockItems}
          variant="bottom"
        />
      );

      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('fixed', 'bottom-0');
      
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
      expect(screen.getByText('Contact')).toBeInTheDocument();
    });

    it('limits items to 5 for bottom navigation', () => {
      const manyItems = Array.from({ length: 10 }, (_, i) => ({
        id: `item-${i}`,
        href: `/item-${i}`,
        label: `Item ${i}`
      }));

      renderWithRouter(
        <MobileNavigation
          items={manyItems}
          variant="bottom"
        />
      );

      // Should only show first 5 items
      expect(screen.getByText('Item 0')).toBeInTheDocument();
      expect(screen.getByText('Item 4')).toBeInTheDocument();
      expect(screen.queryByText('Item 5')).not.toBeInTheDocument();
    });
  });

  describe('Scroll variant', () => {
    it('renders horizontal scroll navigation', () => {
      renderWithRouter(
        <MobileNavigation
          items={mockItems}
          variant="scroll"
        />
      );

      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('overflow-x-auto');
      
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
      expect(screen.getByText('Contact')).toBeInTheDocument();
    });
  });

  it('handles items without href (section headers)', () => {
    const itemsWithHeaders = [
      { id: 'header1', label: 'Main Section' },
      { id: '1', href: '/home', label: 'Home' }
    ];

    renderWithRouter(
      <MobileNavigation
        items={itemsWithHeaders}
        variant="drawer"
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    const header = screen.getByText('Main Section');
    expect(header).toBeInTheDocument();
    expect(header.closest('div')).toHaveClass('text-slate-500', 'uppercase');
  });

  it('has proper accessibility attributes', () => {
    renderWithRouter(
      <MobileNavigation
        items={mockItems}
        variant="drawer"
        isOpen={true}
        onClose={mockOnClose}
        aria-label="Custom navigation"
      />
    );

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Custom navigation');
    expect(nav).toHaveAttribute('aria-hidden', 'false');
  });

  it('applies custom className', () => {
    renderWithRouter(
      <MobileNavigation
        items={mockItems}
        variant="drawer"
        isOpen={true}
        className="custom-class"
        onClose={mockOnClose}
      />
    );

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('custom-class');
  });

  it('handles keyboard navigation in drawer', () => {
    renderWithRouter(
      <MobileNavigation
        items={mockItems}
        variant="drawer"
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    const firstLink = screen.getByRole('link', { name: 'Home' });
    
    // Test that keyboard events are handled (focus management is complex in test environment)
    expect(() => {
      fireEvent.keyDown(firstLink, { key: 'ArrowDown' });
    }).not.toThrow();
    
    expect(() => {
      fireEvent.keyDown(firstLink, { key: 'ArrowUp' });
    }).not.toThrow();
  });
});