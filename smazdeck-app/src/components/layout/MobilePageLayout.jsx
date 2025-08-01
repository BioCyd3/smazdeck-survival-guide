import React from 'react';
import { cn } from '../../lib/utils';
import { useResponsive } from '../../hooks/useResponsive';
import { ResponsiveContainer, ResponsiveSection } from '../ui/ResponsiveContainer';

/**
 * Mobile-optimized page layout component
 * Provides consistent spacing, typography, and responsive behavior
 */
const MobilePageLayout = ({
  children,
  title,
  subtitle,
  description,
  actions,
  breadcrumbs,
  className = '',
  headerClassName = '',
  contentClassName = '',
  spacing = 'default',
  ...props
}) => {
  const { isMobile, isTablet } = useResponsive();

  return (
    <div className={cn('min-h-full', className)} {...props}>
      {/* Page Header */}
      {(title || subtitle || description || actions || breadcrumbs) && (
        <ResponsiveSection 
          spacing={isMobile ? 'sm' : 'default'}
          className={cn('border-b border-slate-800', headerClassName)}
        >
          <ResponsiveContainer>
            {/* Breadcrumbs */}
            {breadcrumbs && (
              <div className="mb-4">
                {breadcrumbs}
              </div>
            )}

            {/* Title and Actions */}
            <div className={cn(
              'flex items-start justify-between',
              isMobile ? 'flex-col space-y-4' : 'flex-row'
            )}>
              <div className="flex-1 min-w-0">
                {title && (
                  <h1 className={cn(
                    'font-display font-bold text-white tracking-tight',
                    isMobile ? 'text-2xl' : 'text-3xl lg:text-4xl'
                  )}>
                    {title}
                  </h1>
                )}
                
                {subtitle && (
                  <p className={cn(
                    'text-amber-400 font-medium mt-2',
                    isMobile ? 'text-sm' : 'text-base'
                  )}>
                    {subtitle}
                  </p>
                )}
                
                {description && (
                  <p className={cn(
                    'text-slate-300 mt-3 leading-relaxed',
                    isMobile ? 'text-sm' : 'text-base'
                  )}>
                    {description}
                  </p>
                )}
              </div>

              {/* Actions */}
              {actions && (
                <div className={cn(
                  'flex-shrink-0',
                  isMobile ? 'w-full' : 'ml-6'
                )}>
                  <div className={cn(
                    'flex gap-3',
                    isMobile ? 'flex-col' : 'flex-row'
                  )}>
                    {actions}
                  </div>
                </div>
              )}
            </div>
          </ResponsiveContainer>
        </ResponsiveSection>
      )}

      {/* Page Content */}
      <ResponsiveSection 
        spacing={spacing}
        className={contentClassName}
      >
        <ResponsiveContainer>
          {children}
        </ResponsiveContainer>
      </ResponsiveSection>
    </div>
  );
};

/**
 * Mobile-optimized section component for page content
 */
const MobileSection = ({
  children,
  title,
  description,
  actions,
  className = '',
  headerClassName = '',
  contentClassName = '',
  spacing = 'default',
  ...props
}) => {
  const { isMobile } = useResponsive();

  return (
    <section className={cn('space-y-6', className)} {...props}>
      {/* Section Header */}
      {(title || description || actions) && (
        <div className={cn(
          'flex items-start justify-between',
          isMobile ? 'flex-col space-y-3' : 'flex-row',
          headerClassName
        )}>
          <div className="flex-1 min-w-0">
            {title && (
              <h2 className={cn(
                'font-display font-semibold text-white',
                isMobile ? 'text-lg' : 'text-xl lg:text-2xl'
              )}>
                {title}
              </h2>
            )}
            
            {description && (
              <p className={cn(
                'text-slate-400 mt-2',
                isMobile ? 'text-sm' : 'text-base'
              )}>
                {description}
              </p>
            )}
          </div>

          {actions && (
            <div className={cn(
              'flex-shrink-0',
              isMobile ? 'w-full' : 'ml-4'
            )}>
              <div className={cn(
                'flex gap-2',
                isMobile ? 'flex-col' : 'flex-row'
              )}>
                {actions}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Section Content */}
      <div className={contentClassName}>
        {children}
      </div>
    </section>
  );
};

/**
 * Mobile-optimized card grid component
 */
const MobileCardGrid = ({
  children,
  cols = { sm: 1, md: 2, lg: 3, xl: 4 },
  gap = 'md',
  className = '',
  ...props
}) => {
  const { getGridCols } = useResponsive();

  const gapClasses = {
    none: 'gap-0',
    sm: 'gap-3',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  };

  const gridCols = getGridCols(cols.sm, cols.md, cols.lg, cols.xl);
  const gapClass = gapClasses[gap] || gapClasses.md;

  return (
    <div
      className={cn(
        'grid',
        `grid-cols-${gridCols}`,
        gapClass,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * Mobile-optimized list component
 */
const MobileList = ({
  children,
  divided = true,
  spacing = 'default',
  className = '',
  ...props
}) => {
  const { isMobile } = useResponsive();

  const spacingClasses = {
    none: 'space-y-0',
    sm: 'space-y-2',
    default: isMobile ? 'space-y-3' : 'space-y-4',
    lg: isMobile ? 'space-y-4' : 'space-y-6',
  };

  return (
    <div
      className={cn(
        spacingClasses[spacing],
        divided && 'divide-y divide-slate-800',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * Mobile-optimized empty state component
 */
const MobileEmptyState = ({
  icon,
  title,
  description,
  action,
  className = '',
  ...props
}) => {
  const { isMobile } = useResponsive();

  return (
    <div
      className={cn(
        'text-center py-12',
        isMobile && 'py-8',
        className
      )}
      {...props}
    >
      {icon && (
        <div className={cn(
          'mx-auto mb-4 text-slate-500',
          isMobile ? 'text-4xl' : 'text-5xl'
        )}>
          {icon}
        </div>
      )}
      
      {title && (
        <h3 className={cn(
          'font-medium text-slate-300 mb-2',
          isMobile ? 'text-base' : 'text-lg'
        )}>
          {title}
        </h3>
      )}
      
      {description && (
        <p className={cn(
          'text-slate-500 mb-6 max-w-md mx-auto',
          isMobile ? 'text-sm' : 'text-base'
        )}>
          {description}
        </p>
      )}
      
      {action && (
        <div>
          {action}
        </div>
      )}
    </div>
  );
};

export default MobilePageLayout;
export { 
  MobilePageLayout, 
  MobileSection, 
  MobileCardGrid, 
  MobileList, 
  MobileEmptyState 
};