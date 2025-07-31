import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Badge from './Badge';

describe('Badge Component', () => {
  it('renders children correctly', () => {
    render(<Badge>Test Badge</Badge>);

    expect(screen.getByText('Test Badge')).toBeInTheDocument();
  });

  it('applies default primary variant styling', () => {
    render(<Badge>Primary Badge</Badge>);

    const badgeElement = screen.getByText('Primary Badge');
    expect(badgeElement).toHaveClass('bg-amber-400');
    expect(badgeElement).toHaveClass('text-slate-900');
    expect(badgeElement).toHaveClass('hover:bg-amber-300');
  });

  it('applies secondary variant styling', () => {
    render(<Badge variant="secondary">Secondary Badge</Badge>);

    const badgeElement = screen.getByText('Secondary Badge');
    expect(badgeElement).toHaveClass('bg-slate-700');
    expect(badgeElement).toHaveClass('text-slate-200');
    expect(badgeElement).toHaveClass('hover:bg-slate-600');
  });

  it('applies tier variant styling', () => {
    render(<Badge variant="tier">Tier Badge</Badge>);

    const badgeElement = screen.getByText('Tier Badge');
    expect(badgeElement).toHaveClass('bg-violet-600');
    expect(badgeElement).toHaveClass('text-white');
    expect(badgeElement).toHaveClass('hover:bg-violet-500');
  });

  it('applies base styles to all variants', () => {
    render(<Badge>Test Badge</Badge>);

    const badgeElement = screen.getByText('Test Badge');
    expect(badgeElement).toHaveClass('inline-flex');
    expect(badgeElement).toHaveClass('items-center');
    expect(badgeElement).toHaveClass('px-2.5');
    expect(badgeElement).toHaveClass('py-0.5');
    expect(badgeElement).toHaveClass('rounded-full');
    expect(badgeElement).toHaveClass('text-xs');
    expect(badgeElement).toHaveClass('font-semibold');
    expect(badgeElement).toHaveClass('transition-colors');
    expect(badgeElement).toHaveClass('duration-200');
  });

  it('applies custom className when provided', () => {
    render(<Badge className="custom-class">Custom Badge</Badge>);

    const badgeElement = screen.getByText('Custom Badge');
    expect(badgeElement).toHaveClass('custom-class');
    expect(badgeElement).toHaveClass('bg-amber-400'); // Should still have default variant classes
  });

  it('handles empty className prop', () => {
    render(<Badge className="">Empty Class Badge</Badge>);

    const badgeElement = screen.getByText('Empty Class Badge');
    expect(badgeElement).toHaveClass('bg-amber-400');
  });

  it('handles invalid variant gracefully', () => {
    render(<Badge variant="invalid">Invalid Badge</Badge>);

    const badgeElement = screen.getByText('Invalid Badge');
    // Should not crash and should still have base styles
    expect(badgeElement).toHaveClass('inline-flex');
    expect(badgeElement).toHaveClass('rounded-full');
  });
});
