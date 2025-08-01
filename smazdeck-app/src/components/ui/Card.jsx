import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';

const cardVariants = {
  default: 'bg-slate-800 border border-slate-700 shadow-lg',
  elevated: 'bg-slate-800 border border-slate-700 shadow-xl',
  outlined: 'bg-transparent border-2 border-slate-600',
  glass: 'bg-slate-800/80 backdrop-blur-sm border border-slate-700/50',
};

const cardSizes = {
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8',
};

const Card = forwardRef(({
  children,
  className = '',
  variant = 'default',
  size = 'md',
  interactive = false,
  loading = false,
  hover = true,
  ...props
}, ref) => {
  const baseClasses = 'rounded-lg transition-all duration-200 ease-out';
  const variantClasses = cardVariants[variant] || cardVariants.default;
  const sizeClasses = cardSizes[size] || cardSizes.md;
  
  const interactiveClasses = interactive 
    ? 'cursor-pointer hover:scale-[1.02] hover:shadow-xl hover:shadow-amber-500/10 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:shadow-glow focus-visible:shadow-amber-500/25' 
    : '';
    
  const hoverClasses = hover && !loading 
    ? 'hover:shadow-xl hover:border-slate-600 hover:-translate-y-1' 
    : '';
    
  const loadingClasses = loading 
    ? 'animate-pulse pointer-events-none' 
    : '';

  const combinedClassName = cn(
    baseClasses,
    variantClasses,
    sizeClasses,
    interactiveClasses,
    hoverClasses,
    loadingClasses,
    className
  );

  if (loading) {
    return (
      <div
        ref={ref}
        className={combinedClassName}
        {...props}
      >
        <CardSkeleton />
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={combinedClassName}
      tabIndex={interactive ? 0 : undefined}
      role={interactive ? 'button' : undefined}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

// Card Header Component
const CardHeader = forwardRef(({ className = '', children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 pb-4', className)}
      {...props}
    >
      {children}
    </div>
  );
});

CardHeader.displayName = 'CardHeader';

// Card Title Component
const CardTitle = forwardRef(({ className = '', children, ...props }, ref) => {
  return (
    <h3
      ref={ref}
      className={cn('text-xl font-semibold leading-none tracking-tight text-slate-100', className)}
      {...props}
    >
      {children}
    </h3>
  );
});

CardTitle.displayName = 'CardTitle';

// Card Description Component
const CardDescription = forwardRef(({ className = '', children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn('text-sm text-slate-400 leading-relaxed', className)}
      {...props}
    >
      {children}
    </p>
  );
});

CardDescription.displayName = 'CardDescription';

// Card Content Component
const CardContent = forwardRef(({ className = '', children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('pt-0', className)}
      {...props}
    >
      {children}
    </div>
  );
});

CardContent.displayName = 'CardContent';

// Card Footer Component
const CardFooter = forwardRef(({ className = '', children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('flex items-center pt-4', className)}
      {...props}
    >
      {children}
    </div>
  );
});

CardFooter.displayName = 'CardFooter';

// Card Skeleton Component for loading states
const CardSkeleton = ({ lines = 3 }) => {
  return (
    <div className="space-y-3">
      <div className="skeleton h-6 w-3/4"></div>
      <div className="skeleton h-4 w-1/2"></div>
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className="skeleton h-4 w-full"></div>
        ))}
      </div>
    </div>
  );
};

export default Card;
export { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter, 
  CardSkeleton 
};
