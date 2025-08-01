import React, { forwardRef, useState } from 'react';
import { cn } from '../../lib/utils';

const inputVariants = {
  default: 'border-slate-600 bg-slate-800 text-slate-200 placeholder-slate-400 hover:border-slate-500 focus:border-amber-500 focus:ring-amber-500 focus:shadow-glow focus:shadow-amber-500/10',
  error: 'border-red-500 bg-slate-800 text-slate-200 placeholder-slate-400 hover:border-red-400 focus:border-red-500 focus:ring-red-500 focus:shadow-glow focus:shadow-red-500/10',
  success: 'border-green-500 bg-slate-800 text-slate-200 placeholder-slate-400 hover:border-green-400 focus:border-green-500 focus:ring-green-500 focus:shadow-glow focus:shadow-green-500/10',
  warning: 'border-amber-500 bg-slate-800 text-slate-200 placeholder-slate-400 hover:border-amber-400 focus:border-amber-500 focus:ring-amber-500 focus:shadow-glow focus:shadow-amber-500/10',
};

const inputSizes = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-base',
  lg: 'h-12 px-6 text-lg',
};

const Input = forwardRef(({
  className = '',
  type = 'text',
  variant = 'default',
  size = 'md',
  error = null,
  success = null,
  warning = null,
  disabled = false,
  required = false,
  fullWidth = true,
  leftIcon = null,
  rightIcon = null,
  onLeftIconClick = null,
  onRightIconClick = null,
  ...props
}, ref) => {
  const [focused, setFocused] = useState(false);

  // Determine variant based on validation states
  let currentVariant = variant;
  if (error) currentVariant = 'error';
  else if (success) currentVariant = 'success';
  else if (warning) currentVariant = 'warning';

  const baseClasses = 'border rounded-lg transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-slate-600';
  const variantClasses = inputVariants[currentVariant] || inputVariants.default;
  const sizeClasses = inputSizes[size] || inputSizes.md;
  const widthClasses = fullWidth ? 'w-full' : '';
  const paddingClasses = leftIcon ? 'pl-10' : rightIcon ? 'pr-10' : '';

  const combinedClassName = cn(
    baseClasses,
    variantClasses,
    sizeClasses,
    widthClasses,
    paddingClasses,
    className
  );

  const iconSize = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5';
  const iconPosition = size === 'sm' ? 'top-2' : size === 'lg' ? 'top-3' : 'top-2.5';

  const renderIcon = (icon, position, onClick) => {
    if (!icon) return null;

    const positionClasses = position === 'left' 
      ? `left-3 ${iconPosition}` 
      : `right-3 ${iconPosition}`;

    return (
      <div
        className={cn(
          'absolute flex items-center justify-center',
          positionClasses,
          onClick ? 'cursor-pointer hover:text-amber-400 transition-colors' : 'text-slate-400'
        )}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={onClick ? (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick(e);
          }
        } : undefined}
      >
        {React.cloneElement(icon, {
          className: cn(iconSize, icon.props.className),
          'aria-hidden': 'true'
        })}
      </div>
    );
  };

  return (
    <div className="relative">
      {renderIcon(leftIcon, 'left', onLeftIconClick)}
      <input
        ref={ref}
        type={type}
        className={combinedClassName}
        disabled={disabled}
        required={required}
        onFocus={(e) => {
          setFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          props.onBlur?.(e);
        }}
        {...props}
      />
      {renderIcon(rightIcon, 'right', onRightIconClick)}
    </div>
  );
});

Input.displayName = 'Input';

// Label Component
const Label = forwardRef(({
  className = '',
  required = false,
  children,
  ...props
}, ref) => {
  return (
    <label
      ref={ref}
      className={cn(
        'block text-sm font-medium text-slate-200 mb-2',
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="text-red-400 ml-1">*</span>}
    </label>
  );
});

Label.displayName = 'Label';

// Form Field Component (combines Label, Input, and validation messages)
const FormField = forwardRef(({
  label,
  error,
  success,
  warning,
  hint,
  required = false,
  className = '',
  children,
  ...props
}, ref) => {
  const inputId = props.id || `field-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <Label htmlFor={inputId} required={required}>
          {label}
        </Label>
      )}
      
      {React.isValidElement(children) ? (
        React.cloneElement(children, {
          id: inputId,
          error,
          success,
          warning,
          required,
          'aria-describedby': error ? `${inputId}-error` : success ? `${inputId}-success` : warning ? `${inputId}-warning` : hint ? `${inputId}-hint` : undefined,
          ...children.props
        })
      ) : (
        <Input
          ref={ref}
          id={inputId}
          error={error}
          success={success}
          warning={warning}
          required={required}
          aria-describedby={error ? `${inputId}-error` : success ? `${inputId}-success` : warning ? `${inputId}-warning` : hint ? `${inputId}-hint` : undefined}
          {...props}
        />
      )}

      {hint && !error && !success && !warning && (
        <p id={`${inputId}-hint`} className="text-sm text-slate-400">
          {hint}
        </p>
      )}

      {error && (
        <p id={`${inputId}-error`} className="text-sm text-red-400 flex items-center">
          <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}

      {success && (
        <p id={`${inputId}-success`} className="text-sm text-green-400 flex items-center">
          <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {success}
        </p>
      )}

      {warning && (
        <p id={`${inputId}-warning`} className="text-sm text-amber-400 flex items-center">
          <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {warning}
        </p>
      )}
    </div>
  );
});

FormField.displayName = 'FormField';

// Textarea Component
const Textarea = forwardRef(({
  className = '',
  variant = 'default',
  error = null,
  success = null,
  warning = null,
  disabled = false,
  required = false,
  fullWidth = true,
  rows = 4,
  resize = 'vertical',
  ...props
}, ref) => {
  // Determine variant based on validation states
  let currentVariant = variant;
  if (error) currentVariant = 'error';
  else if (success) currentVariant = 'success';
  else if (warning) currentVariant = 'warning';

  const baseClasses = 'border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-3';
  const variantClasses = inputVariants[currentVariant] || inputVariants.default;
  const widthClasses = fullWidth ? 'w-full' : '';
  const resizeClasses = resize === 'none' ? 'resize-none' : resize === 'horizontal' ? 'resize-x' : resize === 'vertical' ? 'resize-y' : 'resize';

  const combinedClassName = cn(
    baseClasses,
    variantClasses,
    widthClasses,
    resizeClasses,
    className
  );

  return (
    <textarea
      ref={ref}
      className={combinedClassName}
      disabled={disabled}
      required={required}
      rows={rows}
      {...props}
    />
  );
});

Textarea.displayName = 'Textarea';

export default Input;
export { Input, Label, FormField, Textarea };