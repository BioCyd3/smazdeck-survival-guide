import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';

// Chevron Down Icon
const ChevronDownIcon = ({ className, ...props }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

// Check Icon
const CheckIcon = ({ className, ...props }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const selectVariants = {
  default: 'border-slate-600 bg-slate-800 text-slate-200 focus:border-amber-500 focus:ring-amber-500',
  error: 'border-red-500 bg-slate-800 text-slate-200 focus:border-red-500 focus:ring-red-500',
  success: 'border-green-500 bg-slate-800 text-slate-200 focus:border-green-500 focus:ring-green-500',
  warning: 'border-amber-500 bg-slate-800 text-slate-200 focus:border-amber-500 focus:ring-amber-500',
};

const selectSizes = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-base',
  lg: 'h-12 px-6 text-lg',
};

const Select = forwardRef(({
  options = [],
  value,
  onChange,
  placeholder = 'Select an option...',
  variant = 'default',
  size = 'md',
  error = null,
  success = null,
  warning = null,
  disabled = false,
  required = false,
  fullWidth = true,
  searchable = false,
  multiple = false,
  clearable = false,
  className = '',
  ...props
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const selectRef = useRef(null);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Determine variant based on validation states
  let currentVariant = variant;
  if (error) currentVariant = 'error';
  else if (success) currentVariant = 'success';
  else if (warning) currentVariant = 'warning';

  const baseClasses = 'border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer relative';
  const variantClasses = selectVariants[currentVariant] || selectVariants.default;
  const sizeClasses = selectSizes[size] || selectSizes.md;
  const widthClasses = fullWidth ? 'w-full' : '';

  const combinedClassName = cn(
    baseClasses,
    variantClasses,
    sizeClasses,
    widthClasses,
    'flex items-center justify-between pr-10',
    className
  );

  // Filter options based on search term
  const filteredOptions = searchable && searchTerm
    ? options.filter(option => {
        const label = option.label || option.value || option;
        return label.toLowerCase().includes(searchTerm.toLowerCase());
      })
    : options;

  // Get selected option(s) for display
  const getSelectedDisplay = () => {
    if (multiple) {
      if (!value || value.length === 0) return placeholder;
      if (value.length === 1) {
        const option = options.find(opt => (opt.value || opt) === value[0]);
        return option?.label || option?.value || option || value[0];
      }
      return `${value.length} selected`;
    } else {
      if (!value) return placeholder;
      const option = options.find(opt => (opt.value || opt) === value);
      return option?.label || option?.value || option || value;
    }
  };

  const handleToggle = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
    setSelectedIndex(-1);
    if (!isOpen && searchable) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  };

  const handleOptionClick = (option) => {
    const optionValue = option.value || option;
    
    if (multiple) {
      const currentValues = value || [];
      const newValues = currentValues.includes(optionValue)
        ? currentValues.filter(v => v !== optionValue)
        : [...currentValues, optionValue];
      onChange?.(newValues);
    } else {
      onChange?.(optionValue);
      setIsOpen(false);
    }
    
    setSearchTerm('');
    setSelectedIndex(-1);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange?.(multiple ? [] : null);
    setSearchTerm('');
  };

  const handleKeyDown = (e) => {
    if (disabled) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else if (selectedIndex >= 0) {
          handleOptionClick(filteredOptions[selectedIndex]);
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setSelectedIndex(prev => 
            prev < filteredOptions.length - 1 ? prev + 1 : 0
          );
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (isOpen) {
          setSelectedIndex(prev => 
            prev > 0 ? prev - 1 : filteredOptions.length - 1
          );
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        selectRef.current?.focus();
        break;
      default:
        break;
    }
  };

  const isSelected = (option) => {
    const optionValue = option.value || option;
    if (multiple) {
      return value?.includes(optionValue) || false;
    }
    return value === optionValue;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={selectRef} className="relative">
      <div
        ref={ref}
        className={combinedClassName}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-required={required}
        aria-disabled={disabled}
        {...props}
      >
        <span className={cn(
          'truncate',
          (!value || (multiple && (!value || value.length === 0))) && 'text-slate-400'
        )}>
          {getSelectedDisplay()}
        </span>
        
        <div className="absolute right-3 flex items-center space-x-1">
          {clearable && value && (multiple ? value.length > 0 : true) && (
            <button
              type="button"
              onClick={handleClear}
              className="text-slate-400 hover:text-slate-200 transition-colors"
              tabIndex={-1}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          <ChevronDownIcon 
            className={cn(
              'w-4 h-4 text-slate-400 transition-transform duration-200',
              isOpen && 'transform rotate-180'
            )}
          />
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-slate-800 border border-slate-600 rounded-lg shadow-xl max-h-60 overflow-hidden"
        >
          {searchable && (
            <div className="p-2 border-b border-slate-700">
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search options..."
                className="w-full px-3 py-2 bg-slate-700 text-slate-200 border border-slate-600 rounded text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          )}
          
          <div className="overflow-y-auto max-h-48">
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-3 text-slate-400 text-sm">
                {searchTerm ? 'No options found' : 'No options available'}
              </div>
            ) : (
              filteredOptions.map((option, index) => {
                const isOptionSelected = isSelected(option);
                const isHighlighted = index === selectedIndex;
                const optionLabel = option.label || option.value || option;

                return (
                  <div
                    key={index}
                    className={cn(
                      'px-4 py-3 cursor-pointer transition-colors flex items-center justify-between',
                      isHighlighted && 'bg-slate-700',
                      isOptionSelected && 'bg-amber-500/10 text-amber-400'
                    )}
                    onClick={() => handleOptionClick(option)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    role="option"
                    aria-selected={isOptionSelected}
                  >
                    <span className="flex-1">{optionLabel}</span>
                    {isOptionSelected && (
                      <CheckIcon className="w-4 h-4 text-amber-400" />
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;