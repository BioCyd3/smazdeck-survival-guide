/**
 * Font loading utilities for better performance and user experience
 */

/**
 * Check if a font is loaded and available
 * @param {string} fontFamily - The font family name to check
 * @param {string} fallbackFont - Fallback font to compare against
 * @returns {boolean} - Whether the font is loaded
 */
export function isFontLoaded(fontFamily, fallbackFont = 'monospace') {
  if (!document.fonts || !document.fonts.check) {
    return false;
  }
  
  try {
    return document.fonts.check(`12px "${fontFamily}"`, fallbackFont);
  } catch (error) {
    console.warn(`Font check failed for ${fontFamily}:`, error);
    return false;
  }
}

/**
 * Load fonts with timeout and fallback handling
 * @param {Array<string>} fontFamilies - Array of font family names to load
 * @param {number} timeout - Timeout in milliseconds (default: 3000)
 * @returns {Promise<Array<string>>} - Promise resolving to loaded font names
 */
export async function loadFonts(fontFamilies, timeout = 3000) {
  if (!document.fonts || !document.fonts.load) {
    console.warn('Font Loading API not supported');
    return [];
  }

  const loadPromises = fontFamilies.map(async (fontFamily) => {
    try {
      // Load different weights and styles
      const weights = ['400', '500', '600', '700'];
      const loadTasks = weights.map(weight => 
        Promise.race([
          document.fonts.load(`${weight} 12px "${fontFamily}"`),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Font load timeout')), timeout)
          )
        ])
      );
      
      const results = await Promise.allSettled(loadTasks);
      
      // Check if any font loading succeeded
      const hasSuccess = results.some(result => result.status === 'fulfilled');
      if (!hasSuccess) {
        throw new Error('All font weights failed to load');
      }
      
      return fontFamily;
    } catch (error) {
      console.warn(`Failed to load font ${fontFamily}:`, error);
      return null;
    }
  });

  const results = await Promise.allSettled(loadPromises);
  return results
    .filter(result => result.status === 'fulfilled' && result.value)
    .map(result => result.value);
}

/**
 * Apply font loading classes to document body
 * @param {Array<string>} loadedFonts - Array of successfully loaded font names
 */
export function applyFontLoadingClasses(loadedFonts) {
  const body = document.body;
  
  // Remove loading class
  body.classList.remove('fonts-loading');
  
  // Add loaded class
  body.classList.add('fonts-loaded');
  
  // Add specific font classes
  loadedFonts.forEach(fontFamily => {
    const className = `font-${fontFamily.toLowerCase().replace(/\s+/g, '-')}-loaded`;
    body.classList.add(className);
  });
}

/**
 * Initialize font loading with performance monitoring
 */
export async function initializeFontLoading() {
  const startTime = performance.now();
  
  // Add loading class
  document.body.classList.add('fonts-loading');
  
  // Define fonts to load
  const fontsToLoad = ['Inter', 'Exo 2', 'Fira Code'];
  
  try {
    // Load fonts
    const loadedFonts = await loadFonts(fontsToLoad);
    
    // Apply classes
    applyFontLoadingClasses(loadedFonts);
    
    // Log performance
    const loadTime = performance.now() - startTime;
    console.log(`Fonts loaded in ${loadTime.toFixed(2)}ms:`, loadedFonts);
    
    return loadedFonts;
  } catch (error) {
    console.error('Font loading failed:', error);
    document.body.classList.remove('fonts-loading');
    document.body.classList.add('fonts-error');
    return [];
  }
}

/**
 * Create a font loading observer for better UX
 * @param {Function} onFontsLoaded - Callback when fonts are loaded
 * @param {Function} onFontsError - Callback when font loading fails
 */
export function createFontLoadingObserver(onFontsLoaded, onFontsError) {
  if (!document.fonts || !document.fonts.ready) {
    console.warn('Font Loading API not supported');
    return null;
  }

  document.fonts.ready.then(() => {
    const loadedFonts = [];
    const fontsToCheck = ['Inter', 'Exo 2', 'Fira Code'];
    
    fontsToCheck.forEach(fontFamily => {
      if (isFontLoaded(fontFamily)) {
        loadedFonts.push(fontFamily);
      }
    });
    
    if (loadedFonts.length > 0) {
      onFontsLoaded?.(loadedFonts);
    } else {
      onFontsError?.(new Error('No fonts loaded successfully'));
    }
  }).catch(error => {
    onFontsError?.(error);
  });
}

/**
 * Get optimal font size based on user preferences and accessibility settings
 * @param {string} baseSize - Base font size (e.g., '16px', '1rem')
 * @param {Object} options - Options for font size calculation
 * @returns {string} - Calculated font size
 */
export function getOptimalFontSize(baseSize = '1rem', options = {}) {
  const {
    respectUserPreferences = true,
    minSize = '0.75rem',
    maxSize = '2rem',
    scaleFactors = {
      sm: 0.875,
      base: 1,
      lg: 1.125,
      xl: 1.25,
      '2xl': 1.5
    }
  } = options;

  let calculatedSize = baseSize;

  // Check for user font size preferences
  if (respectUserPreferences && window.getComputedStyle) {
    const rootFontSize = parseFloat(
      window.getComputedStyle(document.documentElement).fontSize
    );
    
    // If user has scaled their browser font size, respect it
    if (rootFontSize !== 16) {
      const scaleFactor = rootFontSize / 16;
      calculatedSize = `${parseFloat(baseSize) * scaleFactor}rem`;
    }
  }

  // Apply accessibility scaling if needed
  const preferredScale = localStorage.getItem('font-scale') || 'base';
  if (scaleFactors[preferredScale]) {
    const numericSize = parseFloat(calculatedSize);
    calculatedSize = `${numericSize * scaleFactors[preferredScale]}rem`;
  }

  return calculatedSize;
}