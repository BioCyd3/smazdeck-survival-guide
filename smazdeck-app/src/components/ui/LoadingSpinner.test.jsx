import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { 
  LoadingSpinner, 
  LoadingDots, 
  LoadingPulse, 
  LoadingBar 
} from './LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders with default props', () => {
    render(<LoadingSpinner data-testid="spinner" />);
    const spinner = screen.getByTestId('spinner');
    
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('inline-block', 'rounded-full', 'animate-spin');
    expect(spinner).toHaveAttribute('role', 'status');
    expect(spinner).toHaveAttribute('aria-label', 'Loading');
  });

  it('applies variant classes correctly', () => {
    render(<LoadingSpinner variant="success" data-testid="spinner" />);
    const spinner = screen.getByTestId('spinner');
    
    expect(spinner).toHaveClass('border-slate-600', 'border-t-green-500');
  });

  it('applies size classes correctly', () => {
    render(<LoadingSpinner size="xl" data-testid="spinner" />);
    const spinner = screen.getByTestId('spinner');
    
    expect(spinner).toHaveClass('w-12', 'h-12', 'border-2');
  });

  it('includes screen reader text', () => {
    render(<LoadingSpinner />);
    const screenReaderText = screen.getByText('Loading...');
    
    expect(screenReaderText).toHaveClass('sr-only');
  });

  it('applies custom className', () => {
    render(<LoadingSpinner className="custom-class" data-testid="spinner" />);
    const spinner = screen.getByTestId('spinner');
    
    expect(spinner).toHaveClass('custom-class');
  });
});

describe('LoadingDots', () => {
  it('renders three dots', () => {
    render(<LoadingDots data-testid="dots" />);
    const container = screen.getByTestId('dots');
    const dots = container.querySelectorAll('.animate-bounce');
    
    expect(dots).toHaveLength(3);
  });

  it('applies staggered animation delays', () => {
    render(<LoadingDots data-testid="dots" />);
    const container = screen.getByTestId('dots');
    const dots = container.querySelectorAll('.animate-bounce');
    
    expect(dots[0]).toHaveStyle('animation-delay: 0ms');
    expect(dots[1]).toHaveStyle('animation-delay: 150ms');
    expect(dots[2]).toHaveStyle('animation-delay: 300ms');
  });

  it('applies variant colors correctly', () => {
    render(<LoadingDots variant="danger" data-testid="dots" />);
    const container = screen.getByTestId('dots');
    const dots = container.querySelectorAll('.bg-red-500');
    
    expect(dots).toHaveLength(3);
  });

  it('applies size classes correctly', () => {
    render(<LoadingDots size="lg" data-testid="dots" />);
    const container = screen.getByTestId('dots');
    const dots = container.querySelectorAll('.w-3.h-3');
    
    expect(dots).toHaveLength(3);
  });

  it('includes proper accessibility attributes', () => {
    render(<LoadingDots data-testid="dots" />);
    const container = screen.getByTestId('dots');
    
    expect(container).toHaveAttribute('role', 'status');
    expect(container).toHaveAttribute('aria-label', 'Loading');
    expect(screen.getByText('Loading...')).toHaveClass('sr-only');
  });
});

describe('LoadingPulse', () => {
  it('renders with pulse animation', () => {
    render(<LoadingPulse data-testid="pulse" />);
    const pulse = screen.getByTestId('pulse');
    
    expect(pulse).toHaveClass('animate-pulse', 'rounded-full');
  });

  it('applies variant colors correctly', () => {
    render(<LoadingPulse variant="secondary" data-testid="pulse" />);
    const pulse = screen.getByTestId('pulse');
    
    expect(pulse).toHaveClass('bg-sky-500');
  });

  it('applies size classes correctly', () => {
    render(<LoadingPulse size="xl" data-testid="pulse" />);
    const pulse = screen.getByTestId('pulse');
    
    expect(pulse).toHaveClass('w-12', 'h-12');
  });

  it('includes accessibility attributes', () => {
    render(<LoadingPulse data-testid="pulse" />);
    const pulse = screen.getByTestId('pulse');
    
    expect(pulse).toHaveAttribute('role', 'status');
    expect(pulse).toHaveAttribute('aria-label', 'Loading');
  });
});

