import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { Input } from './Input';
import { useResponsive } from '../../hooks/useResponsive';
import { TouchArea } from './ResponsiveContainer';

// Search Icon
const SearchIcon = ({ className, ...props }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

// Clear Icon
const ClearIcon = ({ className, ...props }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const SearchBar = forwardRef(({
  value = '',
  onChange,
  onSearch,
  onClear,
  placeholder = 'Search...',
  suggestions = [],
  onSuggestionSelect,
  showSuggestions = false,
  loading = false,
  disabled = false,
  size = 'md',
  className = '',
  clearable = true,
  autoComplete = 'off',
  debounceMs = 300,
  maxSuggestions = 10,
  highlightQuery = true,
  ...props
}, ref) => {
  const [focused, setFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [debouncedValue, setDebouncedValue] = useState(value);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const { isMobile, isTouchDevice, getTouchSize } = useResponsive();

  // Debounce search value
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [value, debounceMs]);

  // Trigger search when debounced value changes
  useEffect(() => {
    if (onSearch && debouncedValue !== '') {
      onSearch(debouncedValue);
    }
  }, [debouncedValue, onSearch]);

  const filteredSuggestions = suggestions.slice(0, maxSuggestions);
  const showSuggestionsList = showSuggestions && focused && filteredSuggestions.length > 0 && value.length > 0;

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    onChange?.(newValue);
    setSelectedIndex(-1);
  };

  const handleClear = () => {
    onChange?.('');
    onClear?.();
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  const handleSuggestionClick = (suggestion, index) => {
    onChange?.(suggestion.value || suggestion);
    onSuggestionSelect?.(suggestion, index);
    setFocused(false);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestionsList) {
      if (e.key === 'Enter') {
        e.preventDefault();
        onSearch?.(value);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredSuggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : filteredSuggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSuggestionClick(filteredSuggestions[selectedIndex], selectedIndex);
        } else {
          onSearch?.(value);
        }
        break;
      case 'Escape':
        setFocused(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
      default:
        break;
    }
  };

  const highlightText = (text, query) => {
    if (!highlightQuery || !query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-amber-400 text-slate-900 px-0.5 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  const renderLoadingSpinner = () => (
    <svg
      className="w-4 h-4 animate-spin text-slate-400"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
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
    <div className={cn('relative', className)}>
      <Input
        ref={ref || inputRef}
        type="text"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          // Delay blur to allow suggestion clicks
          setTimeout(() => {
            if (!suggestionsRef.current?.contains(document.activeElement)) {
              setFocused(false);
              setSelectedIndex(-1);
            }
          }, 150);
        }}
        placeholder={placeholder}
        disabled={disabled}
        size={size}
        autoComplete={autoComplete}
        leftIcon={<SearchIcon />}
        rightIcon={
          loading ? renderLoadingSpinner() : 
          (clearable && value && !disabled) ? <ClearIcon /> : null
        }
        onRightIconClick={clearable && value && !disabled ? handleClear : undefined}
        role="combobox"
        aria-expanded={showSuggestionsList}
        aria-haspopup="listbox"
        aria-autocomplete="list"
        aria-activedescendant={selectedIndex >= 0 ? `suggestion-${selectedIndex}` : undefined}
        {...props}
      />

      {/* Suggestions Dropdown */}
      {showSuggestionsList && (
        <div
          ref={suggestionsRef}
          className={cn(
            "absolute z-50 w-full mt-1 bg-slate-800 border border-slate-600 rounded-lg shadow-xl overflow-y-auto scrollbar-thin",
            isMobile ? "max-h-48" : "max-h-60"
          )}
          role="listbox"
        >
          {filteredSuggestions.map((suggestion, index) => {
            const isSelected = index === selectedIndex;
            const suggestionText = suggestion.label || suggestion.value || suggestion;
            const suggestionValue = suggestion.value || suggestion;

            return (
              <div
                key={index}
                id={`suggestion-${index}`}
                className={cn(
                  'cursor-pointer transition-colors border-b border-slate-700 last:border-b-0',
                  isMobile ? 'px-4 py-4' : 'px-4 py-3',
                  getTouchSize('min-h-[40px]', 'min-h-[48px]'),
                  'flex items-center',
                  isSelected 
                    ? 'bg-amber-500/10 text-amber-400' 
                    : 'text-slate-200 hover:bg-slate-700 active:bg-slate-600'
                )}
                onClick={() => handleSuggestionClick(suggestion, index)}
                onMouseEnter={() => setSelectedIndex(index)}
                role="option"
                aria-selected={isSelected}
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="flex-1">
                      {highlightText(suggestionText, value)}
                    </span>
                    {suggestion.category && (
                      <span className={cn(
                        "text-slate-400 ml-2",
                        isMobile ? "text-xs" : "text-xs"
                      )}>
                        {suggestion.category}
                      </span>
                    )}
                  </div>
                  {suggestion.description && (
                    <div className={cn(
                      "text-slate-400 mt-1",
                      isMobile ? "text-xs" : "text-sm"
                    )}>
                      {suggestion.description}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;