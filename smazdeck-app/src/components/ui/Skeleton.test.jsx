import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { 
  Skeleton, 
  SkeletonText, 
  SkeletonAvatar, 
  SkeletonCard, 
  SkeletonTable 
} from './Skeleton';

describe('Skeleton', () => {
  it('renders with default props', () => {
    render(<Skeleton data-testid="skeleton" />);
    const skeleton = screen.getByTestId('skeleton');
    
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass('bg-slate-700', 'animate-pulse', 'rounded');
    expect(skeleton).toHaveAttribute('role', 'status');
    expect(skeleton).toHaveAttribute('aria-label', 'Loading...');
  });

  it('applies variant classes correctly', () => {
    render(<Skeleton variant="shimmer" data-testid="skeleton" />);
    const skeleton = screen.getByTestId('skeleton');
    
    expect(skeleton).toHaveClass('bg-slate-700', 'relative', 'overflow-hidden');
    expect(skeleton.querySelector('.animate-shimmer')).toBeInTheDocument();
  });

  it('applies size classes correctly', () => {
    render(<Skeleton size="lg" data-testid="skeleton" />);
    const skeleton = screen.getByTestId('skeleton');
    
    expect(skeleton).toHaveClass('h-6');
  });

  it('applies custom width and height', () => {
    render(<Skeleton width="1/2" height="20" data-testid="skeleton" />);
    const skeleton = screen.getByTestId('skeleton');
    
    expect(skeleton).toHaveClass('w-1/2', 'h-20');
  });

  it('can disable rounded corners', () => {
    render(<Skeleton rounded={false} data-testid="skeleton" />);
    const skeleton = screen.getByTestId('skeleton');
    
    expect(skeleton).not.toHaveClass('rounded');
  });

  it('applies custom className', () => {
    render(<Skeleton className="custom-class" data-testid="skeleton" />);
    const skeleton = screen.getByTestId('skeleton');
    
    expect(skeleton).toHaveClass('custom-class');
  });
});

describe('SkeletonText', () => {
  it('renders default number of lines', () => {
    render(<SkeletonText data-testid="skeleton-text" />);
    const container = screen.getByTestId('skeleton-text');
    const lines = container.querySelectorAll('[role="status"]');
    
    expect(lines).toHaveLength(3);
  });

  it('renders custom number of lines', () => {
    render(<SkeletonText lines={5} data-testid="skeleton-text" />);
    const container = screen.getByTestId('skeleton-text');
    const lines = container.querySelectorAll('[role="status"]');
    
    expect(lines).toHaveLength(5);
  });

  it('applies spacing classes correctly', () => {
    render(<SkeletonText spacing="loose" data-testid="skeleton-text" />);
    const container = screen.getByTestId('skeleton-text');
    
    expect(container).toHaveClass('space-y-3');
  });

  it('varies line widths for realistic appearance', () => {
    render(<SkeletonText lines={3} data-testid="skeleton-text" />);
    const container = screen.getByTestId('skeleton-text');
    const lines = container.querySelectorAll('[role="status"]');
    
    // Last line should have a different width class (w-3/4 for 3 lines)
    expect(lines[lines.length - 1]).toHaveClass('w-3/4');
  });
});

describe('SkeletonAvatar', () => {
  it('renders with default size', () => {
    render(<SkeletonAvatar data-testid="skeleton-avatar" />);
    const avatar = screen.getByTestId('skeleton-avatar');
    
    expect(avatar).toHaveClass('w-10', 'h-10', 'rounded-full');
  });

  it('applies size classes correctly', () => {
    render(<SkeletonAvatar size="xl" data-testid="skeleton-avatar" />);
    const avatar = screen.getByTestId('skeleton-avatar');
    
    expect(avatar).toHaveClass('w-16', 'h-16');
  });

  it('maintains circular shape', () => {
    render(<SkeletonAvatar data-testid="skeleton-avatar" />);
    const avatar = screen.getByTestId('skeleton-avatar');
    
    expect(avatar).toHaveClass('rounded-full');
  });
});

