import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Text from './Text';

describe('Text Component', () => {
  it('renders with default props', () => {
    render(<Text>Test text content</Text>);
    const text = screen.getByText('Test text content');
    expect(text).toBeInTheDocument();
    expect(text.tagName).toBe('P');
  });

  it('renders with different HTML elements', () => {
    const { rerender } = render(<Text as="span">Span text</Text>);
    let text = screen.getByText('Span text');
    expect(text.tagName).toBe('SPAN');

    rerender(<Text as="div">Div text</Text>);
    text = screen.getByText('Div text');
    expect(text.tagName).toBe('DIV');

    rerender(<Text as="strong">Strong text</Text>);
    text = screen.getByText('Strong text');
    expect(text.tagName).toBe('STRONG');
  });

  it('applies correct size classes', () => {
    const { rerender } = render(<Text size="xs">Extra small</Text>);
    let text = screen.getByText('Extra small');
    expect(text).toHaveClass('text-xs');

    rerender(<Text size="lg">Large text</Text>);
    text = screen.getByText('Large text');
    expect(text).toHaveClass('text-lg');

    rerender(<Text size="2xl">Extra large</Text>);
    text = screen.getByText('Extra large');
    expect(text).toHaveClass('text-2xl');
  });

  it('applies correct weight classes', () => {
    const { rerender } = render(<Text weight="light">Light text</Text>);
    let text = screen.getByText('Light text');
    expect(text).toHaveClass('font-light');

    rerender(<Text weight="bold">Bold text</Text>);
    text = screen.getByText('Bold text');
    expect(text).toHaveClass('font-bold');

    rerender(<Text weight="semibold">Semibold text</Text>);
    text = screen.getByText('Semibold text');
    expect(text).toHaveClass('font-semibold');
  });

  it('applies correct color classes', () => {
    const { rerender } = render(<Text color="primary">Primary text</Text>);
    let text = screen.getByText('Primary text');
    expect(text).toHaveClass('text-slate-200');

    rerender(<Text color="accent">Accent text</Text>);
    text = screen.getByText('Accent text');
    expect(text).toHaveClass('text-amber-400');

    rerender(<Text color="error">Error text</Text>);
    text = screen.getByText('Error text');
    expect(text).toHaveClass('text-red-400');

    rerender(<Text color="success">Success text</Text>);
    text = screen.getByText('Success text');
    expect(text).toHaveClass('text-green-400');
  });

  it('applies correct alignment classes', () => {
    const { rerender } = render(<Text align="center">Centered text</Text>);
    let text = screen.getByText('Centered text');
    expect(text).toHaveClass('text-center');

    rerender(<Text align="right">Right aligned</Text>);
    text = screen.getByText('Right aligned');
    expect(text).toHaveClass('text-right');

    rerender(<Text align="justify">Justified text</Text>);
    text = screen.getByText('Justified text');
    expect(text).toHaveClass('text-justify');
  });

  it('applies correct line height classes', () => {
    const { rerender } = render(<Text leading="tight">Tight leading</Text>);
    let text = screen.getByText('Tight leading');
    expect(text).toHaveClass('leading-tight');

    rerender(<Text leading="relaxed">Relaxed leading</Text>);
    text = screen.getByText('Relaxed leading');
    expect(text).toHaveClass('leading-relaxed');

    rerender(<Text leading="loose">Loose leading</Text>);
    text = screen.getByText('Loose leading');
    expect(text).toHaveClass('leading-loose');
  });

  it('applies base typography classes', () => {
    render(<Text>Test</Text>);
    const text = screen.getByText('Test');
    expect(text).toHaveClass('font-sans');
  });

  it('accepts custom className', () => {
    render(<Text className="custom-text-class">Test</Text>);
    const text = screen.getByText('Test');
    expect(text).toHaveClass('custom-text-class');
  });

  it('passes through additional props', () => {
    render(<Text data-testid="custom-text" id="text-id">Test</Text>);
    const text = screen.getByTestId('custom-text');
    expect(text).toHaveAttribute('id', 'text-id');
  });

  it('combines multiple props correctly', () => {
    render(
      <Text 
        as="span" 
        size="lg" 
        weight="semibold" 
        color="accent" 
        align="center" 
        leading="relaxed"
      >
        Combined props
      </Text>
    );
    const text = screen.getByText('Combined props');
    expect(text.tagName).toBe('SPAN');
    expect(text).toHaveClass(
      'font-sans',
      'text-lg',
      'font-semibold',
      'text-amber-400',
      'text-center',
      'leading-relaxed'
    );
  });

  it('handles semantic color variants correctly', () => {
    const colors = ['warning', 'info', 'muted', 'secondary'];
    const expectedClasses = ['text-yellow-400', 'text-blue-400', 'text-slate-400', 'text-slate-300'];
    
    colors.forEach((color, index) => {
      const { unmount } = render(<Text color={color}>Test {color}</Text>);
      const text = screen.getByText(`Test ${color}`);
      expect(text).toHaveClass(expectedClasses[index]);
      unmount();
    });
  });
});