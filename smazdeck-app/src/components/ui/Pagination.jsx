import React from 'react';
import PropTypes from 'prop-types';

/**
 * Pagination component with page size options and mobile-friendly design
 * Supports various display modes and accessibility features
 */
const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  pageSize = 10,
  pageSizeOptions = [10, 25, 50, 100],
  onPageChange,
  onPageSizeChange,
  showPageSize = true,
  showInfo = true,
  showFirstLast = true,
  maxVisiblePages = 5,
  className = '',
  size = 'md',
  'aria-label': ariaLabel = 'Pagination navigation'
}) => {
  // Calculate visible page range
  const getVisiblePages = () => {
    const pages = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);
    
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, currentPage + halfVisible);
    
    // Adjust if we're near the beginning or end
    if (endPage - startPage + 1 < maxVisiblePages) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      } else {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const visiblePages = getVisiblePages();
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Size styles
  const sizeStyles = {
    sm: {
      button: 'px-2 py-1 text-xs',
      select: 'text-xs px-2 py-1',
      info: 'text-xs'
    },
    md: {
      button: 'px-3 py-2 text-sm',
      select: 'text-sm px-3 py-2',
      info: 'text-sm'
    },
    lg: {
      button: 'px-4 py-3 text-base',
      select: 'text-base px-4 py-3',
      info: 'text-base'
    }
  };

  const styles = sizeStyles[size] || sizeStyles.md;

  // Button component for pagination buttons
  const PaginationButton = ({ 
    page, 
    isActive = false, 
    isDisabled = false, 
    children, 
    onClick,
    'aria-label': buttonAriaLabel 
  }) => (
    <button
      onClick={() => !isDisabled && onClick(page)}
      disabled={isDisabled}
      aria-label={buttonAriaLabel}
      aria-current={isActive ? 'page' : undefined}
      className={`
        ${styles.button}
        font-medium transition-all duration-200 border rounded-md
        focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900
        ${isActive 
          ? 'bg-amber-500 text-slate-900 border-amber-500' 
          : isDisabled
            ? 'bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed'
            : 'bg-slate-800 text-slate-300 border-slate-600 hover:bg-slate-700 hover:border-slate-500'
        }
      `}
    >
      {children}
    </button>
  );

  if (totalPages <= 1 && !showPageSize && !showInfo) {
    return null;
  }

  return (
    <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${className}`}>
      {/* Page Size Selector */}
      {showPageSize && pageSizeOptions.length > 1 && (
        <div className="flex items-center gap-2">
          <label htmlFor="page-size-select" className={`text-slate-400 ${styles.info}`}>
            Show:
          </label>
          <select
            id="page-size-select"
            value={pageSize}
            onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
            className={`
              ${styles.select}
              bg-slate-800 text-slate-300 border border-slate-600 rounded-md
              focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400
              hover:border-slate-500 transition-colors duration-200
            `}
            aria-label="Items per page"
          >
            {pageSizeOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <span className={`text-slate-400 ${styles.info}`}>per page</span>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <nav aria-label={ariaLabel}>
          <div className="flex items-center gap-1">
            {/* First Page */}
            {showFirstLast && currentPage > 1 && (
              <PaginationButton
                page={1}
                onClick={onPageChange}
                aria-label="Go to first page"
              >
                <span className="sr-only">First page</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
              </PaginationButton>
            )}

            {/* Previous Page */}
            <PaginationButton
              page={currentPage - 1}
              isDisabled={currentPage <= 1}
              onClick={onPageChange}
              aria-label="Go to previous page"
            >
              <span className="sr-only">Previous page</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </PaginationButton>

            {/* Page Numbers */}
            {visiblePages[0] > 1 && (
              <>
                <PaginationButton
                  page={1}
                  onClick={onPageChange}
                  aria-label="Go to page 1"
                >
                  1
                </PaginationButton>
                {visiblePages[0] > 2 && (
                  <span className="px-2 text-slate-500" aria-hidden="true">...</span>
                )}
              </>
            )}

            {visiblePages.map(page => (
              <PaginationButton
                key={page}
                page={page}
                isActive={page === currentPage}
                onClick={onPageChange}
                aria-label={`Go to page ${page}`}
              >
                {page}
              </PaginationButton>
            ))}

            {visiblePages[visiblePages.length - 1] < totalPages && (
              <>
                {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                  <span className="px-2 text-slate-500" aria-hidden="true">...</span>
                )}
                <PaginationButton
                  page={totalPages}
                  onClick={onPageChange}
                  aria-label={`Go to page ${totalPages}`}
                >
                  {totalPages}
                </PaginationButton>
              </>
            )}

            {/* Next Page */}
            <PaginationButton
              page={currentPage + 1}
              isDisabled={currentPage >= totalPages}
              onClick={onPageChange}
              aria-label="Go to next page"
            >
              <span className="sr-only">Next page</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </PaginationButton>

            {/* Last Page */}
            {showFirstLast && currentPage < totalPages && (
              <PaginationButton
                page={totalPages}
                onClick={onPageChange}
                aria-label="Go to last page"
              >
                <span className="sr-only">Last page</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0zm-6 0a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </PaginationButton>
            )}
          </div>
        </nav>
      )}

      {/* Info Text */}
      {showInfo && totalItems > 0 && (
        <div className={`text-slate-400 ${styles.info} text-center sm:text-left`}>
          Showing {startItem.toLocaleString()} to {endItem.toLocaleString()} of {totalItems.toLocaleString()} results
        </div>
      )}
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  totalItems: PropTypes.number,
  pageSize: PropTypes.number,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
  onPageChange: PropTypes.func.isRequired,
  onPageSizeChange: PropTypes.func,
  showPageSize: PropTypes.bool,
  showInfo: PropTypes.bool,
  showFirstLast: PropTypes.bool,
  maxVisiblePages: PropTypes.number,
  className: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  'aria-label': PropTypes.string
};

export default Pagination;