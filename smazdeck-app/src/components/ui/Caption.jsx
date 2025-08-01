import React from 'react';
import PropTypes from 'prop-types';

/**
 * Caption component for small descriptive text
 * Used for image captions, help text, and secondary information
 */
const Caption = ({
  as = 'span',
  size = 'sm',
  color = 'muted',
  weight = 'normal',
  className = '',
  children,
  ...props
}) => {
  // Dynamic component tag
  const Component = as;
  
  // Base classes for captions
  const baseClasses = 'font-sans';
  
  // Size classes optimized for small text
  const sizeClasses = {
    xs: 'text-xs leading-tight',
    sm: 'text-sm leading-snug',
    base: 'text-base leading-normal'
  };
  
  // Weight classes
  const weightClasses = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold'
  };
  
  // Color classes optimized for secondary text
  const colorClasses = {
    muted: 'text-slate-400',
    secondary: 'text-slate-300',
    accent: 'text-amber-400',
    success: 'text-green-400',
    warning: 'text-yellow-400',
    error: 'text-red-400',
    info: 'text-blue-400'
  };
  
  // Combine all classes
  const classes = [
    baseClasses,
    sizeClasses[size],
    weightClasses[weight],
    colorClasses[color],
    className
  ].filter(Boolean).join(' ');
  
  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};

Caption.propTypes = {
  /** HTML element to render as */
  as: PropTypes.oneOf(['span', 'p', 'div', 'small', 'figcaption']),
  /** Caption size */
  size: PropTypes.oneOf(['xs', 'sm', 'base']),
  /** Text color */
  color: PropTypes.oneOf(['muted', 'secondary', 'accent', 'success', 'warning', 'error', 'info']),
  /** Font weight */
  weight: PropTypes.oneOf(['light', 'normal', 'medium', 'semibold']),
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Content to render inside the caption */
  children: PropTypes.node.isRequired
};

export default Caption;