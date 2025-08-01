import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { useResponsive } from '../../hooks/useResponsive';
import { ResponsiveContainer } from './ResponsiveContainer';

/**
 * Responsive table component with mobile-first design
 * Automatically switches between table and card layout based on screen size
 */
const ResponsiveTable = ({
  data = [],
  columns = [],
  className = '',
  variant = 'default',
  size = 'md',
  sortable = false,
  selectable = false,
  loading = false,
  emptyMessage = 'No data available',
  mobileBreakpoint = 'md',
  showMobileHeaders = true,
  stickyHeader = false,
  maxHeight,
  onSort,
  onSelect,
  onRowClick,
  ...props
}) => {
  const { isMobile, below } = useResponsive();
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedRows, setSelectedRows] = useState(new Set());
  const tableRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Determine if we should use mobile layout
  const useMobileLayout = below(mobileBreakpoint);

  // Check scroll position for horizontal scroll indicators
  useEffect(() => {
    const checkScroll = () => {
      if (tableRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = tableRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
      }
    };

    const tableElement = tableRef.current;
    if (tableElement) {
      checkScroll();
      tableElement.addEventListener('scroll', checkScroll);
      return () => tableElement.removeEventListener('scroll', checkScroll);
    }
  }, [data]);

  // Handle sorting
  const handleSort = (key) => {
    if (!sortable) return;

    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    setSortConfig({ key, direction });
    onSort?.(key, direction);
  };

  // Handle row selection
  const handleRowSelect = (rowId, selected) => {
    const newSelected = new Set(selectedRows);
    if (selected) {
      newSelected.add(rowId);
    } else {
      newSelected.delete(rowId);
    }
    setSelectedRows(newSelected);
    onSelect?.(Array.from(newSelected));
  };

  // Handle select all
  const handleSelectAll = (selected) => {
    if (selected) {
      const allIds = data.map((row, index) => row.id || index);
      setSelectedRows(new Set(allIds));
      onSelect?.(allIds);
    } else {
      setSelectedRows(new Set());
      onSelect?.([]);
    }
  };

  // Render loading state
  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="h-12 bg-slate-700 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  // Render empty state
  if (!data.length) {
    return (
      <div className="text-center py-12">
        <div className="text-slate-400 text-lg mb-2">📊</div>
        <div className="text-slate-400">{emptyMessage}</div>
      </div>
    );
  }

  // Mobile card layout
  if (useMobileLayout) {
    return (
      <div className={cn('space-y-4', className)} {...props}>
        {data.map((row, rowIndex) => (
          <MobileTableCard
            key={row.id || rowIndex}
            row={row}
            columns={columns}
            showHeaders={showMobileHeaders}
            selectable={selectable}
            selected={selectedRows.has(row.id || rowIndex)}
            onSelect={(selected) => handleRowSelect(row.id || rowIndex, selected)}
            onClick={() => onRowClick?.(row, rowIndex)}
          />
        ))}
      </div>
    );
  }

  // Desktop table layout
  return (
    <div className={cn('relative', className)} {...props}>
      {/* Scroll indicators */}
      {canScrollLeft && (
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
      )}
      {canScrollRight && (
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />
      )}

      <div
        ref={tableRef}
        className={cn(
          'overflow-x-auto scrollbar-thin',
          maxHeight && 'overflow-y-auto',
          stickyHeader && 'relative'
        )}
        style={{ maxHeight }}
      >
        <table className="w-full border-collapse">
          <TableHeader
            columns={columns}
            sortable={sortable}
            selectable={selectable}
            sortConfig={sortConfig}
            selectedCount={selectedRows.size}
            totalCount={data.length}
            onSort={handleSort}
            onSelectAll={handleSelectAll}
            sticky={stickyHeader}
          />
          <TableBody
            data={data}
            columns={columns}
            selectable={selectable}
            selectedRows={selectedRows}
            onRowSelect={handleRowSelect}
            onRowClick={onRowClick}
            variant={variant}
            size={size}
          />
        </table>
      </div>
    </div>
  );
};

/**
 * Table header component
 */
