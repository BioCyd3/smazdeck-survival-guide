import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';

const radioVariants = {
  default: 'border-slate-600 bg-slate-800 checked:bg-amber-500 checked:border-amber-500 focus:ring-amber-500',
  error: 'border-red-500 bg-slate-800 checked:bg-red-500 checked:border-red-500 focus:ring-red-500',
  success: 'border-green-500 bg-slate-800 checked:bg-green-500 checked:border-green-500 focus:ring-green-500',
  warning: 'border-amber-500 bg-slate-800 checked:bg-amber-600 checked:border-amber-600 focus:ring-amber-500',
};

const radioSizes = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

const Radio = forwardRef(({
  className = '',
  variant = 'default',
  size = 'md',
  error = null,
  success = null,
  warning = null,
  disabled = false,
  required = false,
  label,
  description,
  value,
  checked,
  onChange,
  name,
  ...props
}, ref) => {
  // Determine variant based on validation states
  let currentVariant = variant;
  if (error) currentVariant = 'error';
  else if (success) currentVariant = 'success';
  else if (warning) currentVariant = 'warning';

  const baseClasses = 'border rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';
  const variantClasses = radioVariants[currentVariant] || radioVariants.default;
  const sizeClasses = radioSizes[size] || radioSizes.md;

  const radioClassName = cn(
    baseClasses,
    variantClasses,
    sizeClasses,
    'appearance-none relative flex items-center justify-center',
    className
  );

  const dotSize = size === 'sm' ? 'w-1.5 h-1.5' : size === 'lg' ? 'w-2.5 h-2.5' : 'w-2 h-2';

  const handleChange = (e) => {
    if (disabled) return;
    onChange?.(value, e);
  };

  const radioId = props.id || `radio-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="flex items-start space-x-3">
      <div className="relative flex items-center">
        <input
          ref={ref}
          type="radio"
          id={radioId}
          name={name}
          value={value}
          className={radioClassName}
          disabled={disabled}
          required={required}
          checked={checked}
          onChange={handleChange}
          {...props}
        />
        
        {/* Custom radio indicator */}
        <div className={cn(
          'absolute inset-0 flex items-center justify-center pointer-events-none'
        )}>
          <div className={cn(
            'rounded-full bg-white transition-all duration-200',
            dotSize,
            checked ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          )} />
        </div>
      </div>

      {(label || description) && (
        <div className="flex-1">
          {label && (
            <label
              htmlFor={radioId}
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

Radio.displayName = 'Radio';

// Radio Group Component
const RadioGroup = forwardRef(({
  options = [],
  value,
  onChange,
  name,
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
  const handleRadioChange = (optionValue) => {
    if (disabled) return;
    onChange?.(optionValue);
  };

  const groupId = props.id || `radio-group-${Math.random().toString(36).substr(2, 9)}`;
  const groupName = name || groupId;
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
        role="radiogroup"
        aria-labelledby={label ? `${groupId}-label` : undefined}
        aria-required={required}
        {...props}
      >
        {options.map((option, index) => {
          const optionValue = option.value || option;
          const optionLabel = option.label || option.value || option;
          const optionDescription = option.description;
          const isChecked = value === optionValue;
          const isDisabled = disabled || option.disabled;

          return (
            <Radio
              key={index}
              name={groupName}
              value={optionValue}
              checked={isChecked}
              onChange={() => handleRadioChange(optionValue)}
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

RadioGroup.displayName = 'RadioGroup';

export default Radio;
export { Radio, RadioGroup };