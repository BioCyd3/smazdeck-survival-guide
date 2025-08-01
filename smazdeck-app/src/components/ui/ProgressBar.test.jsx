import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProgressBar from './ProgressBar';

describe('ProgressBar', () => {
  it('renders with default props', () => {
    render(<ProgressBar value={50} />);
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute('aria-valuenow', '50');
    expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', '100');
  });

  it('displays label when provided', () => {
    render(<ProgressBar value={75} label="Health" />);
    
    expect(screen.getByText('Health')).toBeInTheDocument();
  });

  it('shows value when showValue is true', () => {
    render(<ProgressBar value={30} max={50} showValue />);
    
    expect(screen.getByText('30/50')).toBeInTheDocument();
  });

  it('applies correct width based on value and max', () => {
    render(<ProgressBar value={25} max={50} />);
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveStyle({ width: '50%' });
  });

  it('handles edge cases for percentage calculation', () => {
    // Test negative value
    render(<ProgressBar value={-10} max={100} data-testid="negative" />);
    const negativeBar = screen.getByTestId('negative').querySelector('[role="progressbar"]');
    expect(negativeBar).toHaveStyle({ width: '0%' });

    // Test value exceeding max
    render(<ProgressBar value={150} max={100} data-testid="overflow" />);
    const overflowBar = screen.getByTestId('overflow').querySelector('[role="progressbar"]');
    expect(overflowBar).toHaveStyle({ width: '100%' });
  });

  it('applies different size classes', () => {
    const { rerender } = render(<ProgressBar value={50} size="sm" />);
    expect(screen.getByRole('progressbar').parentElement).toHaveClass('h-1');

    rerender(<ProgressBar value={50} size="lg" />);
    expect(screen.getByRole('progressbar').parentElement).toHaveClass('h-3');
  });

  it('applies different variant classes', () => {
    render(<ProgressBar value={50} variant="attack" />);
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveClass('bg-red-400');
  });

  it('applies custom className', () => {
    render(<ProgressBar value={50} className="custom-class" />);
    
    const container = screen.getByRole('progressbar').closest('.custom-class');
    expect(container).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<ProgressBar value={60} max={80} label="Experience" />);
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-label', 'Experience');
    expect(progressBar).toHaveAttribute('aria-valuenow', '60');
    expect(progressBar).toHaveAttribute('aria-valuemax', '80');
  });
});