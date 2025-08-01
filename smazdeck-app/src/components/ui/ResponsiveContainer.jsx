import React from 'react';
import { cn } from '../../lib/utils';
import { useResponsive } from '../../hooks/useResponsive';

/**
 * Responsive container component with mobile-first design
 * Provides consistent spacing and layout across different screen sizes
 */
const ResponsiveContainer = ({
  children,
  className = '',
  size = 'default',
  padding = 'responsive',
  maxWidth = 'full',
  center = true,
  ...props
}) => {
  const { isMobile, isTablet, getContainerClass, getSpacing } = useResponsive();

  // Size variants
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full',
    screen: 'max-w-screen-2xl',
    default: 'max-w-7xl',
  };

  // Padding variants
  const paddingClasses = {
    none: '',
    sm: 'px-2 sm:px-4',
    md: 'px-4 sm:px-6',
    lg: 'px-4 sm:px-6 lg:px-8',
    xl: 'px-6 sm:px-8 lg:px-12',
    responsive: getSpacing('px-4', 'px-6', 'px-8'),
  };

  const baseClasses = center ? 'mx-auto' : '';
  const sizeClass = sizeClasses[size] || sizeClasses.default;
  const paddingClass = paddingClasses[padding] || paddingClasses.responsive;

  return (
    <div
      className={cn(
        baseClasses,
        sizeClass,
        paddingClass,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * Responsive grid container with mobile-first approach
 */
const ResponsiveGrid = ({
  children,
  className = '',
  cols = { sm: 1, md: 2, lg: 3, xl: 4 },
  gap = 'md',
  ...props
}) => {
  const { getGridCols } = useResponsive();

  const gapClasses = {
    none: 'gap-0',
    sm: 'gap-2 sm:gap-3',
    md: 'gap-3 sm:gap-4 lg:gap-6',
    lg: 'gap-4 sm:gap-6 lg:gap-8',
    xl: 'gap-6 sm:gap-8 lg:gap-10',
  };

  const gridCols = getGridCols(cols.sm, cols.md, cols.lg, cols.xl);
  const gapClass = gapClasses[gap] || gapClasses.md;

  return (
    <div
      className={cn(
        'grid',
        `grid-cols-${gridCols}`,
        gapClass,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * Responsive flex container
 */
const ResponsiveFlex = ({
  children,
  className = '',
  direction = 'responsive', // 'row', 'col', 'responsive'
  align = 'start',
  justify = 'start',
  wrap = true,
  gap = 'md',
  ...props
}) => {
  const { isMobile } = useResponsive();

  const directionClasses = {
    row: 'flex-row',
    col: 'flex-col',
    responsive: isMobile ? 'flex-col' : 'flex-row',
  };

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
    baseline: 'items-baseline',
  };

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  };

  const gapClasses = {
    none: 'gap-0',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  };

  return (
    <div
      className={cn(
        'flex',
        directionClasses[direction],
        alignClasses[align],
        justifyClasses[justify],
        wrap && 'flex-wrap',
        gapClasses[gap],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * Mobile-first section component
 */
const ResponsiveSection = ({
  children,
  className = '',
  spacing = 'default',
  background = 'transparent',
  ...props
}) => {
  const spacingClasses = {
    none: '',
    sm: 'py-4 sm:py-6',
    default: 'py-6 sm:py-8 lg:py-12',
    lg: 'py-8 sm:py-12 lg:py-16',
    xl: 'py-12 sm:py-16 lg:py-20',
  };

  const backgroundClasses = {
    transparent: '',
    slate: 'bg-slate-900',
    'slate-light': 'bg-slate-800',
    card: 'bg-slate-800 border border-slate-700 rounded-lg',
  };

  return (
    <section
      className={cn(
        spacingClasses[spacing],
        backgroundClasses[background],
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
};

/**
 * Touch-friendly interactive area
 */
const TouchArea = ({
  children,
  className = '',
  size = 'default',
  ...props
}) => {
  const { isTouchDevice } = useResponsive();

  const sizeClasses = {
    sm: isTouchDevice ? 'min-h-[40px] min-w-[40px]' : 'min-h-[32px] min-w-[32px]',
    default: isTouchDevice ? 'min-h-[44px] min-w-[44px]' : 'min-h-[36px] min-w-[36px]',
    lg: isTouchDevice ? 'min-h-[48px] min-w-[48px]' : 'min-h-[40px] min-w-[40px]',
  };

  return (
    <div
      className={cn(
        'flex items-center justify-center',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default ResponsiveContainer;
export { 
  ResponsiveContainer, 
  ResponsiveGrid, 
  ResponsiveFlex, 
  ResponsiveSection, 
  TouchArea 
};