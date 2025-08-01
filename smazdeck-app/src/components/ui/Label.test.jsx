import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Label from './Label';

describe('Label Component', () => {
  it('renders with default props', () => {
    render(<Label>Test label</Label>);
    const label = screen.getByText('Test label');
    expect(label).toBeInTheDocument();
    expect(label.tagName).toBe('LABEL');
  });

  it('renders with different HTML elements', () => {
    const { rerender } = render(<Label as="span">Span label</Label>);
    let label = screen.getByText('Span label');
    expect(label.tagName).toBe('SPAN');

    rerender(<Label as="legend">Legend label</Label>);
    label = screen.getByText('Legend label');
    expect(label.tagName).toBe('LEGEND');

    rerender(<Label as="div">Div label</Label>);
    label = screen.getByText('Div label');
    expect(label.tagName).toBe('DIV');
  });

  it('applies correct size classes', () => {
    const { rerender } = render(<Label size="xs">Extra small label</Label>);
    let label = screen.getByText('Extra small label');
    expect(label).toHaveClass('text-xs');

    rerender(<Label size="base">Base label</Label>);
    label = screen.getByText('Base label');
    expect(label).toHaveClass('text-base');

    rerender(<Label size="lg">Large label</Label>);
    label = screen.getByText('Large label');
    expect(label).toHaveClass('text-lg');
  });

  it('applies correct weight classes', () => {
    const { rerender } = render(<Label weight="normal">Normal label</Label>);
    let label = screen.getByText('Normal label');
    expect(label).toHaveClass('font-normal');

    rerender(<Label weight="semibold">Semibold label</Label>);
    label = screen.getByText('Semibold label');
    expect(label).toHaveClass('font-semibold');

    rerender(<Label weight="bold">Bold label</Label>);
    label = screen.getByText('Bold label');
    expect(label).toHaveClass('font-bold');
  });

  it('applies correct color classes when enabled', () => {
    const { rerender } = render(<Label color="primary">Primary label</Label>);
    let label = screen.getByText('Primary label');
    expect(label).toHaveClass('text-slate-200');

    rerender(<Label color="secondary">Secondary label</Label>);
    label = screen.getByText('Secondary label');
    expect(label).toHaveClass('text-slate-300');

    rerender(<Label color="accent">Accent label</Label>);
    label = screen.getByText('Accent label');
    expect(label).toHaveClass('text-amber-400');
  });

  it('applies disabled color classes when disabled', () => {
    const { rerender } = render(<Label color="primary" disabled>Disabled primary</Label>);
    let label = screen.getByText('Disabled primary');
    expect(label).toHaveClass('text-slate-500');

    rerender(<Label color="accent" disabled>Disabled accent</Label>);
    label = screen.getByText('Disabled accent');
    expect(label).toHaveClass('text-amber-600');
  });

  it('applies correct cursor classes based on disabled state', () => {
    const { rerender } = render(<Label>Enabled label</Label>);
    let label = screen.getByText('Enabled label');
    expect(label).toHaveClass('cursor-pointer');

    rerender(<Label disabled>Disabled label</Label>);
    label = screen.getByText('Disabled label');
    expect(label).toHaveClass('cursor-not-allowed');
  });

  it('shows required asterisk when required prop is true', () => {
    render(<Label required>Required field</Label>);
    const label = screen.getByText('Required field');
    const asterisk = label.querySelector('span[aria-label="required"]');
    expect(asterisk).toBeInTheDocument();
    expect(asterisk).toHaveTextContent('*');
    expect(asterisk).toHaveClass('text-red-400', 'ml-1');
  });

  it('does not show asterisk when required prop is false', () => {
    render(<Label required={false}>Optional field</Label>);
    const label = screen.getByText('Optional field');
    const asterisk = label.querySelector('span[aria-label="required"]');
    expect(asterisk).not.toBeInTheDocument();
  });

  it('applies base typography classes', () => {
    render(<Label>Test</Label>);
    const label = screen.getByText('Test');
    expect(label).toHaveClass('font-sans', 'block');
  });

  it('accepts custom className', () => {
    render(<Label className="custom-label-class">Test</Label>);
    const label = screen.getByText('Test');
    expect(label).toHaveClass('custom-label-class');
  });

  it('passes through additional props', () => {
    render(<Label data-testid="custom-label" htmlFor="input-id">Test</Label>);
    const label = screen.getByTestId('custom-label');
    expect(label).toHaveAttribute('for', 'input-id');
  });

  it('combines multiple props correctly', () => {
    render(
      <Label 
        as="legend" 
        size="lg" 
        weight="bold" 
        color="accent" 
        required 
        disabled
      >
        Combined label
      </Label>
    );
    const label = screen.getByText('Combined label');
    expect(label.tagName).toBe('LEGEND');
    expect(label).toHaveClass(
      'font-sans',
      'block',
      'text-lg',
      'font-bold',
      'text-amber-600', // disabled accent color
      'cursor-not-allowed'
    );
    
    const asterisk = label.querySelector('span[aria-label="required"]');
    expect(asterisk).toBeInTheDocument();
  });

  it('uses medium weight by default for better readability', () => {
    render(<Label>Default weight</Label>);
    const label = screen.getByText('Default weight');
    expect(label).toHaveClass('font-medium');
  });

  it('uses small size by default for form labels', () => {
    render(<Label>Default size</Label>);
    const label = screen.getByText('Default size');
    expect(label).toHaveClass('text-sm');
  });

  it('maintains accessibility with proper aria attributes', () => {
    render(<Label required>Accessible label</Label>);
    const asterisk = screen.getByLabelText('required');
    expect(asterisk).toBeInTheDocument();
    expect(asterisk).toHaveAttribute('aria-label', 'required');
  });
});