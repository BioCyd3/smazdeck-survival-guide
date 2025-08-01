import React from 'react';
import { cn } from '../../lib/utils';

const ProgressBar = ({
  value = 0,
  max = 100,
  size = 'md',
  variant = 'default',
  showValue = false,
  label,
  className = '',
  ...props
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
    xl: 'h-4',
  };

  const variantClasses = {
    default: 'bg-amber-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500',
    info: 'bg-blue-500',
    attack: 'bg-red-400',
    defense: 'bg-blue-400',
    hp: 'bg-green-400',
  };

  return (
    <div className={cn('w-full', className)} {...props}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1">
          {label && (
            <span className="text-xs font-medium text-slate-300">{label}</span>
          )}
          {showValue && (
            <span className="text-xs text-slate-400">
              {value}/{max}
            </span>
          )}
        </div>
      )}
      <div className={cn(
        'w-full bg-slate-700 rounded-full overflow-hidden',
        sizeClasses[size]
      )}>
        <div
          className={cn(
            'h-full transition-all duration-300 ease-out rounded-full',
            variantClasses[variant]
          )}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label}
        />
      </div>
    </div>
  );
};

export default ProgressBar;