import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { useResponsive } from '../../hooks/useResponsive';

/**
 * Responsive image component with mobile-first optimization
 * Supports lazy loading, different sizes for different breakpoints, and fallbacks
 */
const ResponsiveImage = ({
  src,
  alt = '',
  className = '',
  sizes = {},
  fallback,
  placeholder,
  lazy = true,
  aspectRatio = 'auto',
  objectFit = 'cover',
  quality = 'auto',
  loading = 'lazy',
  priority = false,
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);
  const imgRef = useRef(null);
  const { isMobile, isTablet, isDesktop, windowSize } = useResponsive();

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || isInView) return;

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

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, isInView]);

  // Get appropriate image source based on screen size
  const getImageSrc = () => {
    if (!src) return null;

    // If sizes object is provided, use responsive sources
    if (sizes && Object.keys(sizes).length > 0) {
      if (isMobile && sizes.mobile) return sizes.mobile;
      if (isTablet && sizes.tablet) return sizes.tablet;
      if (isDesktop && sizes.desktop) return sizes.desktop;
      if (sizes.default) return sizes.default;
    }

    return src;
  };

  // Generate srcSet for responsive images
  const generateSrcSet = () => {
    if (!sizes || Object.keys(sizes).length === 0) return undefined;

    const srcSetEntries = [];
    
    if (sizes.mobile) srcSetEntries.push(`${sizes.mobile} 640w`);
    if (sizes.tablet) srcSetEntries.push(`${sizes.tablet} 768w`);
    if (sizes.desktop) srcSetEntries.push(`${sizes.desktop} 1024w`);
    if (sizes.large) srcSetEntries.push(`${sizes.large} 1280w`);

    return srcSetEntries.length > 0 ? srcSetEntries.join(', ') : undefined;
  };

  // Generate sizes attribute for responsive images
  const generateSizesAttr = () => {
    if (!sizes || Object.keys(sizes).length === 0) return undefined;

    const sizesEntries = [];
    
    if (sizes.mobile) sizesEntries.push('(max-width: 640px) 100vw');
    if (sizes.tablet) sizesEntries.push('(max-width: 768px) 100vw');
    if (sizes.desktop) sizesEntries.push('(max-width: 1024px) 100vw');
    
    sizesEntries.push('100vw');

    return sizesEntries.join(', ');
  };

  const handleLoad = (event) => {
    setIsLoaded(true);
    onLoad?.(event);
  };

  const handleError = (event) => {
    setHasError(true);
    onError?.(event);
  };

  // Aspect ratio classes
  const aspectRatioClasses = {
    'auto': '',
    'square': 'aspect-square',
    '4/3': 'aspect-[4/3]',
    '3/2': 'aspect-[3/2]',
    '16/9': 'aspect-video',
    '21/9': 'aspect-[21/9]',
  };

  // Object fit classes
  const objectFitClasses = {
    contain: 'object-contain',
    cover: 'object-cover',
    fill: 'object-fill',
    none: 'object-none',
    'scale-down': 'object-scale-down',
  };

  const imageSrc = getImageSrc();
  const shouldShowImage = isInView && imageSrc && !hasError;

  return (
    <div
      ref={imgRef}
      className={cn(
        'relative overflow-hidden',
        aspectRatioClasses[aspectRatio],
        className
      )}
      {...props}
    >
      {/* Placeholder/Loading State */}
      {(!isLoaded || !shouldShowImage) && (
        <div className={cn(
          'absolute inset-0 flex items-center justify-center',
          'bg-slate-700 text-slate-400',
          aspectRatio === 'auto' && 'min-h-[200px]'
        )}>
          {placeholder || (
            <div className="flex flex-col items-center gap-2">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
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

      {/* Actual Image */}
      {shouldShowImage && (
        <img
          src={imageSrc}
          srcSet={generateSrcSet()}
          sizes={generateSizesAttr()}
          alt={alt}
          loading={priority ? 'eager' : loading}
          className={cn(
            'w-full h-full transition-opacity duration-300',
            objectFitClasses[objectFit],
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}

      {/* Loading Overlay */}
      {shouldShowImage && !isLoaded && (
        <div className="absolute inset-0 bg-slate-700 animate-pulse" />
      )}
    </div>
  );
};

/**
 * Image gallery component with responsive grid
 */
const ResponsiveImageGallery = ({
  images = [],
  className = '',
  cols = { sm: 1, md: 2, lg: 3, xl: 4 },
  gap = 'md',
  aspectRatio = '4/3',
  lazy = true,
  onImageClick,
  ...props
}) => {
  const { getGridCols } = useResponsive();

  const gapClasses = {
    none: 'gap-0',
    sm: 'gap-2',
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
      {images.map((image, index) => (
        <div
          key={image.id || index}
          className={cn(
            'cursor-pointer transition-transform duration-200 hover:scale-105',
            onImageClick && 'hover:shadow-lg'
          )}
          onClick={() => onImageClick?.(image, index)}
        >
          <ResponsiveImage
            src={image.src || image}
            alt={image.alt || `Image ${index + 1}`}
            sizes={image.sizes}
            aspectRatio={aspectRatio}
            lazy={lazy}
            className="rounded-lg overflow-hidden"
          />
          {image.caption && (
            <p className="mt-2 text-sm text-slate-400 text-center">
              {image.caption}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

/**
 * Avatar component with responsive sizing
 */
const ResponsiveAvatar = ({
  src,
  alt = '',
  name = '',
  size = 'md',
  className = '',
  fallback,
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
    <div
      className={cn(
        'relative rounded-full overflow-hidden bg-slate-700 flex items-center justify-center',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {src && !hasError ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
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
  );
};

export default ResponsiveImage;
export { ResponsiveImage, ResponsiveImageGallery, ResponsiveAvatar };