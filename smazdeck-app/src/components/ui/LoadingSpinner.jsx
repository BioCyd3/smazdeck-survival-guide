import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';

const spinnerVariants = {
  default: 'border-slate-600 border-t-amber-500',
  primary: 'border-slate-600 border-t-amber-500',
  secondary: 'border-slate-600 border-t-sky-500',
  success: 'border-slate-600 border-t-green-500',
  warning: 'border-slate-600 border-t-yellow-500',
  danger: 'border-slate-600 border-t-red-500',
};

const spinnerSizes = {
  xs: 'w-3 h-3 border',
  sm: 'w-4 h-4 border',
  md: 'w-6 h-6 border-2',
  lg: 'w-8 h-8 border-2',
  xl: 'w-12 h-12 border-2',
  '2xl': 'w-16 h-16 border-4',
};

const LoadingSpinner = forwardRef(({
  className = '',
  variant = 'default',
  size = 'md',
  ...props
}, ref) => {
  const baseClasses = 'inline-block rounded-full animate-spin';
  const variantClasses = spinnerVariants[variant] || spinnerVariants.default;
  const sizeClasses = spinnerSizes[size] || spinnerSizes.md;

  const combinedClassName = cn(
    baseClasses,
    variantClasses,
    sizeClasses,
    className
  );

  return (
    <div
      ref={ref}
      className={combinedClassName}
      role="status"
      aria-label="Loading"
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';

// Dots Loading Indicator
const LoadingDots = forwardRef(({
  className = '',
  variant = 'default',
  size = 'md',
  ...props
}, ref) => {
  const dotSizes = {
    xs: 'w-1 h-1',
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-3 h-3',
    xl: 'w-4 h-4',
  };

  const dotColors = {
    default: 'bg-amber-500',
    primary: 'bg-amber-500',
    secondary: 'bg-sky-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500',
  };

  const dotSize = dotSizes[size] || dotSizes.md;
  const dotColor = dotColors[variant] || dotColors.default;

  return (
    <div
      ref={ref}
      className={cn('flex space-x-1', className)}
      role="status"
      aria-label="Loading"
      {...props}
    >
      <div className={cn(dotSize, dotColor, 'rounded-full animate-bounce')} style={{ animationDelay: '0ms' }} />
      <div className={cn(dotSize, dotColor, 'rounded-full animate-bounce')} style={{ animationDelay: '150ms' }} />
      <div className={cn(dotSize, dotColor, 'rounded-full animate-bounce')} style={{ animationDelay: '300ms' }} />
      <span className="sr-only">Loading...</span>
    </div>
  );
});

LoadingDots.displayName = 'LoadingDots';

// Pulse Loading Indicator
const LoadingPulse = forwardRef(({
  className = '',
  variant = 'default',
  size = 'md',
  ...props
}, ref) => {
  const pulseSizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  const pulseColors = {
    default: 'bg-amber-500',
    primary: 'bg-amber-500',
    secondary: 'bg-sky-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500',
  };

  const pulseSize = pulseSizes[size] || pulseSizes.md;
  const pulseColor = pulseColors[variant] || pulseColors.default;

  return (
    <div
      ref={ref}
      className={cn(pulseSize, pulseColor, 'rounded-full animate-pulse', className)}
      role="status"
      aria-label="Loading"
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
});

LoadingPulse.displayName = 'LoadingPulse';

// Loading Bar Component
const LoadingBar = forwardRef(({
  className = '',
  variant = 'default',
  size = 'md',
  indeterminate = true,
  progress = 0,
  ...props
}, ref) => {
  const barSizes = {
    xs: 'h-1',
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
    xl: 'h-4',
  };

  const barColors = {
    default: 'bg-amber-500',
    primary: 'bg-amber-500',
    secondary: 'bg-sky-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500',
  };

  const barSize = barSizes[size] || barSizes.md;
  const barColor = barColors[variant] || barColors.default;

  return (
    <div
      ref={ref}
      className={cn('w-full bg-slate-700 rounded-full overflow-hidden', barSize, className)}
      role="progressbar"
      aria-valuemin="0"
      aria-valuemax="100"
      aria-valuenow={indeterminate ? undefined : progress}
      {...props}
    >
      {indeterminate ? (
        <div className={cn(barColor, 'h-full rounded-full animate-loading-bar')} />
      ) : (
        <div
          className={cn(barColor, 'h-full rounded-full transition-all duration-300 ease-out')}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      )}
    </div>
  );
});

LoadingBar.displayName = 'LoadingBar';

export default LoadingSpinner;
export {
  LoadingSpinner,
  LoadingDots,
  LoadingPulse,
  LoadingBar,
};