import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';

const skeletonVariants = {
  default: 'bg-slate-700 animate-pulse',
  shimmer: 'bg-slate-700 relative overflow-hidden',
  pulse: 'bg-slate-700 animate-pulse',
  wave: 'bg-slate-700 relative overflow-hidden',
};

const skeletonSizes = {
  xs: 'h-3',
  sm: 'h-4',
  md: 'h-5',
  lg: 'h-6',
  xl: 'h-8',
  '2xl': 'h-10',
};

const Skeleton = forwardRef(({
  className = '',
  variant = 'default',
  size,
  width,
  height,
  rounded = true,
  ...props
}, ref) => {
  const baseClasses = 'block';
  const variantClasses = skeletonVariants[variant] || skeletonVariants.default;
  const sizeClasses = size ? (skeletonSizes[size] || size) : '';
  const roundedClasses = rounded ? 'rounded' : '';
  
  const widthClasses = width ? `w-${width}` : '';
  const heightClasses = height ? `h-${height}` : '';

  const combinedClassName = cn(
    baseClasses,
    variantClasses,
    sizeClasses,
    roundedClasses,
    widthClasses,
    heightClasses,
    className
  );

  return (
    <div
      ref={ref}
      className={combinedClassName}
      aria-label="Loading..."
      role="status"
      {...props}
    >
      {variant === 'shimmer' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-200/10 to-transparent animate-shimmer" />
      )}
      {variant === 'wave' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-200/20 to-transparent animate-wave" />
      )}
    </div>
  );
});

Skeleton.displayName = 'Skeleton';

// Skeleton Text Component
const SkeletonText = forwardRef(({
  lines = 3,
  className = '',
  variant = 'default',
  spacing = 'normal',
  ...props
}, ref) => {
  const spacingClasses = {
    tight: 'space-y-1',
    normal: 'space-y-2',
    loose: 'space-y-3',
  };

  return (
    <div
      ref={ref}
      className={cn('w-full', spacingClasses[spacing] || spacingClasses.normal, className)}
      {...props}
    >
      {Array.from({ length: lines }).map((_, index) => {
        // Vary line widths for more realistic appearance
        const widths = ['w-full', 'w-5/6', 'w-4/5', 'w-3/4', 'w-2/3'];
        const width = index === lines - 1 ? widths[Math.min(index + 1, widths.length - 1)] : 'w-full';
        
        return (
          <Skeleton
            key={index}
            variant={variant}
            size="sm"
            className={width}
          />
        );
      })}
    </div>
  );
});

SkeletonText.displayName = 'SkeletonText';

// Skeleton Avatar Component
const SkeletonAvatar = forwardRef(({
  size = 'md',
  className = '',
  variant = 'default',
  ...props
}, ref) => {
  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
    '2xl': 'w-20 h-20',
  };

  return (
    <Skeleton
      ref={ref}
      variant={variant}
      className={cn('rounded-full', sizeClasses[size] || sizeClasses.md, className)}
      {...props}
    />
  );
});

SkeletonAvatar.displayName = 'SkeletonAvatar';

// Skeleton Card Component
const SkeletonCard = forwardRef(({
  className = '',
  variant = 'default',
  showAvatar = false,
  showImage = false,
  textLines = 3,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn('p-4 space-y-4 bg-slate-800 border border-slate-700 rounded-lg', className)}
      {...props}
    >
      {showImage && (
        <Skeleton
          variant={variant}
          className="w-full h-48 rounded-lg"
        />
      )}
      
      <div className="space-y-3">
        {showAvatar && (
          <div className="flex items-center space-x-3">
            <SkeletonAvatar variant={variant} />
            <div className="space-y-2 flex-1">
              <Skeleton variant={variant} size="md" className="w-1/3" />
              <Skeleton variant={variant} size="sm" className="w-1/4" />
            </div>
          </div>
        )}
        
        <div className="space-y-2">
          <Skeleton variant={variant} size="lg" className="w-3/4" />
          <SkeletonText lines={textLines} variant={variant} />
        </div>
      </div>
    </div>
  );
});

SkeletonCard.displayName = 'SkeletonCard';

// Skeleton Table Component
const SkeletonTable = forwardRef(({
  rows = 5,
  columns = 4,
  className = '',
  variant = 'default',
  showHeader = true,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn('w-full space-y-2', className)}
      {...props}
    >
      {showHeader && (
        <div className="flex space-x-4 pb-2 border-b border-slate-700">
          {Array.from({ length: columns }).map((_, index) => (
            <Skeleton
              key={`header-${index}`}
              variant={variant}
              size="md"
              className="flex-1"
            />
          ))}
        </div>
      )}
      
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={`row-${rowIndex}`} className="flex space-x-4">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <Skeleton
                key={`cell-${rowIndex}-${colIndex}`}
                variant={variant}
                size="sm"
                className="flex-1"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
});

SkeletonTable.displayName = 'SkeletonTable';

export default Skeleton;
export {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonCard,
  SkeletonTable,
};