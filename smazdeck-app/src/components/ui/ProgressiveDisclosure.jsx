import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { useResponsive } from '../../hooks/useResponsive';

/**
 * Progressive disclosure component for mobile-first design
 * Shows summary information with expandable details
 */
const ProgressiveDisclosure = ({
  children,
  summary,
  title,
  description,
  className = '',
  variant = 'default',
  size = 'md',
  defaultExpanded = false,
  disabled = false,
  icon,
  badge,
  actions,
  expandIcon,
  collapseIcon,
  animationDuration = 300,
  onToggle,
  ...props
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [height, setHeight] = useState(defaultExpanded ? 'auto' : 0);
  const contentRef = useRef(null);
  const { isMobile, isTouchDevice } = useResponsive();

  // Handle expansion animation
  useEffect(() => {
    if (contentRef.current) {
      if (isExpanded) {
        const scrollHeight = contentRef.current.scrollHeight;
        setHeight(scrollHeight);
        // Set to auto after animation completes
        setTimeout(() => setHeight('auto'), animationDuration);
      } else {
        setHeight(contentRef.current.scrollHeight);
        // Force reflow then collapse
        requestAnimationFrame(() => setHeight(0));
      }
    }
  }, [isExpanded, animationDuration]);

  const handleToggle = () => {
    if (disabled) return;
    
    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);
    onToggle?.(newExpanded);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle();
    }
  };

  // Variant styles
  const variantClasses = {
    default: 'bg-slate-800 border border-slate-700',
    outlined: 'border-2 border-slate-600 bg-transparent',
    filled: 'bg-slate-700 border border-slate-600',
    ghost: 'bg-transparent border-none',
  };

  // Size styles
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const paddingClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  return (
    <div
      className={cn(
        'rounded-lg transition-all duration-200',
        variantClasses[variant],
        sizeClasses[size],
        isExpanded && 'shadow-lg',
        className
      )}
      {...props}
    >
      {/* Header/Summary */}
      <div
        className={cn(
          'flex items-center justify-between cursor-pointer select-none',
          paddingClasses[size],
          disabled && 'cursor-not-allowed opacity-50',
          isTouchDevice && 'min-h-[44px]',
          'hover:bg-slate-700/50 transition-colors duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800 rounded-lg'
        )}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        role="button"
        aria-expanded={isExpanded}
        aria-controls="disclosure-content"
        aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${title || 'details'}`}
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {/* Icon */}
          {icon && (
            <div className="flex-shrink-0 text-slate-400">
              {icon}
            </div>
          )}

          {/* Content */}
          <div className="min-w-0 flex-1">
            {title && (
              <div className="flex items-center gap-2 mb-1">
                <h3 className={cn(
                  'font-medium text-slate-200 truncate',
                  size === 'sm' && 'text-sm',
                  size === 'lg' && 'text-lg'
                )}>
                  {title}
                </h3>
                {badge && (
                  <span className="flex-shrink-0 px-2 py-0.5 text-xs bg-slate-600 text-slate-300 rounded-full">
                    {badge}
                  </span>
                )}
              </div>
            )}
            
            {description && (
              <p className={cn(
                'text-slate-400 truncate',
                size === 'sm' && 'text-xs',
                size === 'lg' && 'text-base'
              )}>
                {description}
              </p>
            )}
            
            {summary && !title && !description && (
              <div className="text-slate-200">
                {summary}
              </div>
            )}
          </div>
        </div>

        {/* Actions and Expand Icon */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {actions && (
            <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
              {actions}
            </div>
          )}
          
          {/* Expand/Collapse Icon */}
          <div className={cn(
            'text-slate-400 transition-transform duration-200',
            isExpanded && 'rotate-180'
          )}>
            {isExpanded && collapseIcon ? collapseIcon : expandIcon || (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </div>
        </div>
      </div>

      {/* Expandable Content */}
      <div
        ref={contentRef}
        id="disclosure-content"
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ height: height === 'auto' ? 'auto' : `${height}px` }}
        aria-hidden={!isExpanded}
      >
        <div className={cn(
          'border-t border-slate-700',
          paddingClasses[size],
          'pt-4'
        )}>
          {children}
        </div>
      </div>
    </div>
  );
};

/**
 * Accordion component for multiple progressive disclosure items
 */
const Accordion = ({
  children,
  className = '',
  allowMultiple = false,
  defaultExpanded = [],
  ...props
}) => {
  const [expandedItems, setExpandedItems] = useState(new Set(defaultExpanded));

  const handleItemToggle = (index, expanded) => {
    const newExpanded = new Set(expandedItems);
    
    if (expanded) {
      if (!allowMultiple) {
        newExpanded.clear();
      }
      newExpanded.add(index);
    } else {
      newExpanded.delete(index);
    }
    
    setExpandedItems(newExpanded);
  };

  return (
    <div className={cn('space-y-2', className)} {...props}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child) && child.type === ProgressiveDisclosure) {
          return React.cloneElement(child, {
            key: index,
            defaultExpanded: expandedItems.has(index),
            onToggle: (expanded) => {
              handleItemToggle(index, expanded);
              child.props.onToggle?.(expanded);
            },
          });
        }
        return child;
      })}
    </div>
  );
};

/**
 * Mobile-optimized details card with progressive disclosure
 */
const MobileDetailsCard = ({
  title,
  subtitle,
  summary,
  details,
  image,
  actions,
  className = '',
  ...props
}) => {
  const { isMobile } = useResponsive();

  return (
    <ProgressiveDisclosure
      title={title}
      description={subtitle}
      className={cn('w-full', className)}
      size={isMobile ? 'sm' : 'md'}
      icon={image && (
        <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-700 flex-shrink-0">
          {typeof image === 'string' ? (
            <img src={image} alt="" className="w-full h-full object-cover" />
          ) : (
            image
          )}
        </div>
      )}
      actions={actions}
      {...props}
    >
      {summary && (
        <div className="mb-4 text-slate-300">
          {summary}
        </div>
      )}
      
      {details && (
        <div className="space-y-3">
          {details}
        </div>
      )}
    </ProgressiveDisclosure>
  );
};

/**
 * Expandable section for grouping related content
 */
const ExpandableSection = ({
  title,
  children,
  defaultExpanded = false,
  count,
  className = '',
  ...props
}) => {
  return (
    <ProgressiveDisclosure
      title={title}
      badge={count}
      defaultExpanded={defaultExpanded}
      className={cn('w-full', className)}
      variant="outlined"
      {...props}
    >
      {children}
    </ProgressiveDisclosure>
  );
};

export default ProgressiveDisclosure;
export { 
  ProgressiveDisclosure, 
  Accordion, 
  MobileDetailsCard, 
  ExpandableSection 
};