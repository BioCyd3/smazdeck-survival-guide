import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/utils';

// Focus Ring Component for consistent focus indicators
const FocusRing = forwardRef(({
  children,
  className = '',
  variant = 'default',
  size = 'md',
  offset = 2,
  visible = true,
  ...props
}, ref) => {
  const focusVariants = {
    default: 'ring-amber-500',
    primary: 'ring-amber-500',
    secondary: 'ring-sky-500',
    success: 'ring-green-500',
    warning: 'ring-yellow-500',
    danger: 'ring-red-500',
  };

  const focusSizes = {
    xs: 'ring-1',
    sm: 'ring-1',
    md: 'ring-2',
    lg: 'ring-2',
    xl: 'ring-4',
  };

  const focusClasses = cn(
    'focus-visible:outline-none',
    visible && 'focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900',
    visible && focusVariants[variant],
    visible && focusSizes[size],
    className
  );

  return (
    <div
      ref={ref}
      className={focusClasses}
      style={{ '--ring-offset-width': `${offset}px` }}
      {...props}
    >
      {children}
    </div>
  );
});

FocusRing.displayName = 'FocusRing';

// Interactive Element Component with enhanced hover and focus states
const InteractiveElement = forwardRef(({
  children,
  className = '',
  variant = 'default',
  size = 'md',
  disabled = false,
  loading = false,
  hoverEffect = 'scale',
  focusEffect = 'ring',
  as: Component = 'div',
  ...props
}, ref) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const hoverEffects = {
    none: '',
    scale: 'hover:scale-105 active:scale-95',
    lift: 'hover:-translate-y-1 hover:shadow-lg active:translate-y-0',
    glow: 'hover:shadow-glow hover:shadow-amber-500/25',
    brightness: 'hover:brightness-110 active:brightness-95',
    subtle: 'hover:bg-slate-800/50 active:bg-slate-700/50',
  };

  const focusEffects = {
    none: '',
    ring: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900',
    glow: 'focus-visible:outline-none focus-visible:shadow-glow focus-visible:shadow-amber-500/50',
    border: 'focus-visible:outline-none focus-visible:border-amber-500',
  };

  const baseClasses = cn(
    'transition-all duration-200 ease-out',
    !disabled && !loading && hoverEffects[hoverEffect],
    !disabled && focusEffects[focusEffect],
    disabled && 'opacity-50 cursor-not-allowed',
    loading && 'pointer-events-none',
    className
  );

  const handleMouseEnter = (e) => {
    if (!disabled && !loading) {
      setIsHovered(true);
      props.onMouseEnter?.(e);
    }
  };

  const handleMouseLeave = (e) => {
    if (!disabled && !loading) {
      setIsHovered(false);
      setIsPressed(false);
      props.onMouseLeave?.(e);
    }
  };

  const handleFocus = (e) => {
    if (!disabled && !loading) {
      setIsFocused(true);
      props.onFocus?.(e);
    }
  };

  const handleBlur = (e) => {
    if (!disabled && !loading) {
      setIsFocused(false);
      props.onBlur?.(e);
    }
  };

  const handleMouseDown = (e) => {
    if (!disabled && !loading) {
      setIsPressed(true);
      props.onMouseDown?.(e);
    }
  };

  const handleMouseUp = (e) => {
    if (!disabled && !loading) {
      setIsPressed(false);
      props.onMouseUp?.(e);
    }
  };

  return (
    <Component
      ref={ref}
      className={baseClasses}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      data-hovered={isHovered}
      data-focused={isFocused}
      data-pressed={isPressed}
      aria-disabled={disabled}
      {...props}
    >
      {children}
    </Component>
  );
});

InteractiveElement.displayName = 'InteractiveElement';

// Focus Trap Component for modal dialogs and dropdowns
const FocusTrap = forwardRef(({
  children,
  active = true,
  restoreFocus = true,
  className = '',
  ...props
}, ref) => {
  const containerRef = useRef(null);
  const previousActiveElement = useRef(null);

  useEffect(() => {
    if (!active) return;

    // Store the currently focused element
    previousActiveElement.current = document.activeElement;

    const container = containerRef.current;
    if (!container) return;

    // Get all focusable elements
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Focus the first element
    if (firstElement) {
      firstElement.focus();
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
      
      // Restore focus to the previously focused element
      if (restoreFocus && previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [active, restoreFocus]);

  return (
    <div
      ref={(node) => {
        containerRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      className={className}
      {...props}
    >
      {children}
    </div>
  );
});

FocusTrap.displayName = 'FocusTrap';

// Skip Link Component for accessibility
const SkipLink = forwardRef(({
  href = '#main-content',
  children = 'Skip to main content',
  className = '',
  ...props
}, ref) => {
  return (
    <a
      ref={ref}
      href={href}
      className={cn(
        'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50',
        'bg-amber-500 text-slate-900 px-4 py-2 rounded-lg font-medium',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2',
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
});

SkipLink.displayName = 'SkipLink';

// Keyboard Navigation Helper Hook
export const useKeyboardNavigation = (options = {}) => {
  const {
    onArrowUp,
    onArrowDown,
    onArrowLeft,
    onArrowRight,
    onEnter,
    onEscape,
    onSpace,
    onTab,
  } = options;

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        onArrowUp?.(e);
        break;
      case 'ArrowDown':
        e.preventDefault();
        onArrowDown?.(e);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        onArrowLeft?.(e);
        break;
      case 'ArrowRight':
        e.preventDefault();
        onArrowRight?.(e);
        break;
      case 'Enter':
        onEnter?.(e);
        break;
      case 'Escape':
        onEscape?.(e);
        break;
      case ' ':
        e.preventDefault();
        onSpace?.(e);
        break;
      case 'Tab':
        onTab?.(e);
        break;
      default:
        break;
    }
  };

  return { handleKeyDown };
};

// Focus Management Hook
export const useFocusManagement = () => {
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const elementsRef = useRef([]);

  const registerElement = (element, index) => {
    elementsRef.current[index] = element;
  };

  const focusElement = (index) => {
    const element = elementsRef.current[index];
    if (element) {
      element.focus();
      setFocusedIndex(index);
    }
  };

  const focusNext = () => {
    const nextIndex = (focusedIndex + 1) % elementsRef.current.length;
    focusElement(nextIndex);
  };

  const focusPrevious = () => {
    const prevIndex = focusedIndex <= 0 
      ? elementsRef.current.length - 1 
      : focusedIndex - 1;
    focusElement(prevIndex);
  };

  const focusFirst = () => {
    focusElement(0);
  };

  const focusLast = () => {
    focusElement(elementsRef.current.length - 1);
  };

  return {
    focusedIndex,
    registerElement,
    focusElement,
    focusNext,
    focusPrevious,
    focusFirst,
    focusLast,
  };
};

export default InteractiveElement;
export {
  FocusRing,
  InteractiveElement,
  FocusTrap,
  SkipLink,
};