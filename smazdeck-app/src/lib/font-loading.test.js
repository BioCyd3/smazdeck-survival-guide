import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  isFontLoaded,
  loadFonts,
  applyFontLoadingClasses,
  getOptimalFontSize
} from './font-loading';

// Mock document.fonts API
const mockFonts = {
  check: vi.fn(),
  load: vi.fn(),
  ready: Promise.resolve()
};

describe('Font Loading Utilities', () => {
  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();
    
    // Mock document.fonts
    Object.defineProperty(document, 'fonts', {
      value: mockFonts,
      writable: true
    });
    
    // Mock document.body
    Object.defineProperty(document, 'body', {
      value: {
        classList: {
          add: vi.fn(),
          remove: vi.fn(),
          contains: vi.fn()
        }
      },
      writable: true
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('isFontLoaded', () => {
    it('returns true when font is loaded', () => {
      mockFonts.check.mockReturnValue(true);
      
      const result = isFontLoaded('Inter');
      
      expect(result).toBe(true);
      expect(mockFonts.check).toHaveBeenCalledWith('12px "Inter"', 'monospace');
    });

    it('returns false when font is not loaded', () => {
      mockFonts.check.mockReturnValue(false);
      
      const result = isFontLoaded('NonExistentFont');
      
      expect(result).toBe(false);
    });

    it('returns false when document.fonts is not available', () => {
      document.fonts = undefined;
      
      const result = isFontLoaded('Inter');
      
      expect(result).toBe(false);
    });

    it('handles errors gracefully', () => {
      mockFonts.check.mockImplementation(() => {
        throw new Error('Font check failed');
      });
      
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      const result = isFontLoaded('Inter');
      
      expect(result).toBe(false);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Font check failed for Inter:',
        expect.any(Error)
      );
      
      consoleSpy.mockRestore();
    });
  });

  describe('loadFonts', () => {
    it('loads fonts successfully', async () => {
      mockFonts.load.mockResolvedValue();
      
      const result = await loadFonts(['Inter', 'Fira Code']);
      
      expect(result).toEqual(['Inter', 'Fira Code']);
      expect(mockFonts.load).toHaveBeenCalledTimes(8); // 2 fonts × 4 weights
    });

    it('handles font loading failures gracefully', async () => {
      mockFonts.load.mockRejectedValue(new Error('Load failed'));
      
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      const result = await loadFonts(['NonExistentFont']);
      
      expect(result).toEqual([]);
      expect(consoleSpy).toHaveBeenCalled();
      
      consoleSpy.mockRestore();
    });

    it('returns empty array when document.fonts is not available', async () => {
      document.fonts = undefined;
      
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      const result = await loadFonts(['Inter']);
      
      expect(result).toEqual([]);
      expect(consoleSpy).toHaveBeenCalledWith('Font Loading API not supported');
      
      consoleSpy.mockRestore();
    });
  });

  describe('applyFontLoadingClasses', () => {
    it('applies correct classes to document body', () => {
      const loadedFonts = ['Inter', 'Fira Code'];
      
      applyFontLoadingClasses(loadedFonts);
      
      expect(document.body.classList.remove).toHaveBeenCalledWith('fonts-loading');
      expect(document.body.classList.add).toHaveBeenCalledWith('fonts-loaded');
      expect(document.body.classList.add).toHaveBeenCalledWith('font-inter-loaded');
      expect(document.body.classList.add).toHaveBeenCalledWith('font-fira-code-loaded');
    });

    it('handles font names with spaces correctly', () => {
      const loadedFonts = ['Exo 2'];
      
      applyFontLoadingClasses(loadedFonts);
      
      expect(document.body.classList.add).toHaveBeenCalledWith('font-exo-2-loaded');
    });
  });

  describe('getOptimalFontSize', () => {
    beforeEach(() => {
      // Mock window.getComputedStyle
      Object.defineProperty(window, 'getComputedStyle', {
        value: vi.fn(() => ({
          fontSize: '16px'
        })),
        writable: true
      });
      
      // Mock localStorage
      Object.defineProperty(window, 'localStorage', {
        value: {
          getItem: vi.fn(),
          setItem: vi.fn()
        },
        writable: true
      });
    });

    it('returns base size when no scaling is needed', () => {
      window.localStorage.getItem.mockReturnValue('base');
      
      const result = getOptimalFontSize('1rem');
      
      expect(result).toBe('1rem');
    });

    it('applies user font scale preference', () => {
      window.localStorage.getItem.mockReturnValue('lg');
      
      const result = getOptimalFontSize('1rem');
      
      expect(result).toBe('1.125rem');
    });

    it('respects browser font size scaling', () => {
      window.getComputedStyle.mockReturnValue({ fontSize: '20px' });
      window.localStorage.getItem.mockReturnValue('base');
      
      const result = getOptimalFontSize('1rem');
      
      expect(result).toBe('1.25rem'); // 1 * (20/16) = 1.25
    });

    it('combines browser scaling and user preference', () => {
      window.getComputedStyle.mockReturnValue({ fontSize: '20px' });
      window.localStorage.getItem.mockReturnValue('lg');
      
      const result = getOptimalFontSize('1rem');
      
      expect(result).toBe('1.40625rem'); // 1 * (20/16) * 1.125 = 1.40625
    });

    it('handles missing localStorage gracefully', () => {
      window.localStorage.getItem.mockReturnValue(null);
      
      const result = getOptimalFontSize('1rem');
      
      expect(result).toBe('1rem');
    });
  });
});