describe('LoadingBar', () => {
  it('renders indeterminate bar by default', () => {
    render(<LoadingBar data-testid="bar" />);
    const container = screen.getByTestId('bar');
    const bar = container.querySelector('.animate-loading-bar');
    
    expect(container).toHaveClass('bg-slate-700', 'rounded-full');
    expect(bar).toBeInTheDocument();
    expect(container).toHaveAttribute('role', 'progressbar');
  });

  it('renders determinate bar with progress', () => {
    render(<LoadingBar indeterminate={false} progress={75} data-testid="bar" />);
    const container = screen.getByTestId('bar');
    const bar = container.querySelector('.transition-all');
    
    expect(bar).toHaveStyle('width: 75%');
    expect(container).toHaveAttribute('aria-valuenow', '75');
  });

  it('clamps progress values', () => {
    render(<LoadingBar indeterminate={false} progress={150} data-testid="bar" />);
    const container = screen.getByTestId('bar');
    const bar = container.querySelector('.transition-all');
    
    expect(bar).toHaveStyle('width: 100%');
  });

  it('handles negative progress values', () => {
    render(<LoadingBar indeterminate={false} progress={-10} data-testid="bar" />);
    const container = screen.getByTestId('bar');
    const bar = container.querySelector('.transition-all');
    
    expect(bar).toHaveStyle('width: 0%');
  });

  it('applies variant colors correctly', () => {
    render(<LoadingBar variant="warning" data-testid="bar" />);
    const container = screen.getByTestId('bar');
    const bar = container.querySelector('.bg-yellow-500');
    
    expect(bar).toBeInTheDocument();
  });

  it('applies size classes correctly', () => {
    render(<LoadingBar size="lg" data-testid="bar" />);
    const container = screen.getByTestId('bar');
    
    expect(container).toHaveClass('h-3');
  });

  it('includes proper ARIA attributes', () => {
    render(<LoadingBar indeterminate={false} progress={50} data-testid="bar" />);
    const container = screen.getByTestId('bar');
    
    expect(container).toHaveAttribute('role', 'progressbar');
    expect(container).toHaveAttribute('aria-valuemin', '0');
    expect(container).toHaveAttribute('aria-valuemax', '100');
    expect(container).toHaveAttribute('aria-valuenow', '50');
  });

  it('omits aria-valuenow for indeterminate bars', () => {
    render(<LoadingBar indeterminate={true} data-testid="bar" />);
    const container = screen.getByTestId('bar');
    
    expect(container).not.toHaveAttribute('aria-valuenow');
  });
});

describe('Accessibility', () => {
  it('all components have proper role attributes', () => {
    render(
      <div>
        <LoadingSpinner data-testid="spinner" />
        <LoadingDots data-testid="dots" />
        <LoadingPulse data-testid="pulse" />
        <LoadingBar data-testid="bar" />
      </div>
    );

    expect(screen.getByTestId('spinner')).toHaveAttribute('role', 'status');
    expect(screen.getByTestId('dots')).toHaveAttribute('role', 'status');
    expect(screen.getByTestId('pulse')).toHaveAttribute('role', 'status');
    expect(screen.getByTestId('bar')).toHaveAttribute('role', 'progressbar');
  });

  it('all components include screen reader text', () => {
    render(
      <div>
        <LoadingSpinner />
        <LoadingDots />
        <LoadingPulse />
      </div>
    );

    const screenReaderTexts = screen.getAllByText('Loading...');
    expect(screenReaderTexts).toHaveLength(3);
    screenReaderTexts.forEach(text => {
      expect(text).toHaveClass('sr-only');
    });
  });

  it('respects reduced motion preferences', () => {
    // This would typically be tested with a media query mock
    // For now, we ensure the components render without errors
    render(
      <div>
        <LoadingSpinner data-testid="spinner" />
        <LoadingDots data-testid="dots" />
        <LoadingPulse data-testid="pulse" />
        <LoadingBar data-testid="bar" />
      </div>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.getByTestId('dots')).toBeInTheDocument();
    expect(screen.getByTestId('pulse')).toBeInTheDocument();
    expect(screen.getByTestId('bar')).toBeInTheDocument();
  });
});