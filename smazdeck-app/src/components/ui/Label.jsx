import React from 'react';
import PropTypes from 'prop-types';

/**
 * Label component for form labels and UI text
 * Provides consistent styling for interactive element labels
 */
const Label = ({
  as = 'label',
  size = 'sm',
  weight = 'medium',
  color = 'primary',
  required = false,
  disabled = false,
  className = '',
  children,
  ...props
}) => {
  // Dynamic component tag
  const Component = as;
  
  // Base classes for labels
  const baseClasses = 'font-sans block';
  
  // Size classes
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg'
  };
  
  // Weight classes
  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  };
  
  // Color classes with disabled state support
  const colorClasses = {
    primary: disabled ? 'text-slate-500' : 'text-slate-200',
    secondary: disabled ? 'text-slate-600' : 'text-slate-300',
    muted: disabled ? 'text-slate-600' : 'text-slate-400',
    accent: disabled ? 'text-amber-600' : 'text-amber-400'
  };
  
  // State classes
  const stateClasses = {
    disabled: 'cursor-not-allowed',
    enabled: 'cursor-pointer'
  };
  
  // Combine all classes
  const classes = [
    baseClasses,
    sizeClasses[size],
    weightClasses[weight],
    colorClasses[color],
    stateClasses[disabled ? 'disabled' : 'enabled'],
    className
  ].filter(Boolean).join(' ');
  
  return (
    <Component className={classes} {...props}>
      {children}
      {required && (
        <span className="text-red-400 ml-1" aria-label="required">
          *
        </span>
      )}
    </Component>
  );
};

Label.propTypes = {
  /** HTML element to render as */
  as: PropTypes.oneOf(['label', 'span', 'div', 'legend']),
  /** Label size */
  size: PropTypes.oneOf(['xs', 'sm', 'base', 'lg']),
  /** Font weight */
  weight: PropTypes.oneOf(['normal', 'medium', 'semibold', 'bold']),
  /** Text color */
  color: PropTypes.oneOf(['primary', 'secondary', 'muted', 'accent']),
  /** Whether the field is required */
  required: PropTypes.bool,
  /** Whether the label is disabled */
  disabled: PropTypes.bool,
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Content to render inside the label */
  children: PropTypes.node.isRequired
};

export default Label;