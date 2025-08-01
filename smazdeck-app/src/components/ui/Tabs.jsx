import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Tab navigation component with active state indicators and keyboard navigation
 * Supports horizontal scrolling on mobile and accessibility features
 */
const Tabs = ({ 
  tabs = [], 
  activeTab, 
  onTabChange, 
  className = '',
  variant = 'default',
  size = 'md',
  orientation = 'horizontal',
  'aria-label': ariaLabel = 'Tab navigation'
}) => {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const tabRefs = useRef([]);
  const tabListRef = useRef(null);

  // Variant styles
  const variantStyles = {
    default: {
      container: 'border-b border-slate-700',
      tab: 'px-4 py-2 font-medium text-sm transition-all duration-200 border-b-2 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900',
      active: 'text-amber-400 border-amber-400',
      inactive: 'text-slate-400 border-transparent hover:text-slate-300 hover:border-slate-600'
    },
    pills: {
      container: 'bg-slate-800 p-1 rounded-lg',
      tab: 'px-4 py-2 font-medium text-sm transition-all duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-800',
      active: 'bg-amber-500 text-slate-900',
      inactive: 'text-slate-400 hover:text-slate-300 hover:bg-slate-700'
    },
    minimal: {
      container: '',
      tab: 'px-3 py-2 font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-md',
      active: 'text-amber-400 bg-slate-800',
      inactive: 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/50'
    }
  };

  // Size styles
  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-6 py-3'
  };

  const styles = variantStyles[variant] || variantStyles.default;

  // Handle keyboard navigation
  const handleKeyDown = (event, index) => {
    const { key } = event;
    let newIndex = index;

    switch (key) {
      case 'ArrowLeft':
        event.preventDefault();
        newIndex = index > 0 ? index - 1 : tabs.length - 1;
        break;
      case 'ArrowRight':
        event.preventDefault();
        newIndex = index < tabs.length - 1 ? index + 1 : 0;
        break;
      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        newIndex = tabs.length - 1;
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        onTabChange(tabs[index].id);
        return;
      default:
        return;
    }

    setFocusedIndex(newIndex);
    tabRefs.current[newIndex]?.focus();
  };

  // Scroll active tab into view on mobile
  useEffect(() => {
    const activeIndex = tabs.findIndex(tab => tab.id === activeTab);
    if (activeIndex !== -1 && tabRefs.current[activeIndex] && tabListRef.current) {
      const tabElement = tabRefs.current[activeIndex];
      const containerElement = tabListRef.current;
      
      // Check if tab is out of view
      const tabRect = tabElement.getBoundingClientRect();
      const containerRect = containerElement.getBoundingClientRect();
      
      if (tabRect.left < containerRect.left || tabRect.right > containerRect.right) {
        tabElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'nearest', 
          inline: 'center' 
        });
      }
    }
  }, [activeTab, tabs]);

  if (tabs.length === 0) {
    return null;
  }

  return (
    <div className={`${className}`}>
      <div 
        className={`${styles.container} ${orientation === 'vertical' ? 'flex-col' : ''}`}
        role="tablist"
        aria-label={ariaLabel}
        aria-orientation={orientation}
      >
        <div 
          ref={tabListRef}
          className={`flex ${orientation === 'vertical' ? 'flex-col space-y-1' : 'space-x-1 overflow-x-auto scrollbar-hide'}`}
        >
          {tabs.map((tab, index) => {
            const isActive = tab.id === activeTab;
            const isDisabled = tab.disabled;
            
            return (
              <button
                key={tab.id}
                ref={el => tabRefs.current[index] = el}
                role="tab"
                aria-selected={isActive}
                aria-controls={`tabpanel-${tab.id}`}
                aria-disabled={isDisabled}
                tabIndex={isActive ? 0 : -1}
                disabled={isDisabled}
                className={`
                  ${styles.tab}
                  ${sizeStyles[size]}
                  ${isActive ? styles.active : styles.inactive}
                  ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  ${orientation === 'vertical' ? 'text-left justify-start' : 'whitespace-nowrap'}
                  flex items-center
                `}
                onClick={() => !isDisabled && onTabChange(tab.id)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onFocus={() => setFocusedIndex(index)}
              >
                {tab.icon && (
                  <span className="mr-2" aria-hidden="true">
                    {tab.icon}
                  </span>
                )}
                <span className="truncate">{tab.label}</span>
                {tab.badge && (
                  <span 
                    className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                      isActive 
                        ? 'bg-slate-900 text-amber-400' 
                        : 'bg-slate-700 text-slate-300'
                    }`}
                    aria-label={`${tab.badge} items`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/**
 * Tab panel component to wrap tab content
 */
export const TabPanel = ({ 
  id, 
  activeTab, 
  children, 
  className = '',
  lazy = false 
}) => {
  const isActive = id === activeTab;
  
  if (lazy && !isActive) {
    return null;
  }

  return (
    <div
      id={`tabpanel-${id}`}
      role="tabpanel"
      aria-labelledby={`tab-${id}`}
      className={`${className} ${isActive ? 'block' : 'hidden'}`}
      tabIndex={0}
    >
      {children}
    </div>
  );
};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.node,
      badge: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      disabled: PropTypes.bool
    })
  ).isRequired,
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'pills', 'minimal']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  'aria-label': PropTypes.string
};

TabPanel.propTypes = {
  id: PropTypes.string.isRequired,
  activeTab: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  lazy: PropTypes.bool
};

export default Tabs;