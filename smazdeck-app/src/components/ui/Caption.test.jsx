import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Caption from './Caption';

describe('Caption Component', () => {
  it('renders with default props', () => {
    render(<Caption>Test caption</Caption>);
    const caption = screen.getByText('Test caption');
    expect(caption).toBeInTheDocument();
    expect(caption.tagName).toBe('SPAN');
  });

  it('renders with different HTML elements', () => {
    const { rerender } = render(<Caption as="p">Paragraph caption</Caption>);
    let caption = screen.getByText('Paragraph caption');
    expect(caption.tagName).toBe('P');

    rerender(<Caption as="figcaption">Figure caption</Caption>);
    caption = screen.getByText('Figure caption');
    expect(caption.tagName).toBe('FIGCAPTION');

    rerender(<Caption as="small">Small caption</Caption>);
    caption = screen.getByText('Small caption');
    expect(caption.tagName).toBe('SMALL');
  });

  it('applies correct size classes with optimized line heights', () => {
    const { rerender } = render(<Caption size="xs">Extra small caption</Caption>);
    let caption = screen.getByText('Extra small caption');
    expect(caption).toHaveClass('text-xs', 'leading-tight');

    rerender(<Caption size="sm">Small caption</Caption>);
    caption = screen.getByText('Small caption');
    expect(caption).toHaveClass('text-sm', 'leading-snug');

    rerender(<Caption size="base">Base caption</Caption>);
    caption = screen.getByText('Base caption');
    expect(caption).toHaveClass('text-base', 'leading-normal');
  });

  it('applies correct weight classes', () => {
    const { rerender } = render(<Caption weight="light">Light caption</Caption>);
    let caption = screen.getByText('Light caption');
    expect(caption).toHaveClass('font-light');

    rerender(<Caption weight="medium">Medium caption</Caption>);
    caption = screen.getByText('Medium caption');
    expect(caption).toHaveClass('font-medium');

    rerender(<Caption weight="semibold">Semibold caption</Caption>);
    caption = screen.getByText('Semibold caption');
    expect(caption).toHaveClass('font-semibold');
  });

  it('applies correct color classes optimized for secondary text', () => {
    const { rerender } = render(<Caption color="muted">Muted caption</Caption>);
    let caption = screen.getByText('Muted caption');
    expect(caption).toHaveClass('text-slate-400');

    rerender(<Caption color="secondary">Secondary caption</Caption>);
    caption = screen.getByText('Secondary caption');
    expect(caption).toHaveClass('text-slate-300');

    rerender(<Caption color="accent">Accent caption</Caption>);
    caption = screen.getByText('Accent caption');
    expect(caption).toHaveClass('text-amber-400');

    rerender(<Caption color="error">Error caption</Caption>);
    caption = screen.getByText('Error caption');
    expect(caption).toHaveClass('text-red-400');
  });

  it('applies base typography classes', () => {
    render(<Caption>Test</Caption>);
    const caption = screen.getByText('Test');
    expect(caption).toHaveClass('font-sans');
  });

  it('accepts custom className', () => {
    render(<Caption className="custom-caption-class">Test</Caption>);
    const caption = screen.getByText('Test');
    expect(caption).toHaveClass('custom-caption-class');
  });

  it('passes through additional props', () => {
    render(<Caption data-testid="custom-caption" id="caption-id">Test</Caption>);
    const caption = screen.getByTestId('custom-caption');
    expect(caption).toHaveAttribute('id', 'caption-id');
  });

  it('combines multiple props correctly', () => {
    render(
      <Caption 
        as="small" 
        size="xs" 
        weight="medium" 
        color="accent"
      >
        Combined caption
      </Caption>
    );
    const caption = screen.getByText('Combined caption');
    expect(caption.tagName).toBe('SMALL');
    expect(caption).toHaveClass(
      'font-sans',
      'text-xs',
      'leading-tight',
      'font-medium',
      'text-amber-400'
    );
  });

  it('handles semantic color variants correctly', () => {
    const colors = ['success', 'warning', 'info'];
    const expectedClasses = ['text-green-400', 'text-yellow-400', 'text-blue-400'];
    
    colors.forEach((color, index) => {
      const { unmount } = render(<Caption color={color}>Test {color}</Caption>);
      const caption = screen.getByText(`Test ${color}`);
      expect(caption).toHaveClass(expectedClasses[index]);
      unmount();
    });
  });

  it('uses default muted color for better readability', () => {
    render(<Caption>Default caption</Caption>);
    const caption = screen.getByText('Default caption');
    expect(caption).toHaveClass('text-slate-400');
  });

  it('uses appropriate default size for captions', () => {
    render(<Caption>Default size caption</Caption>);
    const caption = screen.getByText('Default size caption');
    expect(caption).toHaveClass('text-sm', 'leading-snug');
  });
});