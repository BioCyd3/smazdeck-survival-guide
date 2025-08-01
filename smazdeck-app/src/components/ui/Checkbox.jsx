import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';

// Check Icon
const CheckIcon = ({ className, ...props }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

// Minus Icon for indeterminate state
const MinusIcon = ({ className, ...props }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
  </svg>
);

const checkboxVariants = {
  default: 'border-slate-600 bg-slate-800 checked:bg-amber-500 checked:border-amber-500 focus:ring-amber-500',
  error: 'border-red-500 bg-slate-800 checked:bg-red-500 checked:border-red-500 focus:ring-red-500',
  success: 'border-green-500 bg-slate-800 checked:bg-green-500 checked:border-green-500 focus:ring-green-500',
  warning: 'border-amber-500 bg-slate-800 checked:bg-amber-600 checked:border-amber-600 focus:ring-amber-500',
};

const checkboxSizes = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

const Checkbox = forwardRef(({
  className = '',
  variant = 'default',
  size = 'md',
  error = null,
  success = null,
  warning = null,
  disabled = false,
  required = false,
  indeterminate = false,
  label,
  description,
  checked,
  onChange,
  ...props
}, ref) => {
  // Determine variant based on validation states
  let currentVariant = variant;
  if (error) currentVariant = 'error';
  else if (success) currentVariant = 'success';
  else if (warning) currentVariant = 'warning';

  const baseClasses = 'border rounded transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';
  const variantClasses = checkboxVariants[currentVariant] || checkboxVariants.default;
  const sizeClasses = checkboxSizes[size] || checkboxSizes.md;

  const checkboxClassName = cn(
    baseClasses,
    variantClasses,
    sizeClasses,
    'appearance-none relative flex items-center justify-center',
    className
  );

  const iconSize = size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5';

  const handleChange = (e) => {
    if (disabled) return;
    onChange?.(e.target.checked, e);
  };

  const checkboxId = props.id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="flex items-start space-x-3">
      <div className="relative flex items-center">
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          className={checkboxClassName}
          disabled={disabled}
          required={required}
          checked={checked}
          onChange={handleChange}
          {...props}
        />
        
        {/* Custom checkbox indicator */}
        <div className={cn(
          'absolute inset-0 flex items-center justify-center pointer-events-none',
          (checked || indeterminate) ? 'text-white' : 'text-transparent'
        )}>
          {indeterminate ? (
            <MinusIcon className={iconSize} />
          ) : (
            <CheckIcon className={iconSize} />
          )}
        </div>
      </div>

      {(label || description) && (
        <div className="flex-1">
          {label && (
            <label
              htmlFor={checkboxId}
              className={cn(
                'block text-sm font-medium cursor-pointer',
                disabled ? 'text-slate-500' : 'text-slate-200',
                'select-none'
              )}
            >
              {label}
              {required && <span className="text-red-400 ml-1">*</span>}
            </label>
          )}
          {description && (
            <p className={cn(
              'text-sm mt-1',
              disabled ? 'text-slate-600' : 'text-slate-400'
            )}>
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

// Checkbox Group Component
const CheckboxGroup = forwardRef(({
  options = [],
  value = [],
  onChange,
  label,
  description,
  error,
  required = false,
  disabled = false,
  variant = 'default',
  size = 'md',
  orientation = 'vertical',
  className = '',
  ...props
}, ref) => {
  const handleCheckboxChange = (optionValue, checked) => {
    if (disabled) return;
    
    const newValue = checked
      ? [...value, optionValue]
      : value.filter(v => v !== optionValue);
    
    onChange?.(newValue);
  };

  const groupId = props.id || `checkbox-group-${Math.random().toString(36).substr(2, 9)}`;
  const orientationClasses = orientation === 'horizontal' ? 'flex flex-wrap gap-6' : 'space-y-4';

  return (
    <div className={cn('space-y-3', className)} ref={ref}>
      {label && (
        <div>
          <label className="block text-sm font-medium text-slate-200">
            {label}
            {required && <span className="text-red-400 ml-1">*</span>}
          </label>
          {description && (
            <p className="text-sm text-slate-400 mt-1">{description}</p>
          )}
        </div>
      )}

      <div
        className={orientationClasses}
        role="group"
        aria-labelledby={label ? `${groupId}-label` : undefined}
        aria-required={required}
        {...props}
      >
        {options.map((option, index) => {
          const optionValue = option.value || option;
          const optionLabel = option.label || option.value || option;
          const optionDescription = option.description;
          const isChecked = value.includes(optionValue);
          const isDisabled = disabled || option.disabled;

          return (
            <Checkbox
              key={index}
              checked={isChecked}
              onChange={(checked) => handleCheckboxChange(optionValue, checked)}
              label={optionLabel}
              description={optionDescription}
              disabled={isDisabled}
              variant={variant}
              size={size}
              error={error}
            />
          );
        })}
      </div>

      {error && (
        <p className="text-sm text-red-400 flex items-center">
          <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
});

CheckboxGroup.displayName = 'CheckboxGroup';

export default Checkbox;
export { Checkbox, CheckboxGroup };