import React, { useState, useMemo } from 'react';
import { cn } from '../../lib/utils';
import { useResponsive } from '../../hooks/useResponsive';
import { ResponsiveTable } from './ResponsiveTable';
import { ProgressiveDisclosure } from './ProgressiveDisclosure';
import { ResponsiveImage } from './ResponsiveImage';
import Card from './Card';
import Badge from './Badge';

/**
 * Data comparison component with mobile-first progressive enhancement
 * Automatically switches between table and card layouts based on complexity and screen size
 */
const DataComparison = ({
  data = [],
  columns = [],
  title,
  description,
  className = '',
  variant = 'default',
  compareMode = false,
  highlightDifferences = true,
  showImages = true,
  groupBy,
  sortBy,
  filterBy,
  maxMobileItems = 5,
  onItemClick,
  onCompare,
  ...props
}) => {
  const { isMobile, isTablet } = useResponsive();
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [showAll, setShowAll] = useState(false);
  const [sortConfig, setSortConfig] = useState(sortBy ? { key: sortBy, direction: 'desc' } : null);

  // Process and sort data
  const processedData = useMemo(() => {
    let processed = [...data];

    // Apply filtering
    if (filterBy) {
      processed = processed.filter(filterBy);
    }

    // Apply sorting
    if (sortConfig) {
      processed.sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
        }
        
        const aStr = String(aVal).toLowerCase();
        const bStr = String(bVal).toLowerCase();
        
        if (sortConfig.direction === 'asc') {
          return aStr.localeCompare(bStr);
        }
        return bStr.localeCompare(aStr);
      });
    }

    return processed;
  }, [data, filterBy, sortConfig]);

  // Group data if groupBy is specified
  const groupedData = useMemo(() => {
    if (!groupBy) return { 'All Items': processedData };

    return processedData.reduce((groups, item) => {
      const groupKey = typeof groupBy === 'function' ? groupBy(item) : item[groupBy];
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(item);
      return groups;
    }, {});
  }, [processedData, groupBy]);

  // Handle item selection for comparison
  const handleItemSelect = (item, selected) => {
    const newSelected = new Set(selectedItems);
    if (selected) {
      newSelected.add(item.id || item.name);
    } else {
      newSelected.delete(item.id || item.name);
    }
    setSelectedItems(newSelected);
    onCompare?.(Array.from(newSelected).map(id => 
      processedData.find(item => (item.id || item.name) === id)
    ).filter(Boolean));
  };

  // Mobile card layout for complex data
  const MobileDataCard = ({ item, index, isSelected, onSelect }) => {
    const primaryColumn = columns.find(col => col.primary) || columns[0];
    const secondaryColumns = columns.filter(col => !col.primary && col.showInMobile !== false);
    const detailColumns = columns.filter(col => col.showInMobile === false);

    return (
      <ProgressiveDisclosure
        title={item[primaryColumn?.key] || item.name}
        description={item.description || secondaryColumns[0] && `${secondaryColumns[0].header}: ${item[secondaryColumns[0].key]}`}
        className="mb-3"
        variant="filled"
        size="sm"
        icon={showImages && item.image && (
          <ResponsiveImage
            src={item.image}
            alt={item.name}
            className="w-8 h-8 rounded-full"
            aspectRatio="square"
            sizes={{
              mobile: item.image,
              default: item.image
            }}
          />
        )}
        badge={item.badge || (item.tier && (
          <Badge variant="outline" className="text-xs">
            {item.tier}
          </Badge>
        ))}
        actions={compareMode && (
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelect(item, e.target.checked)}
            className="rounded border-slate-600 bg-slate-700 text-amber-500 focus:ring-amber-500"
            onClick={(e) => e.stopPropagation()}
          />
        )}
      >
        {/* Primary stats - always visible */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {secondaryColumns.slice(0, 4).map((column) => (
            <div key={column.key} className="text-center">
              <div className="text-xs text-slate-400 mb-1">{column.header}</div>
              <div className="text-sm font-medium text-slate-200">
                {column.render ? column.render(item[column.key], item) : item[column.key]}
              </div>
            </div>
          ))}
        </div>

        {/* Detailed information */}
        {detailColumns.length > 0 && (
          <div className="space-y-2 pt-3 border-t border-slate-700">
            <h4 className="text-xs font-medium text-slate-400 uppercase tracking-wide">
              Detailed Stats
            </h4>
            <div className="space-y-2">
              {detailColumns.map((column) => (
                <div key={column.key} className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">{column.header}:</span>
                  <span className="text-sm text-slate-200">
                    {column.render ? column.render(item[column.key], item) : item[column.key]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Additional details */}
        {item.details && (
          <div className="pt-3 border-t border-slate-700">
            <h4 className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">
              Additional Details
            </h4>
            <div className="text-sm text-slate-300">
              {item.details}
            </div>
          </div>
        )}
      </ProgressiveDisclosure>
    );
  };

  // Render mobile layout
  if (isMobile) {
    return (
      <div className={cn('space-y-4', className)} {...props}>
        {title && (
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
            {description && (
              <p className="text-slate-400 text-sm">{description}</p>
            )}
          </div>
        )}

        {Object.entries(groupedData).map(([groupName, groupItems]) => (
          <div key={groupName}>
            {Object.keys(groupedData).length > 1 && (
              <h3 className="text-lg font-semibold text-amber-400 mb-3">
                {groupName}
              </h3>
            )}
            
            <div className="space-y-3">
              {(showAll ? groupItems : groupItems.slice(0, maxMobileItems)).map((item, index) => (
                <MobileDataCard
                  key={item.id || item.name || index}
                  item={item}
                  index={index}
                  isSelected={selectedItems.has(item.id || item.name)}
                  onSelect={handleItemSelect}
                />
              ))}
            </div>

            {groupItems.length > maxMobileItems && !showAll && (
              <button
                onClick={() => setShowAll(true)}
                className="w-full mt-4 py-3 px-4 bg-slate-800 border border-slate-600 rounded-lg text-slate-300 hover:bg-slate-700 transition-colors duration-200"
              >
                Show {groupItems.length - maxMobileItems} more items
              </button>
            )}
          </div>
        ))}

        {/* Comparison summary for mobile */}
        {compareMode && selectedItems.size > 0 && (
          <Card className="mt-6 bg-amber-500/10 border-amber-500/30">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-amber-400 mb-2">
                Comparison Selected
              </h3>
              <p className="text-slate-300 text-sm mb-3">
                {selectedItems.size} items selected for comparison
              </p>
              <button
                onClick={() => onCompare?.(Array.from(selectedItems))}
                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Compare Selected Items
              </button>
            </div>
          </Card>
        )}
      </div>
    );
  }

  // Desktop/tablet layout - use responsive table
  return (
    <div className={cn('space-y-6', className)} {...props}>
      {title && (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
          {description && (
            <p className="text-slate-400">{description}</p>
          )}
        </div>
      )}

      {Object.entries(groupedData).map(([groupName, groupItems]) => (
        <div key={groupName}>
          {Object.keys(groupedData).length > 1 && (
            <h3 className="text-xl font-semibold text-amber-400 mb-4">
              {groupName}
            </h3>
          )}
          
          <ResponsiveTable
            data={groupItems}
            columns={columns}
            variant={variant}
            sortable={true}
            selectable={compareMode}
            onSort={(key, direction) => setSortConfig({ key, direction })}
            onSelect={(selectedIds) => {
              const newSelected = new Set(selectedIds);
              setSelectedItems(newSelected);
              onCompare?.(selectedIds.map(id => 
                groupItems.find(item => (item.id || item.name) === id)
              ).filter(Boolean));
            }}
            onRowClick={onItemClick}
            className="mb-6"
          />
        </div>
      ))}
    </div>
  );
};

/**
 * Stat comparison component for detailed numeric comparisons
 */
const StatComparison = ({
  items = [],
  stats = [],
  title,
  className = '',
  highlightBest = true,
  showDifferences = true,
  ...props
}) => {
  const { isMobile } = useResponsive();

  if (!items.length || !stats.length) {
    return (
      <Card className={cn('text-center py-8', className)}>
        <div className="text-slate-400 text-xl mb-4">📊</div>
        <p className="text-slate-300">No data available for comparison</p>
      </Card>
    );
  }

  // Find best values for highlighting
  const bestValues = useMemo(() => {
    if (!highlightBest) return {};
    
    return stats.reduce((best, stat) => {
      const values = items.map(item => {
        const value = item[stat.key];
        return typeof value === 'number' ? value : parseFloat(value) || 0;
      });
      
      best[stat.key] = stat.higherIsBetter !== false 
        ? Math.max(...values)
        : Math.min(...values);
      
      return best;
    }, {});
  }, [items, stats, highlightBest]);

  // Mobile layout
  if (isMobile) {
    return (
      <div className={cn('space-y-4', className)} {...props}>
        {title && (
          <h3 className="text-lg font-semibold text-white text-center mb-4">
            {title}
          </h3>
        )}
        
        {items.map((item, index) => (
          <ProgressiveDisclosure
            key={item.id || item.name || index}
            title={item.name}
            description={`${stats.length} stats available`}
            className="mb-3"
            variant="outlined"
            size="sm"
          >
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat) => {
                const value = item[stat.key];
                const numValue = typeof value === 'number' ? value : parseFloat(value) || 0;
                const isBest = highlightBest && numValue === bestValues[stat.key];
                
                return (
                  <div key={stat.key} className="text-center">
                    <div className="text-xs text-slate-400 mb-1">{stat.label}</div>
                    <div className={cn(
                      'text-sm font-medium',
                      isBest ? 'text-amber-400' : 'text-slate-200'
                    )}>
                      {stat.format ? stat.format(value) : value}
                    </div>
                  </div>
                );
              })}
            </div>
          </ProgressiveDisclosure>
        ))}
      </div>
    );
  }

  // Desktop layout
  return (
    <Card className={cn('overflow-hidden', className)} {...props}>
      {title && (
        <div className="px-6 py-4 border-b border-slate-700">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700 bg-slate-800">
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                Item
              </th>
              {stats.map((stat) => (
                <th key={stat.key} className="px-4 py-3 text-center text-xs font-medium text-slate-300 uppercase tracking-wider">
                  {stat.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {items.map((item, index) => (
              <tr key={item.id || item.name || index} className="hover:bg-slate-800/50">
                <td className="px-4 py-3 text-sm font-medium text-slate-200">
                  {item.name}
                </td>
                {stats.map((stat) => {
                  const value = item[stat.key];
                  const numValue = typeof value === 'number' ? value : parseFloat(value) || 0;
                  const isBest = highlightBest && numValue === bestValues[stat.key];
                  
                  return (
                    <td key={stat.key} className="px-4 py-3 text-sm text-center">
                      <span className={cn(
                        'font-medium',
                        isBest ? 'text-amber-400' : 'text-slate-200'
                      )}>
                        {stat.format ? stat.format(value) : value}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default DataComparison;
export { DataComparison, StatComparison };