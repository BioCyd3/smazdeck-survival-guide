import React from 'react';
import PropTypes from 'prop-types';

/**
 * Text component for body content with proper line heights and spacing
 * Provides consistent typography for paragraphs and body text
 */
const Text = ({
  as = 'p',
  size = 'base',
  weight = 'normal',
  color = 'primary',
  align = 'left',
  leading = 'normal',
  className = '',
  children,
  ...props
}) => {
  // Dynamic component tag
  const Component = as;
  
  // Base classes for all text
  const baseClasses = 'font-sans';
  
  // Size classes with optimized line heights
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl'
  };
  
  // Weight classes
  const weightClasses = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  };
  
  // Color classes
  const colorClasses = {
    primary: 'text-slate-200',
    secondary: 'text-slate-300',
    muted: 'text-slate-400',
    accent: 'text-amber-400',
    success: 'text-green-400',
    warning: 'text-yellow-400',
    error: 'text-red-400',
    info: 'text-blue-400'
  };
  
  // Text alignment classes
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify'
  };
  
  // Line height classes
  const leadingClasses = {
    none: 'leading-none',
    tight: 'leading-tight',
    snug: 'leading-snug',
    normal: 'leading-normal',
    relaxed: 'leading-relaxed',
    loose: 'leading-loose'
  };
  
  // Combine all classes
  const classes = [
    baseClasses,
    sizeClasses[size],
    weightClasses[weight],
    colorClasses[color],
    alignClasses[align],
    leadingClasses[leading],
    className
  ].filter(Boolean).join(' ');
  
  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};

Text.propTypes = {
  /** HTML element to render as */
  as: PropTypes.oneOf(['p', 'span', 'div', 'strong', 'em', 'small']),
  /** Text size */
  size: PropTypes.oneOf(['xs', 'sm', 'base', 'lg', 'xl', '2xl']),
  /** Font weight */
  weight: PropTypes.oneOf(['light', 'normal', 'medium', 'semibold', 'bold']),
  /** Text color */
  color: PropTypes.oneOf(['primary', 'secondary', 'muted', 'accent', 'success', 'warning', 'error', 'info']),
  /** Text alignment */
  align: PropTypes.oneOf(['left', 'center', 'right', 'justify']),
  /** Line height */
  leading: PropTypes.oneOf(['none', 'tight', 'snug', 'normal', 'relaxed', 'loose']),
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Content to render inside the text */
  children: PropTypes.node.isRequired
};

export default Text;