const TableHeader = ({
  columns,
  sortable,
  selectable,
  sortConfig,
  selectedCount,
  totalCount,
  onSort,
  onSelectAll,
  sticky
}) => {
  const isAllSelected = selectedCount === totalCount && totalCount > 0;
  const isIndeterminate = selectedCount > 0 && selectedCount < totalCount;

  return (
    <thead className={cn(sticky && 'sticky top-0 z-20')}>
      <tr className="border-b border-slate-700 bg-slate-800">
        {selectable && (
          <th className="w-12 px-4 py-3 text-left">
            <input
              type="checkbox"
              checked={isAllSelected}
              ref={(el) => {
                if (el) el.indeterminate = isIndeterminate;
              }}
              onChange={(e) => onSelectAll(e.target.checked)}
              className="rounded border-slate-600 bg-slate-700 text-amber-500 focus:ring-amber-500"
            />
          </th>
        )}
        {columns.map((column) => (
          <th
            key={column.key}
            className={cn(
              'px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider',
              column.width && `w-${column.width}`,
              column.align === 'center' && 'text-center',
              column.align === 'right' && 'text-right',
              sortable && column.sortable !== false && 'cursor-pointer hover:text-slate-200'
            )}
            onClick={() => sortable && column.sortable !== false && onSort(column.key)}
          >
            <div className="flex items-center gap-2">
              <span>{column.header}</span>
              {sortable && column.sortable !== false && (
                <SortIcon
                  direction={sortConfig.key === column.key ? sortConfig.direction : null}
                />
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

/**
 * Table body component
 */
const TableBody = ({
  data,
  columns,
  selectable,
  selectedRows,
  onRowSelect,
  onRowClick,
  variant,
  size
}) => {
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg',
  };

  const cellClass = sizeClasses[size] || sizeClasses.md;

  return (
    <tbody className="divide-y divide-slate-700">
      {data.map((row, rowIndex) => {
        const rowId = row.id || rowIndex;
        const isSelected = selectedRows.has(rowId);

        return (
          <tr
            key={rowId}
            className={cn(
              'transition-colors duration-200',
              isSelected && 'bg-amber-500/10',
              onRowClick && 'cursor-pointer hover:bg-slate-800',
              variant === 'striped' && rowIndex % 2 === 1 && 'bg-slate-800/50'
            )}
            onClick={() => onRowClick?.(row, rowIndex)}
          >
            {selectable && (
              <td className={cellClass}>
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={(e) => onRowSelect(rowId, e.target.checked)}
                  onClick={(e) => e.stopPropagation()}
                  className="rounded border-slate-600 bg-slate-700 text-amber-500 focus:ring-amber-500"
                />
              </td>
            )}
            {columns.map((column) => (
              <td
                key={column.key}
                className={cn(
                  cellClass,
                  'text-slate-200',
                  column.align === 'center' && 'text-center',
                  column.align === 'right' && 'text-right'
                )}
              >
                {column.render ? column.render(row[column.key], row, rowIndex) : row[column.key]}
              </td>
            ))}
          </tr>
        );
      })}
    </tbody>
  );
};

/**
 * Mobile card layout for table data
 */
const MobileTableCard = ({
  row,
  columns,
  showHeaders,
  selectable,
  selected,
  onSelect,
  onClick
}) => {
  return (
    <div
      className={cn(
        'bg-slate-800 border border-slate-700 rounded-lg p-4 transition-all duration-200',
        selected && 'border-amber-500 bg-amber-500/5',
        onClick && 'cursor-pointer hover:border-slate-600 hover:bg-slate-800/80'
      )}
      onClick={onClick}
    >
      {selectable && (
        <div className="flex items-center mb-3">
          <input
            type="checkbox"
            checked={selected}
            onChange={(e) => onSelect(e.target.checked)}
            onClick={(e) => e.stopPropagation()}
            className="rounded border-slate-600 bg-slate-700 text-amber-500 focus:ring-amber-500"
          />
          <span className="ml-2 text-sm text-slate-400">Select</span>
        </div>
      )}

      <div className="space-y-3">
        {columns.map((column) => (
          <div key={column.key} className="flex justify-between items-start">
            {showHeaders && (
              <div className="text-sm font-medium text-slate-400 mr-4 min-w-0 flex-shrink-0">
                {column.header}:
              </div>
            )}
            <div className={cn(
              'text-slate-200 min-w-0 flex-1',
              column.align === 'right' && 'text-right'
            )}>
              {column.render ? column.render(row[column.key], row) : row[column.key]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Sort icon component
 */
const SortIcon = ({ direction }) => {
  return (
    <div className="flex flex-col">
      <svg
        className={cn(
          'w-3 h-3 transition-colors',
          direction === 'asc' ? 'text-amber-400' : 'text-slate-500'
        )}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" />
      </svg>
      <svg
        className={cn(
          'w-3 h-3 transition-colors -mt-1',
          direction === 'desc' ? 'text-amber-400' : 'text-slate-500'
        )}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
      </svg>
    </div>
  );
};

export default ResponsiveTable;
export { ResponsiveTable, MobileTableCard };