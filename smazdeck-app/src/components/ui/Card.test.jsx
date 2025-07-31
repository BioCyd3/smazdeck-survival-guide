import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Card from './Card';

describe('Card Component', () => {
  it('renders children correctly', () => {
    render(
      <Card>
        <p>Test content</p>
      </Card>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies default dark theme styling', () => {
    render(
      <Card>
        <p>Test content</p>
      </Card>
    );

    const cardElement = screen.getByText('Test content').parentElement;
    expect(cardElement).toHaveClass('bg-slate-800');
    expect(cardElement).toHaveClass('border-slate-700');
    expect(cardElement).toHaveClass('rounded-lg');
    expect(cardElement).toHaveClass('shadow-lg');
  });

  it('applies custom className when provided', () => {
    render(
      <Card className="custom-class">
        <p>Test content</p>
      </Card>
    );

    const cardElement = screen.getByText('Test content').parentElement;
    expect(cardElement).toHaveClass('custom-class');
    expect(cardElement).toHaveClass('bg-slate-800'); // Should still have default classes
  });

  it('handles empty className prop', () => {
    render(
      <Card className="">
        <p>Test content</p>
      </Card>
    );

    const cardElement = screen.getByText('Test content').parentElement;
    expect(cardElement).toHaveClass('bg-slate-800');
  });

  it('has proper hover and transition effects', () => {
    render(
      <Card>
        <p>Test content</p>
      </Card>
    );

    const cardElement = screen.getByText('Test content').parentElement;
    expect(cardElement).toHaveClass('hover:shadow-xl');
    expect(cardElement).toHaveClass('transition-shadow');
    expect(cardElement).toHaveClass('duration-200');
  });
});