describe('SkeletonCard', () => {
  it('renders basic card structure', () => {
    render(<SkeletonCard data-testid="skeleton-card" />);
    const card = screen.getByTestId('skeleton-card');
    
    expect(card).toHaveClass('p-4', 'space-y-4', 'bg-slate-800', 'border', 'border-slate-700', 'rounded-lg');
  });

  it('shows avatar when requested', () => {
    render(<SkeletonCard showAvatar data-testid="skeleton-card" />);
    const card = screen.getByTestId('skeleton-card');
    const avatars = card.querySelectorAll('.rounded-full');
    
    expect(avatars.length).toBeGreaterThan(0);
  });

  it('shows image when requested', () => {
    render(<SkeletonCard showImage data-testid="skeleton-card" />);
    const card = screen.getByTestId('skeleton-card');
    const image = card.querySelector('.h-48');
    
    expect(image).toBeInTheDocument();
  });

  it('renders custom number of text lines', () => {
    render(<SkeletonCard textLines={5} data-testid="skeleton-card" />);
    const card = screen.getByTestId('skeleton-card');
    const textContainer = card.querySelector('.space-y-2:last-child');
    const lines = textContainer?.querySelectorAll('[role="status"]');
    
    expect(lines).toHaveLength(6); // 1 title + 5 text lines
  });
});

describe('SkeletonTable', () => {
  it('renders with default dimensions', () => {
    render(<SkeletonTable data-testid="skeleton-table" />);
    const table = screen.getByTestId('skeleton-table');
    
    // Should have header + 5 rows
    const rows = table.querySelectorAll('.flex.space-x-4');
    expect(rows).toHaveLength(6); // 1 header + 5 data rows
  });

  it('renders custom dimensions', () => {
    render(<SkeletonTable rows={3} columns={6} data-testid="skeleton-table" />);
    const table = screen.getByTestId('skeleton-table');
    
    // Check header columns
    const headerRow = table.querySelector('.flex.space-x-4');
    const headerCells = headerRow?.querySelectorAll('[role="status"]');
    expect(headerCells).toHaveLength(6);
    
    // Check data rows
    const dataRows = table.querySelectorAll('.space-y-3 .flex.space-x-4');
    expect(dataRows).toHaveLength(3);
  });

  it('can hide header', () => {
    render(<SkeletonTable showHeader={false} data-testid="skeleton-table" />);
    const table = screen.getByTestId('skeleton-table');
    const header = table.querySelector('.border-b');
    
    expect(header).not.toBeInTheDocument();
  });

  it('applies variant to all cells', () => {
    render(<SkeletonTable variant="shimmer" rows={1} columns={1} data-testid="skeleton-table" />);
    const table = screen.getByTestId('skeleton-table');
    const cells = table.querySelectorAll('[role="status"]');
    
    cells.forEach(cell => {
      expect(cell).toHaveClass('relative', 'overflow-hidden');
    });
  });
});

describe('Accessibility', () => {
  it('provides proper ARIA labels', () => {
    render(<Skeleton data-testid="skeleton" />);
    const skeleton = screen.getByTestId('skeleton');
    
    expect(skeleton).toHaveAttribute('role', 'status');
    expect(skeleton).toHaveAttribute('aria-label', 'Loading...');
  });

  it('includes screen reader text', () => {
    render(<SkeletonText data-testid="skeleton-text" />);
    const container = screen.getByTestId('skeleton-text');
    const statusElements = container.querySelectorAll('[role="status"]');
    
    // Each skeleton should have proper role
    expect(statusElements.length).toBeGreaterThan(0);
  });

  it('maintains semantic structure', () => {
    render(<SkeletonCard showAvatar data-testid="skeleton-card" />);
    const card = screen.getByTestId('skeleton-card');
    
    // Should maintain proper spacing and structure for screen readers
    expect(card).toHaveClass('space-y-4');
  });
});