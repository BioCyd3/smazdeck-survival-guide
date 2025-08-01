import { useState, useEffect } from 'react';
import { initializeFontLoading, createFontLoadingObserver } from '../lib/font-loading';

/**
 * React hook for managing font loading state
 * @param {Object} options - Configuration options
 * @returns {Object} - Font loading state and utilities
 */
export function useFontLoading(options = {}) {
  const {
    autoInitialize = true,
    timeout = 3000,
    onFontsLoaded,
    onFontsError
  } = options;

  const [fontLoadingState, setFontLoadingState] = useState({
    isLoading: true,
    isLoaded: false,
    hasError: false,
    loadedFonts: [],
    error: null
  });

  useEffect(() => {
    if (!autoInitialize) return;

    let mounted = true;

    const handleFontsLoaded = (loadedFonts) => {
      if (!mounted) return;
      
      setFontLoadingState({
        isLoading: false,
        isLoaded: true,
        hasError: false,
        loadedFonts,
        error: null
      });
      
      onFontsLoaded?.(loadedFonts);
    };

    const handleFontsError = (error) => {
      if (!mounted) return;
      
      setFontLoadingState({
        isLoading: false,
        isLoaded: false,
        hasError: true,
        loadedFonts: [],
        error
      });
      
      onFontsError?.(error);
    };

    // Initialize font loading
    const initializeFonts = async () => {
      try {
        const loadedFonts = await initializeFontLoading();
        handleFontsLoaded(loadedFonts);
      } catch (error) {
        handleFontsError(error);
      }
    };

    // Create font loading observer as fallback
    createFontLoadingObserver(handleFontsLoaded, handleFontsError);

    // Start font loading
    initializeFonts();

    return () => {
      mounted = false;
    };
  }, [autoInitialize, onFontsLoaded, onFontsError]);

  return {
    ...fontLoadingState,
    // Utility functions
    isFontLoaded: (fontFamily) => fontLoadingState.loadedFonts.includes(fontFamily),
    getFontLoadingClass: () => {
      if (fontLoadingState.isLoading) return 'fonts-loading';
      if (fontLoadingState.hasError) return 'fonts-error';
      if (fontLoadingState.isLoaded) return 'fonts-loaded';
      return '';
    }
  };
}

/**
 * Hook for managing user font size preferences
 * @returns {Object} - Font size state and controls
 */
export function useFontSizePreference() {
  const [fontSize, setFontSize] = useState(() => {
    return localStorage.getItem('font-scale') || 'base';
  });

  const updateFontSize = (newSize) => {
    const validSizes = ['sm', 'base', 'lg', 'xl', '2xl'];
    if (!validSizes.includes(newSize)) {
      console.warn(`Invalid font size: ${newSize}`);
      return;
    }

    setFontSize(newSize);
    localStorage.setItem('font-scale', newSize);
    
    // Apply to document root for CSS custom properties
    document.documentElement.setAttribute('data-font-scale', newSize);
    
    // Dispatch custom event for other components to listen
    window.dispatchEvent(new CustomEvent('fontSizeChanged', {
      detail: { fontSize: newSize }
    }));
  };

  useEffect(() => {
    // Set initial font size on mount
    document.documentElement.setAttribute('data-font-scale', fontSize);
  }, [fontSize]);

  return {
    fontSize,
    setFontSize: updateFontSize,
    isSmall: fontSize === 'sm',
    isBase: fontSize === 'base',
    isLarge: fontSize === 'lg' || fontSize === 'xl' || fontSize === '2xl'
  };
}