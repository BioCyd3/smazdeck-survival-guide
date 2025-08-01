import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Heading from './Heading';

describe('Heading Component', () => {
  it('renders with default props', () => {
    render(<Heading>Test Heading</Heading>);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Test Heading');
    expect(heading.tagName).toBe('H1');
  });

  it('renders with correct semantic level', () => {
    render(<Heading level={3}>Level 3 Heading</Heading>);
    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H3');
  });

  it('applies correct variant classes', () => {
    const { rerender } = render(<Heading variant="display">Display Heading</Heading>);
    let heading = screen.getByRole('heading');
    expect(heading).toHaveClass('text-5xl', 'md:text-6xl', 'lg:text-7xl');

    rerender(<Heading variant="heading">Regular Heading</Heading>);
    heading = screen.getByRole('heading');
    expect(heading).toHaveClass('text-4xl', 'md:text-5xl', 'lg:text-6xl');

    rerender(<Heading variant="subheading">Subheading</Heading>);
    heading = screen.getByRole('heading');
    expect(heading).toHaveClass('text-3xl', 'md:text-4xl', 'lg:text-5xl', 'font-medium');
  });

  it('applies correct color classes', () => {
    const { rerender } = render(<Heading color="primary">Primary</Heading>);
    let heading = screen.getByRole('heading');
    expect(heading).toHaveClass('text-slate-200');

    rerender(<Heading color="accent">Accent</Heading>);
    heading = screen.getByRole('heading');
    expect(heading).toHaveClass('text-amber-400');

    rerender(<Heading color="gradient">Gradient</Heading>);
    heading = screen.getByRole('heading');
    expect(heading).toHaveClass('gradient-text');
  });

  it('applies base typography classes', () => {
    render(<Heading>Test</Heading>);
    const heading = screen.getByRole('heading');
    expect(heading).toHaveClass('font-display', 'font-semibold', 'tracking-tight');
  });

  it('accepts custom className', () => {
    render(<Heading className="custom-class">Test</Heading>);
    const heading = screen.getByRole('heading');
    expect(heading).toHaveClass('custom-class');
  });

  it('passes through additional props', () => {
    render(<Heading data-testid="custom-heading" id="heading-id">Test</Heading>);
    const heading = screen.getByTestId('custom-heading');
    expect(heading).toHaveAttribute('id', 'heading-id');
  });

  it('renders all heading levels correctly', () => {
    const levels = [1, 2, 3, 4, 5, 6];
    levels.forEach(level => {
      const { unmount } = render(<Heading level={level}>Level {level}</Heading>);
      const heading = screen.getByRole('heading', { level });
      expect(heading.tagName).toBe(`H${level}`);
      unmount();
    });
  });

  it('applies responsive sizing correctly for different variants and levels', () => {
    // Test display variant level 2
    const { rerender } = render(<Heading level={2} variant="display">Display H2</Heading>);
    let heading = screen.getByRole('heading');
    expect(heading).toHaveClass('text-4xl', 'md:text-5xl', 'lg:text-6xl');

    // Test subheading variant level 4
    rerender(<Heading level={4} variant="subheading">Subheading H4</Heading>);
    heading = screen.getByRole('heading');
    expect(heading).toHaveClass('text-lg', 'md:text-xl', 'lg:text-2xl', 'font-medium');
  });

  it('maintains accessibility with proper heading hierarchy', () => {
    render(
      <div>
        <Heading level={1}>Main Title</Heading>
        <Heading level={2}>Section Title</Heading>
        <Heading level={3}>Subsection Title</Heading>
      </div>
    );

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
  });
});