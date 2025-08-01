import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useResponsive } from './useResponsive';

// Mock window object
const mockWindow = (width = 1024, height = 768) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: height,
  });
};

describe('useResponsive', () => {
  let addEventListenerSpy;
  let removeEventListenerSpy;

  beforeEach(() => {
    addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should initialize with correct window size', () => {
    mockWindow(1024, 768);
    
    const { result } = renderHook(() => useResponsive());
    
    expect(result.current.windowSize).toEqual({
      width: 1024,
      height: 768,
    });
  });

  it('should detect mobile breakpoint correctly', () => {
    mockWindow(640, 800);
    
    const { result } = renderHook(() => useResponsive());
    
    expect(result.current.isMobile).toBe(true);
    expect(result.current.isTablet).toBe(false);
    expect(result.current.isDesktop).toBe(false);
    expect(result.current.breakpoint).toBe('sm');
  });

  it('should detect tablet breakpoint correctly', () => {
    mockWindow(800, 600);
    
    const { result } = renderHook(() => useResponsive());
    
    expect(result.current.isMobile).toBe(false);
    expect(result.current.isTablet).toBe(true);
    expect(result.current.isDesktop).toBe(false);
    expect(result.current.breakpoint).toBe('md');
  });

  it('should detect desktop breakpoint correctly', () => {
    mockWindow(1200, 800);
    
    const { result } = renderHook(() => useResponsive());
    
    expect(result.current.isMobile).toBe(false);
    expect(result.current.isTablet).toBe(false);
    expect(result.current.isDesktop).toBe(true);
    expect(result.current.breakpoint).toBe('lg');
  });

  it('should detect orientation correctly', () => {
    mockWindow(800, 600);
    
    const { result } = renderHook(() => useResponsive());
    
    expect(result.current.isLandscape).toBe(true);
    expect(result.current.isPortrait).toBe(false);
  });

  it('should detect portrait orientation correctly', () => {
    mockWindow(600, 800);
    
    const { result } = renderHook(() => useResponsive());
    
    expect(result.current.isLandscape).toBe(false);
    expect(result.current.isPortrait).toBe(true);
  });

  it('should provide correct grid columns helper', () => {
    mockWindow(640, 800); // Mobile
    
    const { result } = renderHook(() => useResponsive());
    
    expect(result.current.getGridCols(1, 2, 3, 4)).toBe(1);
  });

  it('should provide correct grid columns for desktop', () => {
    mockWindow(1200, 800); // Desktop
    
    const { result } = renderHook(() => useResponsive());
    
    expect(result.current.getGridCols(1, 2, 3, 4)).toBe(3);
  });

  it('should provide correct spacing helper for mobile', () => {
    mockWindow(640, 800); // Mobile
    
    const { result } = renderHook(() => useResponsive());
    
    expect(result.current.getSpacing('p-2', 'p-4', 'p-6')).toBe('p-2');
  });

  it('should provide correct spacing helper for desktop', () => {
    mockWindow(1200, 800); // Desktop
    
    const { result } = renderHook(() => useResponsive());
    
    expect(result.current.getSpacing('p-2', 'p-4', 'p-6')).toBe('p-6');
  });

  it('should provide container class helper', () => {
    const { result } = renderHook(() => useResponsive());
    
    expect(result.current.getContainerClass()).toBe('container mx-auto px-4 sm:px-6 lg:px-8');
  });

  it('should provide touch size helper', () => {
    // Mock non-touch device
    delete window.ontouchstart;
    Object.defineProperty(navigator, 'maxTouchPoints', {
      writable: true,
      configurable: true,
      value: 0,
    });
    
    const { result } = renderHook(() => useResponsive());
    
    // Should return base size for non-touch device
    expect(result.current.getTouchSize('h-8', 'h-12')).toBe('h-8');
  });

  it('should provide breakpoint comparison helpers', () => {
    mockWindow(1024, 768);
    
    const { result } = renderHook(() => useResponsive());
    
    expect(result.current.above('md')).toBe(true);
    expect(result.current.below('xl')).toBe(true);
    expect(result.current.between('md', 'xl')).toBe(true);
  });

  it('should add resize event listener on mount', () => {
    renderHook(() => useResponsive());
    
    expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
  });

  it('should remove resize event listener on unmount', () => {
    const { unmount } = renderHook(() => useResponsive());
    
    unmount();
    
    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
  });

  it('should update state when window is resized', () => {
    mockWindow(1024, 768);
    
    const { result } = renderHook(() => useResponsive());
    
    expect(result.current.breakpoint).toBe('lg');
    
    // Simulate window resize
    act(() => {
      mockWindow(640, 800);
      window.dispatchEvent(new Event('resize'));
    });
    
    expect(result.current.breakpoint).toBe('sm');
    expect(result.current.isMobile).toBe(true);
  });
});