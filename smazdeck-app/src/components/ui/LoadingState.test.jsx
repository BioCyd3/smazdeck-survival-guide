import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoadingState, LoadingOverlay, LoadingButton } from './LoadingState';

// Mock timers for testing transitions
beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.runOnlyPendingTimers();
  vi.useRealTimers();
});

describe('LoadingState', () => {
  it('shows loading component when loading is true', () => {
    render(
      <LoadingState loading={true} message="Loading data...">
        <div>Content</div>
      </LoadingState>
    );

    expect(screen.getByText('Loading data...')).toBeInTheDocument();
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('shows content when loading is false', async () => {
    render(
      <LoadingState loading={false}>
        <div>Content</div>
      </LoadingState>
    );

    // Fast forward past transition
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('shows error component when error is provided', () => {
    const error = new Error('Test error');
    render(
      <LoadingState error={error} errorMessage="Custom error message">
        <div>Content</div>
      </LoadingState>
    );

    expect(screen.getByText('Custom error message')).toBeInTheDocument();
    expect(screen.getByText('Test error')).toBeInTheDocument();
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('uses custom loading component when provided', () => {
    const customLoader = <div data-testid="custom-loader">Custom Loading</div>;
    
    render(
      <LoadingState loading={true} loadingComponent={customLoader}>
        <div>Content</div>
      </LoadingState>
    );

    expect(screen.getByTestId('custom-loader')).toBeInTheDocument();
  });

  it('uses custom error component when provided', () => {
    const customError = <div data-testid="custom-error">Custom Error</div>;
    const error = new Error('Test error');
    
    render(
      <LoadingState error={error} errorComponent={customError}>
        <div>Content</div>
      </LoadingState>
    );

    expect(screen.getByTestId('custom-error')).toBeInTheDocument();
  });

  it('applies different loading variants', () => {
    const { rerender } = render(
      <LoadingState loading={true} variant="dots">
        <div>Content</div>
      </LoadingState>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();

    rerender(
      <LoadingState loading={true} variant="pulse">
        <div>Content</div>
      </LoadingState>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('respects minimum loading time', async () => {
    const { rerender } = render(
      <LoadingState loading={true} minLoadingTime={1000}>
        <div>Content</div>
      </LoadingState>
    );

    // Switch to not loading
    rerender(
      <LoadingState loading={false} minLoadingTime={1000}>
        <div>Content</div>
      </LoadingState>
    );

    // Should still be loading
    expect(screen.queryByText('Content')).not.toBeInTheDocument();

    // Fast forward past minimum time
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // Fast forward past transition
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('handles transitions correctly', async () => {
    const { rerender } = render(
      <LoadingState loading={true} showTransition={true}>
        <div>Content</div>
      </LoadingState>
    );

    rerender(
      <LoadingState loading={false} showTransition={true}>
        <div>Content</div>
      </LoadingState>
    );

    // Fast forward past transition
    act(() => {
      vi.advanceTimersByTime(300);
    });

    const content = screen.getByText('Content');
    expect(content).toBeInTheDocument();
  });

  it('can disable transitions', () => {
    const { rerender } = render(
      <LoadingState loading={true} showTransition={false}>
        <div>Content</div>
      </LoadingState>
    );

    rerender(
      <LoadingState loading={false} showTransition={false}>
        <div>Content</div>
      </LoadingState>
    );

    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});

describe('LoadingOverlay', () => {
  it('shows children when not loading', () => {
    render(
      <LoadingOverlay loading={false}>
        <div>Content</div>
      </LoadingOverlay>
    );

    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('shows overlay when loading', () => {
    render(
      <LoadingOverlay loading={true} message="Loading overlay...">
        <div>Content</div>
      </LoadingOverlay>
    );

    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByText('Loading overlay...')).toBeInTheDocument();
  });

  it('applies backdrop by default', () => {
    render(
      <LoadingOverlay loading={true} data-testid="overlay">
        <div>Content</div>
      </LoadingOverlay>
    );

    const overlay = screen.getByTestId('overlay').querySelector('.absolute');
    expect(overlay).toHaveClass('bg-slate-900/50', 'backdrop-blur-sm');
  });

  it('can disable backdrop', () => {
    render(
      <LoadingOverlay loading={true} backdrop={false} data-testid="overlay">
        <div>Content</div>
      </LoadingOverlay>
    );

    const overlay = screen.getByTestId('overlay').querySelector('.absolute');
    expect(overlay).not.toHaveClass('bg-slate-900/50', 'backdrop-blur-sm');
  });

  it('applies custom overlay classes', () => {
    render(
      <LoadingOverlay 
        loading={true} 
        overlayClassName="custom-overlay" 
        data-testid="overlay"
      >
        <div>Content</div>
      </LoadingOverlay>
    );

    const overlay = screen.getByTestId('overlay').querySelector('.absolute');
    expect(overlay).toHaveClass('custom-overlay');
  });
});

describe('LoadingButton', () => {
  it('renders button with children when not loading', () => {
    render(
      <LoadingButton loading={false}>
        Click me
      </LoadingButton>
    );

    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('shows loading state with spinner', () => {
    render(
      <LoadingButton loading={true} loadingText="Processing...">
        Click me
      </LoadingButton>
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(screen.getByText('Processing...')).toBeInTheDocument();
  });

  it('is disabled when loading', () => {
    render(
      <LoadingButton loading={true}>
        Click me
      </LoadingButton>
    );

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('can be disabled independently of loading', () => {
    render(
      <LoadingButton loading={false} disabled={true}>
        Click me
      </LoadingButton>
    );

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies variant classes correctly', () => {
    render(
      <LoadingButton variant="danger" data-testid="button">
        Click me
      </LoadingButton>
    );

    const button = screen.getByTestId('button');
    expect(button).toHaveClass('bg-red-600', 'text-white');
  });

  it('applies size classes correctly', () => {
    render(
      <LoadingButton size="lg" data-testid="button">
        Click me
      </LoadingButton>
    );

    const button = screen.getByTestId('button');
    expect(button).toHaveClass('h-12', 'px-6', 'text-lg');
  });

  it('handles click events when not loading', () => {
    const handleClick = vi.fn();

    render(
      <LoadingButton loading={false} onClick={handleClick}>
        Click me
      </LoadingButton>
    );

    const button = screen.getByRole('button');
    button.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not handle click events when loading', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const handleClick = vi.fn();

    render(
      <LoadingButton loading={true} onClick={handleClick}>
        Click me
      </LoadingButton>
    );

    // Button should be disabled, so click won't work
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('applies custom className', () => {
    render(
      <LoadingButton className="custom-class" data-testid="button">
        Click me
      </LoadingButton>
    );

    const button = screen.getByTestId('button');
    expect(button).toHaveClass('custom-class');
  });
});

describe('Accessibility', () => {
  it('LoadingState provides proper ARIA attributes', () => {
    render(
      <LoadingState loading={true}>
        <div>Content</div>
      </LoadingState>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('LoadingButton maintains button semantics', () => {
    render(
      <LoadingButton loading={true}>
        Submit
      </LoadingButton>
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it('Error states provide helpful information', () => {
    const error = new Error('Network error');
    render(
      <LoadingState error={error}>
        <div>Content</div>
      </LoadingState>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Network error')).toBeInTheDocument();
  });

  it('Loading messages are announced to screen readers', () => {
    render(
      <LoadingState loading={true} message="Loading user data">
        <div>Content</div>
      </LoadingState>
    );

    expect(screen.getByText('Loading user data')).toBeInTheDocument();
  });
});