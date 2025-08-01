import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Mobile-friendly navigation component with drawer, bottom navigation, and responsive patterns
 * Supports various layouts and accessibility features
 */
const MobileNavigation = ({
  items = [],
  variant = 'drawer',
  isOpen = false,
  onToggle,
  onClose,
  className = '',
  showOverlay = true,
  position = 'left',
  'aria-label': ariaLabel = 'Mobile navigation'
}) => {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const navRef = useRef(null);
  const overlayRef = useRef(null);
  const firstItemRef = useRef(null);

  // Handle escape key and focus management
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose?.();
      }
    };

    const handleClickOutside = (event) => {
      if (
        isOpen && 
        navRef.current && 
        !navRef.current.contains(event.target) &&
        overlayRef.current?.contains(event.target)
      ) {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('click', handleClickOutside);
      
      // Focus first item when opened
      setTimeout(() => {
        firstItemRef.current?.focus();
      }, 100);
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Keyboard navigation for items
  const handleItemKeyDown = (event, index) => {
    const { key } = event;
    let newIndex = index;

    switch (key) {
      case 'ArrowUp':
        event.preventDefault();
        newIndex = index > 0 ? index - 1 : items.length - 1;
        break;
      case 'ArrowDown':
        event.preventDefault();
        newIndex = index < items.length - 1 ? index + 1 : 0;
        break;
      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        newIndex = items.length - 1;
        break;
      default:
        return;
    }

    setFocusedIndex(newIndex);
    // Focus will be handled by the ref in the next render
  };

  // Drawer Navigation
  if (variant === 'drawer') {
    return (
      <>
        {/* Overlay */}
        {showOverlay && isOpen && (
          <div
            ref={overlayRef}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
            aria-hidden="true"
          />
        )}

        {/* Drawer */}
        <nav
          ref={navRef}
          className={`
            fixed top-0 ${position === 'right' ? 'right-0' : 'left-0'} h-full w-80 max-w-[85vw]
            bg-slate-800 shadow-xl z-50 transform transition-transform duration-300 ease-in-out
            ${isOpen ? 'translate-x-0' : position === 'right' ? 'translate-x-full' : '-translate-x-full'}
            ${className}
          `}
          aria-label={ariaLabel}
          aria-hidden={!isOpen}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-700">
            <h2 className="text-lg font-semibold text-white">Navigation</h2>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
              aria-label="Close navigation"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-4">
              {items.map((item, index) => (
                <li key={item.href || item.id}>
                  {item.href ? (
                    <NavLink
                      ref={index === 0 ? firstItemRef : null}
                      to={item.href}
                      onClick={onClose}
                      onKeyDown={(e) => handleItemKeyDown(e, index)}
                      className={({ isActive }) => `
                        flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
                        focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-800
                        ${isActive 
                          ? 'bg-amber-500 text-slate-900' 
                          : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                        }
                      `}
                      aria-current={({ isActive }) => isActive ? 'page' : undefined}
                    >
                      {item.icon && (
                        <span className="mr-3 text-lg" aria-hidden="true">
                          {item.icon}
                        </span>
                      )}
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto px-2 py-0.5 text-xs bg-slate-600 text-slate-300 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </NavLink>
                  ) : (
                    <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      {item.label}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </>
    );
  }

  // Bottom Navigation
  if (variant === 'bottom') {
    return (
      <nav
        className={`
          fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 z-40
          ${className}
        `}
        aria-label={ariaLabel}
      >
        <div className="flex">
          {items.slice(0, 5).map((item, index) => (
            <NavLink
              key={item.href || item.id}
              to={item.href}
              className={({ isActive }) => `
                flex-1 flex flex-col items-center justify-center py-2 px-1 text-xs font-medium
                transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400
                ${isActive 
                  ? 'text-amber-400' 
                  : 'text-slate-400 hover:text-slate-300'
                }
              `}
              aria-current={({ isActive }) => isActive ? 'page' : undefined}
            >
              {item.icon && (
                <span className="text-lg mb-1" aria-hidden="true">
                  {item.icon}
                </span>
              )}
              <span className="truncate max-w-full">{item.label}</span>
              {item.badge && (
                <span className="absolute -top-1 -right-1 px-1 py-0.5 text-xs bg-red-500 text-white rounded-full min-w-[1rem] text-center">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    );
  }

  // Horizontal Scroll Navigation
  if (variant === 'scroll') {
    return (
      <nav
        className={`
          overflow-x-auto scrollbar-hide border-b border-slate-700
          ${className}
        `}
        aria-label={ariaLabel}
      >
        <div className="flex space-x-1 px-4 py-2 min-w-max">
          {items.map((item, index) => (
            <NavLink
              key={item.href || item.id}
              to={item.href}
              className={({ isActive }) => `
                flex items-center px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap
                transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400
                ${isActive 
                  ? 'bg-amber-500 text-slate-900' 
                  : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }
              `}
              aria-current={({ isActive }) => isActive ? 'page' : undefined}
            >
              {item.icon && (
                <span className="mr-2" aria-hidden="true">
                  {item.icon}
                </span>
              )}
              <span>{item.label}</span>
              {item.badge && (
                <span className="ml-2 px-2 py-0.5 text-xs bg-slate-600 text-slate-300 rounded-full">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    );
  }

  return null;
};

MobileNavigation.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      href: PropTypes.string,
      label: PropTypes.string.isRequired,
      icon: PropTypes.node,
      badge: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  ).isRequired,
  variant: PropTypes.oneOf(['drawer', 'bottom', 'scroll']),
  isOpen: PropTypes.bool,
  onToggle: PropTypes.func,
  onClose: PropTypes.func,
  className: PropTypes.string,
  showOverlay: PropTypes.bool,
  position: PropTypes.oneOf(['left', 'right']),
  'aria-label': PropTypes.string
};

export default MobileNavigation;