import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useFontLoading, useFontSizePreference } from './useFontLoading';

// Mock the font loading utilities
vi.mock('../lib/font-loading', () => ({
  initializeFontLoading: vi.fn(),
  createFontLoadingObserver: vi.fn()
}));

import { initializeFontLoading, createFontLoadingObserver } from '../lib/font-loading';

describe('useFontLoading Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('initializes with loading state', () => {
    initializeFontLoading.mockResolvedValue(['Inter', 'Fira Code']);
    
    const { result } = renderHook(() => useFontLoading());
    
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isLoaded).toBe(false);
    expect(result.current.hasError).toBe(false);
    expect(result.current.loadedFonts).toEqual([]);
  });

  it('updates state when fonts are loaded successfully', async () => {
    const loadedFonts = ['Inter', 'Fira Code'];
    initializeFontLoading.mockResolvedValue(loadedFonts);
    
    const { result } = renderHook(() => useFontLoading());
    
    // Wait for the async operation to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isLoaded).toBe(true);
    expect(result.current.hasError).toBe(false);
    expect(result.current.loadedFonts).toEqual(loadedFonts);
  });

  it('updates state when font loading fails', async () => {
    const error = new Error('Font loading failed');
    initializeFontLoading.mockRejectedValue(error);
    
    const { result } = renderHook(() => useFontLoading());
    
    // Wait for the async operation to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isLoaded).toBe(false);
    expect(result.current.hasError).toBe(true);
    expect(result.current.error).toBe(error);
  });

  it('calls onFontsLoaded callback when fonts load successfully', async () => {
    const loadedFonts = ['Inter'];
    const onFontsLoaded = vi.fn();
    initializeFontLoading.mockResolvedValue(loadedFonts);
    
    renderHook(() => useFontLoading({ onFontsLoaded }));
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(onFontsLoaded).toHaveBeenCalledWith(loadedFonts);
  });

  it('calls onFontsError callback when font loading fails', async () => {
    const error = new Error('Font loading failed');
    const onFontsError = vi.fn();
    initializeFontLoading.mockRejectedValue(error);
    
    renderHook(() => useFontLoading({ onFontsError }));
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(onFontsError).toHaveBeenCalledWith(error);
  });

  it('provides utility functions', async () => {
    const loadedFonts = ['Inter', 'Fira Code'];
    initializeFontLoading.mockResolvedValue(loadedFonts);
    
    const { result } = renderHook(() => useFontLoading());
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(result.current.isFontLoaded('Inter')).toBe(true);
    expect(result.current.isFontLoaded('NonExistent')).toBe(false);
    expect(result.current.getFontLoadingClass()).toBe('fonts-loaded');
  });

  it('does not auto-initialize when autoInitialize is false', () => {
    renderHook(() => useFontLoading({ autoInitialize: false }));
    
    expect(initializeFontLoading).not.toHaveBeenCalled();
  });
});

describe('useFontSizePreference Hook', () => {
  beforeEach(() => {
    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn(() => 'base'),
        setItem: vi.fn()
      },
      writable: true
    });
    
    // Mock document.documentElement
    Object.defineProperty(document, 'documentElement', {
      value: {
        setAttribute: vi.fn()
      },
      writable: true
    });
    
    // Mock window.dispatchEvent
    Object.defineProperty(window, 'dispatchEvent', {
      value: vi.fn(),
      writable: true
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('initializes with stored font size preference', () => {
    window.localStorage.getItem.mockReturnValue('lg');
    
    const { result } = renderHook(() => useFontSizePreference());
    
    expect(result.current.fontSize).toBe('lg');
    expect(result.current.isLarge).toBe(true);
    expect(result.current.isBase).toBe(false);
  });

  it('updates font size and persists to localStorage', () => {
    const { result } = renderHook(() => useFontSizePreference());
    
    act(() => {
      result.current.setFontSize('xl');
    });
    
    expect(result.current.fontSize).toBe('xl');
    expect(window.localStorage.setItem).toHaveBeenCalledWith('font-scale', 'xl');
    expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-font-scale', 'xl');
    expect(window.dispatchEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'fontSizeChanged',
        detail: { fontSize: 'xl' }
      })
    );
  });

  it('rejects invalid font sizes', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const { result } = renderHook(() => useFontSizePreference());
    
    act(() => {
      result.current.setFontSize('invalid');
    });
    
    expect(result.current.fontSize).toBe('base'); // Should remain unchanged
    expect(consoleSpy).toHaveBeenCalledWith('Invalid font size: invalid');
    
    consoleSpy.mockRestore();
  });

  it('provides correct boolean flags for font sizes', () => {
    // Test with different initial values
    window.localStorage.getItem.mockReturnValue('sm');
    const { result: smallResult } = renderHook(() => useFontSizePreference());
    expect(smallResult.current.isSmall).toBe(true);
    expect(smallResult.current.isBase).toBe(false);
    expect(smallResult.current.isLarge).toBe(false);
    
    // Test base size
    const { result: baseResult } = renderHook(() => useFontSizePreference());
    act(() => {
      baseResult.current.setFontSize('base');
    });
    expect(baseResult.current.isSmall).toBe(false);
    expect(baseResult.current.isBase).toBe(true);
    expect(baseResult.current.isLarge).toBe(false);
    
    // Test large size
    const { result: largeResult } = renderHook(() => useFontSizePreference());
    act(() => {
      largeResult.current.setFontSize('2xl');
    });
    expect(largeResult.current.isSmall).toBe(false);
    expect(largeResult.current.isBase).toBe(false);
    expect(largeResult.current.isLarge).toBe(true);
  });

  it('sets initial font scale attribute on mount', () => {
    renderHook(() => useFontSizePreference());
    
    expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-font-scale', 'base');
  });
});