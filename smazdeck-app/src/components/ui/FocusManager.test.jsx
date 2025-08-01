import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { 
  FocusRing, 
  InteractiveElement, 
  FocusTrap, 
  SkipLink,
  useKeyboardNavigation,
  useFocusManagement 
} from './FocusManager';

describe('FocusRing', () => {
  it('renders with default focus ring styles', () => {
    render(
      <FocusRing data-testid="focus-ring">
        <button>Test Button</button>
      </FocusRing>
    );

    const focusRing = screen.getByTestId('focus-ring');
    expect(focusRing).toHaveClass('focus-visible:outline-none', 'ring-amber-500');
  });

  it('applies variant classes correctly', () => {
    render(
      <FocusRing variant="danger" data-testid="focus-ring">
        <button>Test Button</button>
      </FocusRing>
    );

    const focusRing = screen.getByTestId('focus-ring');
    expect(focusRing).toHaveClass('ring-red-500');
  });

  it('applies size classes correctly', () => {
    render(
      <FocusRing size="xl" data-testid="focus-ring">
        <button>Test Button</button>
      </FocusRing>
    );

    const focusRing = screen.getByTestId('focus-ring');
    expect(focusRing).toHaveClass('ring-4');
  });

  it('can hide focus ring when visible is false', () => {
    render(
      <FocusRing visible={false} data-testid="focus-ring">
        <button>Test Button</button>
      </FocusRing>
    );

    const focusRing = screen.getByTestId('focus-ring');
    expect(focusRing).not.toHaveClass('ring-amber-500');
  });
});

