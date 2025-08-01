import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Breadcrumb navigation component with proper hierarchy and accessibility
 * Supports custom separators, icons, and mobile-friendly responsive design
 */
const Breadcrumb = ({ 
  items = [], 
  separator = '/', 
  className = '',
  showHome = true,
  maxItems = null,
  'aria-label': ariaLabel = 'Breadcrumb navigation'
}) => {
  // Add home item if showHome is true and not already present
  const breadcrumbItems = showHome && items.length > 0 && items[0].href !== '/' 
    ? [{ label: 'Home', href: '/' }, ...items]
    : items;

  // Truncate items if maxItems is specified
  const displayItems = maxItems && breadcrumbItems.length > maxItems
    ? [
        breadcrumbItems[0],
        { label: '...', href: null, isEllipsis: true },
        ...breadcrumbItems.slice(-maxItems + 2)
      ]
    : breadcrumbItems;

  if (displayItems.length === 0) {
    return null;
  }

  return (
    <nav 
      className={`mb-6 ${className}`} 
      aria-label={ariaLabel}
    >
      <ol className="flex items-center space-x-1 sm:space-x-2 text-sm text-slate-400 flex-wrap">
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;
          const isEllipsis = item.isEllipsis;
          
          return (
            <li key={`${item.href}-${index}`} className="flex items-center">
              {/* Breadcrumb Item */}
              <div className="flex items-center">
                {item.icon && (
                  <span className="mr-1 text-slate-500" aria-hidden="true">
                    {item.icon}
                  </span>
                )}
                
                {isEllipsis ? (
                  <span 
                    className="text-slate-500 px-1"
                    aria-hidden="true"
                  >
                    {item.label}
                  </span>
                ) : isLast ? (
                  <span 
                    className="text-slate-300 font-medium truncate max-w-[150px] sm:max-w-none"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    to={item.href}
                    className="hover:text-amber-400 transition-colors duration-200 truncate max-w-[100px] sm:max-w-none focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-sm px-1"
                    title={item.label}
                  >
                    {item.label}
                  </Link>
                )}
              </div>

              {/* Separator */}
              {!isLast && (
                <span 
                  className="mx-1 sm:mx-2 text-slate-600 select-none" 
                  aria-hidden="true"
                >
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string,
      icon: PropTypes.node,
      isEllipsis: PropTypes.bool
    })
  ).isRequired,
  separator: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  className: PropTypes.string,
  showHome: PropTypes.bool,
  maxItems: PropTypes.number,
  'aria-label': PropTypes.string
};

export default Breadcrumb;