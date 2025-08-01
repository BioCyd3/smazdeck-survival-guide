import { useState, useEffect } from 'react';

/**
 * Custom hook for responsive design utilities
 * Provides breakpoint detection and responsive helpers
 */
export const useResponsive = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  const [breakpoint, setBreakpoint] = useState('sm');

  // Tailwind CSS breakpoints
  const breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setWindowSize({ width, height });

      // Determine current breakpoint
      if (width >= breakpoints['2xl']) {
        setBreakpoint('2xl');
      } else if (width >= breakpoints.xl) {
        setBreakpoint('xl');
      } else if (width >= breakpoints.lg) {
        setBreakpoint('lg');
      } else if (width >= breakpoints.md) {
        setBreakpoint('md');
      } else {
        setBreakpoint('sm');
      }
    };

    // Set initial values
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Helper functions
  const isMobile = windowSize.width < breakpoints.md;
  const isTablet = windowSize.width >= breakpoints.md && windowSize.width < breakpoints.lg;
  const isDesktop = windowSize.width >= breakpoints.lg;
  const isLargeScreen = windowSize.width >= breakpoints.xl;

  // Touch device detection
  const isTouchDevice = typeof window !== 'undefined' && 
    ('ontouchstart' in window || (navigator && navigator.maxTouchPoints > 0));

  // Orientation detection
  const isLandscape = windowSize.width > windowSize.height;
  const isPortrait = windowSize.height >= windowSize.width;

  // Safe area detection for mobile devices
  const safeAreaInsets = {
    top: typeof window !== 'undefined' ? 
      parseInt(getComputedStyle(document.documentElement).getPropertyValue('env(safe-area-inset-top)') || '0') : 0,
    bottom: typeof window !== 'undefined' ? 
      parseInt(getComputedStyle(document.documentElement).getPropertyValue('env(safe-area-inset-bottom)') || '0') : 0,
    left: typeof window !== 'undefined' ? 
      parseInt(getComputedStyle(document.documentElement).getPropertyValue('env(safe-area-inset-left)') || '0') : 0,
    right: typeof window !== 'undefined' ? 
      parseInt(getComputedStyle(document.documentElement).getPropertyValue('env(safe-area-inset-right)') || '0') : 0,
  };

  // Responsive grid columns helper
  const getGridCols = (sm = 1, md = 2, lg = 3, xl = 4) => {
    if (isMobile) return sm;
    if (isTablet) return md;
    if (isDesktop && !isLargeScreen) return lg;
    return xl;
  };

  // Responsive spacing helper
  const getSpacing = (sm = 'p-4', md = 'p-6', lg = 'p-8') => {
    if (isMobile) return sm;
    if (isTablet) return md;
    return lg;
  };

  // Container width helper
  const getContainerClass = () => {
    return 'container mx-auto px-4 sm:px-6 lg:px-8';
  };

  // Touch-friendly sizing
  const getTouchSize = (base = 'h-10', touch = 'h-12') => {
    return isTouchDevice ? touch : base;
  };

  return {
    windowSize,
    breakpoint,
    isMobile,
    isTablet,
    isDesktop,
    isLargeScreen,
    isTouchDevice,
    isLandscape,
    isPortrait,
    safeAreaInsets,
    breakpoints,
    // Helper functions
    getGridCols,
    getSpacing,
    getContainerClass,
    getTouchSize,
    // Utility functions
    above: (bp) => windowSize.width >= breakpoints[bp],
    below: (bp) => windowSize.width < breakpoints[bp],
    between: (min, max) => windowSize.width >= breakpoints[min] && windowSize.width < breakpoints[max],
  };
};

/**
 * Hook for managing responsive component states
 */
export const useResponsiveState = (mobileState, desktopState) => {
  const { isMobile } = useResponsive();
  return isMobile ? mobileState : desktopState;
};

/**
 * Hook for responsive component visibility
 */
export const useResponsiveVisibility = () => {
  const { isMobile, isTablet, isDesktop } = useResponsive();

  return {
    showOnMobile: isMobile,
    showOnTablet: isTablet,
    showOnDesktop: isDesktop,
    hideOnMobile: !isMobile,
    hideOnTablet: !isTablet,
    hideOnDesktop: !isDesktop,
  };
};

export default useResponsive;