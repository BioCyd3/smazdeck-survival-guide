import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ResponsiveContainer, ResponsiveGrid, ResponsiveFlex, TouchArea } from './ResponsiveContainer';

// Mock the useResponsive hook
vi.mock('../../hooks/useResponsive', () => ({
  useResponsive: () => ({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isTouchDevice: false,
    getContainerClass: () => 'container mx-auto px-4 sm:px-6 lg:px-8',
    getSpacing: (sm, md, lg) => lg,
    getGridCols: (sm, md, lg, xl) => lg,
  }),
}));

describe('ResponsiveContainer', () => {
  it('should render children correctly', () => {
    render(
      <ResponsiveContainer>
        <div>Test content</div>
      </ResponsiveContainer>
    );
    
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('should apply correct size classes', () => {
    const { container } = render(
      <ResponsiveContainer size="lg" data-testid="container">
        <div>Test content</div>
      </ResponsiveContainer>
    );
    
    const element = container.firstChild;
    expect(element).toHaveClass('max-w-lg');
  });

  it('should apply center class by default', () => {
    const { container } = render(
      <ResponsiveContainer data-testid="container">
        <div>Test content</div>
      </ResponsiveContainer>
    );
    
    const element = container.firstChild;
    expect(element).toHaveClass('mx-auto');
  });

  it('should not apply center class when center is false', () => {
    const { container } = render(
      <ResponsiveContainer center={false} data-testid="container">
        <div>Test content</div>
      </ResponsiveContainer>
    );
    
    const element = container.firstChild;
    expect(element).not.toHaveClass('mx-auto');
  });

  it('should apply custom className', () => {
    const { container } = render(
      <ResponsiveContainer className="custom-class">
        <div>Test content</div>
      </ResponsiveContainer>
    );
    
    const element = container.firstChild;
    expect(element).toHaveClass('custom-class');
  });
});

describe('ResponsiveGrid', () => {
  it('should render as grid with correct classes', () => {
    const { container } = render(
      <ResponsiveGrid>
        <div>Item 1</div>
        <div>Item 2</div>
      </ResponsiveGrid>
    );
    
    const element = container.firstChild;
    expect(element).toHaveClass('grid');
    expect(element).toHaveClass('grid-cols-3'); // Based on mocked getGridCols
  });

  it('should apply gap classes correctly', () => {
    const { container } = render(
      <ResponsiveGrid gap="lg">
        <div>Item 1</div>
        <div>Item 2</div>
      </ResponsiveGrid>
    );
    
    const element = container.firstChild;
    expect(element).toHaveClass('gap-4');
  });
});

describe('ResponsiveFlex', () => {
  it('should render as flex container', () => {
    const { container } = render(
      <ResponsiveFlex>
        <div>Item 1</div>
        <div>Item 2</div>
      </ResponsiveFlex>
    );
    
    const element = container.firstChild;
    expect(element).toHaveClass('flex');
  });

  it('should apply direction classes correctly', () => {
    const { container } = render(
      <ResponsiveFlex direction="col">
        <div>Item 1</div>
        <div>Item 2</div>
      </ResponsiveFlex>
    );
    
    const element = container.firstChild;
    expect(element).toHaveClass('flex-col');
  });

  it('should apply alignment classes correctly', () => {
    const { container } = render(
      <ResponsiveFlex align="center" justify="between">
        <div>Item 1</div>
        <div>Item 2</div>
      </ResponsiveFlex>
    );
    
    const element = container.firstChild;
    expect(element).toHaveClass('items-center');
    expect(element).toHaveClass('justify-between');
  });

  it('should apply wrap class by default', () => {
    const { container } = render(
      <ResponsiveFlex>
        <div>Item 1</div>
        <div>Item 2</div>
      </ResponsiveFlex>
    );
    
    const element = container.firstChild;
    expect(element).toHaveClass('flex-wrap');
  });

  it('should not apply wrap class when wrap is false', () => {
    const { container } = render(
      <ResponsiveFlex wrap={false}>
        <div>Item 1</div>
        <div>Item 2</div>
      </ResponsiveFlex>
    );
    
    const element = container.firstChild;
    expect(element).not.toHaveClass('flex-wrap');
  });
});

describe('TouchArea', () => {
  it('should render children correctly', () => {
    render(
      <TouchArea>
        <button>Touch me</button>
      </TouchArea>
    );
    
    expect(screen.getByText('Touch me')).toBeInTheDocument();
  });

  it('should apply flex and center classes', () => {
    const { container } = render(
      <TouchArea>
        <button>Touch me</button>
      </TouchArea>
    );
    
    const element = container.firstChild;
    expect(element).toHaveClass('flex');
    expect(element).toHaveClass('items-center');
    expect(element).toHaveClass('justify-center');
  });

  it('should apply size classes correctly', () => {
    const { container } = render(
      <TouchArea size="lg">
        <button>Touch me</button>
      </TouchArea>
    );
    
    const element = container.firstChild;
    expect(element).toHaveClass('min-h-[40px]'); // Based on mocked non-touch device
    expect(element).toHaveClass('min-w-[40px]');
  });
});