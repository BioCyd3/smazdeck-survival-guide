import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { useResponsive } from '../../hooks/useResponsive';

const buttonVariants = {
  primary: 'bg-amber-500 text-slate-900 hover:bg-amber-600 hover:scale-105 hover:shadow-lg active:bg-amber-700 active:scale-95 focus-visible:ring-amber-500 focus-visible:shadow-glow focus-visible:shadow-amber-500/25',
  secondary: 'bg-slate-700 text-slate-200 hover:bg-slate-600 hover:scale-105 hover:shadow-lg active:bg-slate-500 active:scale-95 focus-visible:ring-slate-500 focus-visible:shadow-glow focus-visible:shadow-slate-500/25',
  ghost: 'bg-transparent text-slate-200 hover:bg-slate-800 hover:scale-105 active:bg-slate-700 active:scale-95 focus-visible:ring-slate-500 focus-visible:bg-slate-800/50',
  danger: 'bg-red-600 text-white hover:bg-red-700 hover:scale-105 hover:shadow-lg active:bg-red-800 active:scale-95 focus-visible:ring-red-500 focus-visible:shadow-glow focus-visible:shadow-red-500/25',
  success: 'bg-green-600 text-white hover:bg-green-700 hover:scale-105 hover:shadow-lg active:bg-green-800 active:scale-95 focus-visible:ring-green-500 focus-visible:shadow-glow focus-visible:shadow-green-500/25',
  warning: 'bg-amber-600 text-slate-900 hover:bg-amber-700 hover:scale-105 hover:shadow-lg active:bg-amber-800 active:scale-95 focus-visible:ring-amber-500 focus-visible:shadow-glow focus-visible:shadow-amber-500/25',
  info: 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 hover:shadow-lg active:bg-blue-800 active:scale-95 focus-visible:ring-blue-500 focus-visible:shadow-glow focus-visible:shadow-blue-500/25',
  outline: 'border-2 border-slate-600 text-slate-200 hover:bg-slate-800 hover:border-slate-500 hover:scale-105 active:bg-slate-700 active:scale-95 focus-visible:ring-slate-500 focus-visible:border-slate-400',
};

const getButtonSizes = (isTouchDevice) => ({
  xs: isTouchDevice ? 'h-8 px-2 text-xs' : 'h-7 px-2 text-xs',
  sm: isTouchDevice ? 'h-10 px-3 text-sm' : 'h-8 px-3 text-sm',
  md: isTouchDevice ? 'h-12 px-4 text-base' : 'h-10 px-4 text-base',
  lg: isTouchDevice ? 'h-14 px-6 text-lg' : 'h-12 px-6 text-lg',
  xl: isTouchDevice ? 'h-16 px-8 text-xl' : 'h-14 px-8 text-xl',
});

const Button = forwardRef(({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon = null,
  iconPosition = 'left',
  fullWidth = false,
  type = 'button',
  ...props
}, ref) => {
  const { isTouchDevice, isMobile } = useResponsive();
  
  const baseClasses = cn(
    'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 disabled:pointer-events-none disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none',
    // Touch-friendly adjustments
    isTouchDevice && 'active:scale-95 select-none',
    // Mobile-specific adjustments
    isMobile && 'text-center'
  );
  
  const variantClasses = buttonVariants[variant] || buttonVariants.primary;
  const buttonSizes = getButtonSizes(isTouchDevice);
  const sizeClasses = buttonSizes[size] || buttonSizes.md;
  
  const loadingClasses = loading ? 'cursor-wait opacity-50' : '';
  const fullWidthClasses = fullWidth ? 'w-full' : '';
  const disabledClasses = disabled && !loading ? 'opacity-50 cursor-not-allowed' : '';

  const combinedClassName = cn(
    baseClasses,
    variantClasses,
    sizeClasses,
    loadingClasses,
    fullWidthClasses,
    disabledClasses,
    className
  );

  const iconSpacing = children ? (iconPosition === 'left' ? 'mr-2' : 'ml-2') : '';
  const iconSize = size === 'xs' ? 'w-3 h-3' : size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : size === 'xl' ? 'w-7 h-7' : 'w-5 h-5';

  const renderIcon = (iconElement) => {
    if (!iconElement) return null;
    
    return React.cloneElement(iconElement, {
      className: cn(iconSize, iconSpacing, iconElement.props.className),
      'aria-hidden': 'true'
    });
  };

  const renderLoadingSpinner = () => (
    <svg
      className={cn('animate-spin', iconSize, children ? 'mr-2' : '')}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  return (
    <button
      ref={ref}
      type={type}
      className={combinedClassName}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      {...props}
    >
      {loading && renderLoadingSpinner()}
      {!loading && icon && iconPosition === 'left' && renderIcon(icon)}
      {children}
      {!loading && icon && iconPosition === 'right' && renderIcon(icon)}
    </button>
  );
});

Button.displayName = 'Button';

// Button Group Component for related actions
const ButtonGroup = forwardRef(({
  children,
  className = '',
  orientation = 'horizontal',
  size = 'md',
  variant = 'primary',
  ...props
}, ref) => {
  const orientationClasses = orientation === 'vertical' 
    ? 'flex-col' 
    : 'flex-row';
    
  const groupClasses = cn(
    'inline-flex',
    orientationClasses,
    className
  );

  const enhancedChildren = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child) && child.type === Button) {
      const isFirst = index === 0;
      const isLast = index === React.Children.count(children) - 1;
      const isMiddle = !isFirst && !isLast;
      
      let groupingClasses = '';
      if (orientation === 'horizontal') {
        if (isFirst) groupingClasses = 'rounded-r-none border-r-0';
        else if (isLast) groupingClasses = 'rounded-l-none';
        else if (isMiddle) groupingClasses = 'rounded-none border-r-0';
      } else {
        if (isFirst) groupingClasses = 'rounded-b-none border-b-0';
        else if (isLast) groupingClasses = 'rounded-t-none';
        else if (isMiddle) groupingClasses = 'rounded-none border-b-0';
      }

      return React.cloneElement(child, {
        size: child.props.size || size,
        variant: child.props.variant || variant,
        className: cn(groupingClasses, child.props.className),
      });
    }
    return child;
  });

  return (
    <div
      ref={ref}
      className={groupClasses}
      role="group"
      {...props}
    >
      {enhancedChildren}
    </div>
  );
});

ButtonGroup.displayName = 'ButtonGroup';

// Icon Button Component for icon-only buttons
const IconButton = forwardRef(({
  icon,
  'aria-label': ariaLabel,
  size = 'md',
  variant = 'ghost',
  className = '',
  ...props
}, ref) => {
  const sizeClasses = {
    xs: 'h-7 w-7 p-1',
    sm: 'h-8 w-8 p-1.5',
    md: 'h-10 w-10 p-2',
    lg: 'h-12 w-12 p-2.5',
    xl: 'h-14 w-14 p-3',
  };

  return (
    <Button
      ref={ref}
      variant={variant}
      className={cn(sizeClasses[size], 'aspect-square', className)}
      aria-label={ariaLabel}
      {...props}
    >
      {icon}
    </Button>
  );
});

IconButton.displayName = 'IconButton';

export default Button;
export { Button, ButtonGroup, IconButton };