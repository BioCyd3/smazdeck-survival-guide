import React, { forwardRef, useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { LoadingSpinner, LoadingDots, LoadingPulse, LoadingBar } from './LoadingSpinner';
import { Skeleton, SkeletonText, SkeletonCard } from './Skeleton';

const LoadingState = forwardRef(({
  loading = false,
  error = null,
  children,
  loadingComponent,
  errorComponent,
  className = '',
  variant = 'spinner',
  size = 'md',
  message = 'Loading...',
  errorMessage = 'Something went wrong',
  showTransition = true,
  minLoadingTime = 0,
  ...props
}, ref) => {
  const [isVisible, setIsVisible] = useState(loading);
  const [showContent, setShowContent] = useState(!loading);

  useEffect(() => {
    let timeoutId;

    if (loading) {
      setIsVisible(true);
      setShowContent(false);
    } else {
      // Add minimum loading time if specified
      if (minLoadingTime > 0) {
        timeoutId = setTimeout(() => {
          setIsVisible(false);
          if (showTransition) {
            setTimeout(() => setShowContent(true), 150);
          } else {
            setShowContent(true);
          }
        }, minLoadingTime);
      } else {
        setIsVisible(false);
        if (showTransition) {
          setTimeout(() => setShowContent(true), 150);
        } else {
          setShowContent(true);
        }
      }
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [loading, minLoadingTime, showTransition]);

  const renderLoadingComponent = () => {
    if (loadingComponent) {
      return loadingComponent;
    }

    const loadingComponents = {
      spinner: <LoadingSpinner size={size} />,
      dots: <LoadingDots size={size} />,
      pulse: <LoadingPulse size={size} />,
      bar: <LoadingBar size={size} />,
      skeleton: <Skeleton className="w-full h-20" />,
    };

    return loadingComponents[variant] || loadingComponents.spinner;
  };

  const renderErrorComponent = () => {
    if (errorComponent) {
      return errorComponent;
    }

    return (
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <div className="w-12 h-12 mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <p className="text-slate-300 mb-2">{errorMessage}</p>
        <p className="text-sm text-slate-500">{error?.message || 'Please try again later'}</p>
      </div>
    );
  };

  if (error) {
    return (
      <div
        ref={ref}
        className={cn('w-full', className)}
        {...props}
      >
        {renderErrorComponent()}
      </div>
    );
  }

  if (isVisible) {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col items-center justify-center p-6',
          showTransition && 'animate-in fade-in duration-200',
          className
        )}
        {...props}
      >
        {renderLoadingComponent()}
        {message && (
          <p className="mt-3 text-sm text-slate-400 animate-pulse">
            {message}
          </p>
        )}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn(
        showTransition && showContent && 'animate-in fade-in duration-300',
        className
      )}
      {...props}
    >
      {showContent && children}
    </div>
  );
});

LoadingState.displayName = 'LoadingState';

// Loading Overlay Component
const LoadingOverlay = forwardRef(({
  loading = false,
  children,
  className = '',
  overlayClassName = '',
  variant = 'spinner',
  size = 'lg',
  message = 'Loading...',
  backdrop = true,
  ...props
}, ref) => {
  if (!loading) {
    return children;
  }

  return (
    <div
      ref={ref}
      className={cn('relative', className)}
      {...props}
    >
      {children}
      <div
        className={cn(
          'absolute inset-0 flex items-center justify-center z-50',
          backdrop && 'bg-slate-900/50 backdrop-blur-sm',
          overlayClassName
        )}
      >
        <div className="flex flex-col items-center justify-center p-6 bg-slate-800 rounded-lg border border-slate-700 shadow-xl">
          <LoadingState
            loading={true}
            variant={variant}
            size={size}
            message={message}
            showTransition={false}
          />
        </div>
      </div>
    </div>
  );
});

LoadingOverlay.displayName = 'LoadingOverlay';

// Loading Button Component
const LoadingButton = forwardRef(({
  loading = false,
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  disabled,
  loadingText = 'Loading...',
  ...props
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 disabled:pointer-events-none disabled:opacity-50';
  
  const variantClasses = {
    primary: 'bg-amber-500 text-slate-900 hover:bg-amber-600 active:bg-amber-700',
    secondary: 'bg-slate-700 text-slate-200 hover:bg-slate-600 active:bg-slate-500',
    ghost: 'bg-transparent text-slate-200 hover:bg-slate-800 active:bg-slate-700',
    danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
  };

  const sizeClasses = {
    xs: 'h-7 px-2 text-xs',
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-base',
    lg: 'h-12 px-6 text-lg',
    xl: 'h-14 px-8 text-xl',
  };

  const spinnerSizes = {
    xs: 'xs',
    sm: 'xs',
    md: 'sm',
    lg: 'md',
    xl: 'lg',
  };

  return (
    <button
      ref={ref}
      className={cn(
        baseClasses,
        variantClasses[variant] || variantClasses.primary,
        sizeClasses[size] || sizeClasses.md,
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <LoadingSpinner
          size={spinnerSizes[size] || 'sm'}
          className="mr-2"
        />
      )}
      {loading ? loadingText : children}
    </button>
  );
});

LoadingButton.displayName = 'LoadingButton';

export default LoadingState;
export {
  LoadingState,
  LoadingOverlay,
  LoadingButton,
};