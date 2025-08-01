import React, { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '../../lib/utils';
import { useResponsive } from '../../hooks/useResponsive';

/**
 * Optimized media component with progressive loading and responsive sizing
 * Supports images, videos, and lazy loading with intersection observer
 */
const OptimizedMedia = ({
  src,
  alt = '',
  type = 'image',
  className = '',
  sizes = {},
  placeholder,
  fallback,
  lazy = true,
  priority = false,
  aspectRatio = 'auto',
  objectFit = 'cover',
  quality = 'auto',
  blur = true,
  progressive = true,
  onLoad,
  onError,
  onClick,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(!lazy || priority);
  const [currentSrc, setCurrentSrc] = useState(null);
  const mediaRef = useRef(null);
  const { isMobile, isTablet, isDesktop, windowSize } = useResponsive();

  // Get optimal source based on screen size and device capabilities
  const getOptimalSource = useCallback(() => {
    if (!src) return null;

    // If sizes object is provided, use responsive sources
    if (sizes && Object.keys(sizes).length > 0) {
      // Check for device-specific optimizations
      if (isMobile) {
        // Mobile: prioritize smaller, faster loading images
        return sizes.mobile || sizes.small || sizes.default || src;
      } else if (isTablet) {
        // Tablet: medium quality images
        return sizes.tablet || sizes.medium || sizes.default || src;
      } else if (isDesktop) {
        // Desktop: high quality images
        return sizes.desktop || sizes.large || sizes.default || src;
      }
      
      return sizes.default || src;
    }

    return src;
  }, [src, sizes, isMobile, isTablet, isDesktop]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || isInView || priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    if (mediaRef.current) {
      observer.observe(mediaRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, isInView, priority]);

  // Progressive loading effect
  useEffect(() => {
    if (!isInView) return;

    const optimalSrc = getOptimalSource();
    if (!optimalSrc) return;

    if (progressive && !priority) {
      // Load low quality first, then high quality
      const lowQualitySrc = sizes?.placeholder || sizes?.small;
      if (lowQualitySrc && lowQualitySrc !== optimalSrc) {
        setCurrentSrc(lowQualitySrc);
        
        // Preload high quality image
        const highQualityImg = new Image();
        highQualityImg.onload = () => {
          setCurrentSrc(optimalSrc);
        };
        highQualityImg.src = optimalSrc;
      } else {
        setCurrentSrc(optimalSrc);
      }
    } else {
      setCurrentSrc(optimalSrc);
    }
  }, [isInView, getOptimalSource, progressive, priority, sizes]);

  // Generate srcSet for responsive images
  const generateSrcSet = useCallback(() => {
    if (!sizes || Object.keys(sizes).length === 0) return undefined;

    const srcSetEntries = [];
    
    if (sizes.small) srcSetEntries.push(`${sizes.small} 320w`);
    if (sizes.mobile) srcSetEntries.push(`${sizes.mobile} 640w`);
    if (sizes.tablet) srcSetEntries.push(`${sizes.tablet} 768w`);
    if (sizes.medium) srcSetEntries.push(`${sizes.medium} 1024w`);
    if (sizes.desktop) srcSetEntries.push(`${sizes.desktop} 1280w`);
    if (sizes.large) srcSetEntries.push(`${sizes.large} 1920w`);

    return srcSetEntries.length > 0 ? srcSetEntries.join(', ') : undefined;
  }, [sizes]);

  // Generate sizes attribute
  const generateSizesAttr = useCallback(() => {
    if (!sizes || Object.keys(sizes).length === 0) return undefined;

    const sizesEntries = [];
    
    if (sizes.small) sizesEntries.push('(max-width: 320px) 320px');
    if (sizes.mobile) sizesEntries.push('(max-width: 640px) 640px');
    if (sizes.tablet) sizesEntries.push('(max-width: 768px) 768px');
    if (sizes.medium) sizesEntries.push('(max-width: 1024px) 1024px');
    if (sizes.desktop) sizesEntries.push('(max-width: 1280px) 1280px');
    
    sizesEntries.push('100vw');

    return sizesEntries.join(', ');
  }, [sizes]);

  const handleLoad = useCallback((event) => {
    setIsLoaded(true);
    onLoad?.(event);
  }, [onLoad]);

  const handleError = useCallback((event) => {
    setHasError(true);
    onError?.(event);
  }, [onError]);

  // Aspect ratio classes
  const aspectRatioClasses = {
    'auto': '',
    'square': 'aspect-square',
    '4/3': 'aspect-[4/3]',
    '3/2': 'aspect-[3/2]',
    '16/9': 'aspect-video',
    '21/9': 'aspect-[21/9]',
    '1/1': 'aspect-square',
    '3/4': 'aspect-[3/4]',
  };

  // Object fit classes
  const objectFitClasses = {
    contain: 'object-contain',
    cover: 'object-cover',
    fill: 'object-fill',
    none: 'object-none',
    'scale-down': 'object-scale-down',
  };

  const shouldShowMedia = isInView && currentSrc && !hasError;

  return (
    <div
      ref={mediaRef}
      className={cn(
        'relative overflow-hidden',
        aspectRatioClasses[aspectRatio],
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      {...props}
    >
      {/* Placeholder/Loading State */}
      {(!isLoaded || !shouldShowMedia) && (
        <div className={cn(
          'absolute inset-0 flex items-center justify-center',
          'bg-slate-700 text-slate-400',
          aspectRatio === 'auto' && 'min-h-[200px]',
          blur && 'backdrop-blur-sm'
        )}>
          {placeholder || (
            <div className="flex flex-col items-center gap-2">
              {type === 'video' ? (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              )}
              <span className="text-sm">Loading...</span>
            </div>
          )}
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className={cn(
          'absolute inset-0 flex items-center justify-center',
          'bg-slate-800 text-slate-500',
          aspectRatio === 'auto' && 'min-h-[200px]'
        )}>
          {fallback || (
            <div className="flex flex-col items-center gap-2">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm">Failed to load</span>
            </div>
          )}
        </div>
      )}

      {/* Actual Media */}
      {shouldShowMedia && (
        <>
          {type === 'video' ? (
            <video
              src={currentSrc}
              className={cn(
                'w-full h-full transition-opacity duration-300',
                objectFitClasses[objectFit],
                isLoaded ? 'opacity-100' : 'opacity-0'
              )}
              onLoadedData={handleLoad}
              onError={handleError}
              controls
              preload={priority ? 'auto' : 'metadata'}
            />
          ) : (
            <img
              src={currentSrc}
              srcSet={generateSrcSet()}
              sizes={generateSizesAttr()}
              alt={alt}
              loading={priority ? 'eager' : 'lazy'}
              className={cn(
                'w-full h-full transition-opacity duration-300',
                objectFitClasses[objectFit],
                isLoaded ? 'opacity-100' : 'opacity-0'
              )}
              onLoad={handleLoad}
              onError={handleError}
            />
          )}
        </>
      )}

      {/* Loading Overlay with Progressive Enhancement */}
      {shouldShowMedia && !isLoaded && (
        <div className={cn(
          'absolute inset-0 transition-opacity duration-300',
          progressive ? 'bg-slate-700/50 backdrop-blur-sm' : 'bg-slate-700 animate-pulse'
        )} />
      )}

      {/* Quality Indicator (Development only) */}
      {process.env.NODE_ENV === 'development' && currentSrc && (
        <div className="absolute top-2 right-2 px-2 py-1 bg-black/50 text-white text-xs rounded">
          {Object.entries(sizes).find(([_, url]) => url === currentSrc)?.[0] || 'default'}
        </div>
      )}
    </div>
  );
};

/**
 * Media gallery with optimized loading and responsive grid
 */
const OptimizedMediaGallery = ({
  items = [],
  className = '',
  cols = { sm: 1, md: 2, lg: 3, xl: 4 },
  gap = 'md',
  aspectRatio = '4/3',
  lazy = true,
  progressive = true,
  onItemClick,
  ...props
}) => {
  const { isMobile, isTablet } = useResponsive();

  const gapClasses = {
    none: 'gap-0',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  };

  const getGridCols = () => {
    if (isMobile) return cols.sm || 1;
    if (isTablet) return cols.md || 2;
    return cols.lg || 3;
  };

  const gridCols = getGridCols();
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
      {items.map((item, index) => (
        <div
          key={item.id || index}
          className={cn(
            'transition-transform duration-200 hover:scale-105',
            onItemClick && 'cursor-pointer hover:shadow-lg'
          )}
          onClick={() => onItemClick?.(item, index)}
        >
          <OptimizedMedia
            src={item.src || item.url}
            alt={item.alt || item.title || `Media ${index + 1}`}
            type={item.type || 'image'}
            sizes={item.sizes}
            aspectRatio={aspectRatio}
            lazy={lazy && index > (gridCols * 2)} // Load first 2 rows immediately
            progressive={progressive}
            className="rounded-lg overflow-hidden"
          />
          {item.caption && (
            <p className="mt-2 text-sm text-slate-400 text-center">
              {item.caption}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

/**
 * Optimized avatar with multiple fallback strategies
 */
const OptimizedAvatar = ({
  src,
  alt = '',
  name = '',
  size = 'md',
  className = '',
  fallback,
  showOnlineStatus = false,
  isOnline = false,
  ...props
}) => {
  const { isMobile } = useResponsive();
  const [hasError, setHasError] = useState(false);

  const sizeClasses = {
    xs: isMobile ? 'w-6 h-6 text-xs' : 'w-5 h-5 text-xs',
    sm: isMobile ? 'w-8 h-8 text-sm' : 'w-7 h-7 text-sm',
    md: isMobile ? 'w-12 h-12 text-base' : 'w-10 h-10 text-base',
    lg: isMobile ? 'w-16 h-16 text-lg' : 'w-14 h-14 text-lg',
    xl: isMobile ? 'w-20 h-20 text-xl' : 'w-18 h-18 text-xl',
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={cn('relative', className)} {...props}>
      <div
        className={cn(
          'rounded-full overflow-hidden bg-slate-700 flex items-center justify-center',
          sizeClasses[size]
        )}
      >
        {src && !hasError ? (
          <OptimizedMedia
            src={src}
            alt={alt}
            aspectRatio="square"
            objectFit="cover"
            className="w-full h-full"
            sizes={{
              small: src,
              mobile: src,
              default: src
            }}
            onError={() => setHasError(true)}
          />
        ) : fallback ? (
          fallback
        ) : name ? (
          <span className="font-medium text-slate-300">
            {getInitials(name)}
          </span>
        ) : (
          <svg className="w-1/2 h-1/2 text-slate-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        )}
      </div>

      {/* Online status indicator */}
      {showOnlineStatus && (
        <div
          className={cn(
            'absolute bottom-0 right-0 rounded-full border-2 border-slate-800',
            isOnline ? 'bg-green-500' : 'bg-slate-500',
            size === 'xs' && 'w-2 h-2',
            size === 'sm' && 'w-2.5 h-2.5',
            size === 'md' && 'w-3 h-3',
            size === 'lg' && 'w-4 h-4',
            size === 'xl' && 'w-5 h-5'
          )}
        />
      )}
    </div>
  );
};

export default OptimizedMedia;
export { OptimizedMedia, OptimizedMediaGallery, OptimizedAvatar };