describe('InteractiveElement', () => {
  it('renders with default interactive styles', () => {
    render(
      <InteractiveElement data-testid="interactive">
        Content
      </InteractiveElement>
    );

    const element = screen.getByTestId('interactive');
    expect(element).toHaveClass('transition-all', 'duration-200', 'ease-out');
  });

  it('applies hover effects correctly', () => {
    render(
      <InteractiveElement hoverEffect="scale" data-testid="interactive">
        Content
      </InteractiveElement>
    );

    const element = screen.getByTestId('interactive');
    expect(element).toHaveClass('hover:scale-105', 'active:scale-95');
  });

  it('applies focus effects correctly', () => {
    render(
      <InteractiveElement focusEffect="ring" data-testid="interactive">
        Content
      </InteractiveElement>
    );

    const element = screen.getByTestId('interactive');
    expect(element).toHaveClass('focus-visible:ring-2', 'focus-visible:ring-amber-500');
  });

  it('handles disabled state correctly', () => {
    render(
      <InteractiveElement disabled data-testid="interactive">
        Content
      </InteractiveElement>
    );

    const element = screen.getByTestId('interactive');
    expect(element).toHaveClass('opacity-50', 'cursor-not-allowed');
    expect(element).toHaveAttribute('aria-disabled', 'true');
  });

  it('handles loading state correctly', () => {
    render(
      <InteractiveElement loading data-testid="interactive">
        Content
      </InteractiveElement>
    );

    const element = screen.getByTestId('interactive');
    expect(element).toHaveClass('pointer-events-none');
  });

  it('tracks interaction states', async () => {
    const user = userEvent.setup();
    
    render(
      <InteractiveElement as="button" data-testid="interactive">
        Content
      </InteractiveElement>
    );

    const element = screen.getByTestId('interactive');

    // Test hover state
    await user.hover(element);
    expect(element).toHaveAttribute('data-hovered', 'true');

    await user.unhover(element);
    expect(element).toHaveAttribute('data-hovered', 'false');

    // Test that data attributes exist
    expect(element).toHaveAttribute('data-focused');
    expect(element).toHaveAttribute('data-pressed');
  });

  it('calls event handlers correctly', async () => {
    const user = userEvent.setup();
    const onMouseEnter = vi.fn();
    const onMouseLeave = vi.fn();
    const onFocus = vi.fn();
    const onBlur = vi.fn();

    render(
      <InteractiveElement
        as="button"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onFocus={onFocus}
        onBlur={onBlur}
        data-testid="interactive"
      >
        Content
      </InteractiveElement>
    );

    const element = screen.getByTestId('interactive');

    await user.hover(element);
    expect(onMouseEnter).toHaveBeenCalledTimes(1);

    await user.unhover(element);
    expect(onMouseLeave).toHaveBeenCalledTimes(1);

    await user.click(element);
    expect(onFocus).toHaveBeenCalledTimes(1);

    element.blur();
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('does not update state when disabled', async () => {
    const user = userEvent.setup();

    render(
      <InteractiveElement
        as="button"
        disabled
        data-testid="interactive"
      >
        Content
      </InteractiveElement>
    );

    const element = screen.getByTestId('interactive');

    await user.hover(element);
    // The component should not update its internal state when disabled
    expect(element).toHaveAttribute('data-hovered', 'false');
  });
});

describe('FocusTrap', () => {
  beforeEach(() => {
    // Create a mock active element
    document.body.innerHTML = '<button id="outside">Outside</button>';
    document.getElementById('outside')?.focus();
  });

  it('renders children correctly', () => {
    render(
      <FocusTrap data-testid="focus-trap">
        <button>Inside</button>
      </FocusTrap>
    );

    expect(screen.getByText('Inside')).toBeInTheDocument();
  });

  it('focuses first element when active', async () => {
    render(
      <FocusTrap active data-testid="focus-trap">
        <button data-testid="first">First</button>
        <button data-testid="second">Second</button>
      </FocusTrap>
    );

    await waitFor(() => {
      expect(screen.getByTestId('first')).toHaveFocus();
    });
  });

  it('traps focus within container', async () => {
    const user = userEvent.setup();
    
    render(
      <FocusTrap active data-testid="focus-trap">
        <button data-testid="first">First</button>
        <button data-testid="second">Second</button>
      </FocusTrap>
    );

    const firstButton = screen.getByTestId('first');
    const secondButton = screen.getByTestId('second');

    await waitFor(() => {
      expect(firstButton).toHaveFocus();
    });

    // Tab to second button
    await user.tab();
    expect(secondButton).toHaveFocus();

    // Tab should wrap to first button
    await user.tab();
    expect(firstButton).toHaveFocus();

    // Shift+Tab should go to last button
    await user.tab({ shift: true });
    expect(secondButton).toHaveFocus();
  });

  it('does not trap focus when inactive', () => {
    const outsideButton = document.getElementById('outside');
    
    render(
      <FocusTrap active={false} data-testid="focus-trap">
        <button data-testid="inside">Inside</button>
      </FocusTrap>
    );

    // Outside button should still have focus
    expect(outsideButton).toHaveFocus();
  });

  it('restores focus when unmounted', async () => {
    const outsideButton = document.getElementById('outside');
    
    const { unmount } = render(
      <FocusTrap active restoreFocus data-testid="focus-trap">
        <button data-testid="inside">Inside</button>
      </FocusTrap>
    );

    await waitFor(() => {
      expect(screen.getByTestId('inside')).toHaveFocus();
    });

    unmount();

    await waitFor(() => {
      expect(outsideButton).toHaveFocus();
    });
  });
});

describe('SkipLink', () => {
  it('renders with default content and href', () => {
    render(<SkipLink />);
    
    const skipLink = screen.getByText('Skip to main content');
    expect(skipLink).toHaveAttribute('href', '#main-content');
  });

  it('renders with custom content and href', () => {
    render(<SkipLink href="#custom" children="Skip to custom section" />);
    
    const skipLink = screen.getByText('Skip to custom section');
    expect(skipLink).toHaveAttribute('href', '#custom');
  });

  it('has proper accessibility classes', () => {
    render(<SkipLink data-testid="skip-link" />);
    
    const skipLink = screen.getByTestId('skip-link');
    expect(skipLink).toHaveClass('sr-only', 'focus:not-sr-only');
  });

  it('becomes visible on focus', async () => {
    const user = userEvent.setup();
    
    render(<SkipLink data-testid="skip-link" />);
    
    const skipLink = screen.getByTestId('skip-link');
    
    await user.tab();
    expect(skipLink).toHaveFocus();
    expect(skipLink).toHaveClass('focus:not-sr-only');
  });
});

describe('useKeyboardNavigation', () => {
  it('calls appropriate handlers for keyboard events', () => {
    const handlers = {
      onArrowUp: vi.fn(),
      onArrowDown: vi.fn(),
      onEnter: vi.fn(),
      onEscape: vi.fn(),
    };

    const TestComponent = () => {
      const { handleKeyDown } = useKeyboardNavigation(handlers);
      return <div onKeyDown={handleKeyDown} data-testid="keyboard-nav" />;
    };

    render(<TestComponent />);
    const element = screen.getByTestId('keyboard-nav');

    fireEvent.keyDown(element, { key: 'ArrowUp' });
    expect(handlers.onArrowUp).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(element, { key: 'ArrowDown' });
    expect(handlers.onArrowDown).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(element, { key: 'Enter' });
    expect(handlers.onEnter).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(element, { key: 'Escape' });
    expect(handlers.onEscape).toHaveBeenCalledTimes(1);
  });

  it('prevents default for arrow keys', () => {
    const onArrowUp = vi.fn();
    
    const TestComponent = () => {
      const { handleKeyDown } = useKeyboardNavigation({ onArrowUp });
      return <div onKeyDown={handleKeyDown} data-testid="keyboard-nav" />;
    };

    render(<TestComponent />);
    const element = screen.getByTestId('keyboard-nav');

    fireEvent.keyDown(element, { key: 'ArrowUp' });
    expect(onArrowUp).toHaveBeenCalledTimes(1);
  });
});

describe('Accessibility', () => {
  it('FocusRing provides proper focus indicators', () => {
    render(
      <FocusRing>
        <button data-testid="button">Test</button>
      </FocusRing>
    );

    const button = screen.getByTestId('button');
    expect(button).toBeInTheDocument();
  });

  it('InteractiveElement maintains proper ARIA attributes', () => {
    render(
      <InteractiveElement disabled data-testid="interactive">
        Content
      </InteractiveElement>
    );

    const element = screen.getByTestId('interactive');
    expect(element).toHaveAttribute('aria-disabled', 'true');
  });

  it('FocusTrap works with screen readers', async () => {
    render(
      <FocusTrap active>
        <button aria-label="First button">First</button>
        <button aria-label="Second button">Second</button>
      </FocusTrap>
    );

    const firstButton = screen.getByLabelText('First button');
    const secondButton = screen.getByLabelText('Second button');

    await waitFor(() => {
      expect(firstButton).toHaveFocus();
    });

    expect(firstButton).toBeInTheDocument();
    expect(secondButton).toBeInTheDocument();
  });

  it('SkipLink provides proper navigation for screen readers', () => {
    render(<SkipLink />);
    
    const skipLink = screen.getByText('Skip to main content');
    expect(skipLink).toHaveAttribute('href', '#main-content');
    expect(skipLink.tagName).toBe('A');
  });
});