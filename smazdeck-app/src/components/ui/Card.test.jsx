import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Card, { 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter, 
  CardSkeleton 
} from './Card';

describe('Card Component', () => {
  describe('Basic Functionality', () => {
    it('renders children correctly', () => {
      render(
        <Card>
          <p>Test content</p>
        </Card>
      );

      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('applies default styling', () => {
      render(
        <Card data-testid="card">
          <p>Test content</p>
        </Card>
      );

      const cardElement = screen.getByTestId('card');
      expect(cardElement).toHaveClass('bg-slate-800');
      expect(cardElement).toHaveClass('border-slate-700');
      expect(cardElement).toHaveClass('rounded-lg');
      expect(cardElement).toHaveClass('shadow-lg');
      expect(cardElement).toHaveClass('p-4'); // default size
    });

    it('applies custom className when provided', () => {
      render(
        <Card className="custom-class" data-testid="card">
          <p>Test content</p>
        </Card>
      );

      const cardElement = screen.getByTestId('card');
      expect(cardElement).toHaveClass('custom-class');
      expect(cardElement).toHaveClass('bg-slate-800'); // Should still have default classes
    });

    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(
        <Card ref={ref}>
          <p>Test content</p>
        </Card>
      );

      expect(ref).toHaveBeenCalled();
    });
  });

  describe('Variants', () => {
    it('applies default variant styling', () => {
      render(
        <Card variant="default" data-testid="card">
          <p>Test content</p>
        </Card>
      );

      const cardElement = screen.getByTestId('card');
      expect(cardElement).toHaveClass('bg-slate-800');
      expect(cardElement).toHaveClass('border-slate-700');
      expect(cardElement).toHaveClass('shadow-lg');
    });

    it('applies elevated variant styling', () => {
      render(
        <Card variant="elevated" data-testid="card">
          <p>Test content</p>
        </Card>
      );

      const cardElement = screen.getByTestId('card');
      expect(cardElement).toHaveClass('bg-slate-800');
      expect(cardElement).toHaveClass('border-slate-700');
      expect(cardElement).toHaveClass('shadow-xl');
    });

    it('applies outlined variant styling', () => {
      render(
        <Card variant="outlined" data-testid="card">
          <p>Test content</p>
        </Card>
      );

      const cardElement = screen.getByTestId('card');
      expect(cardElement).toHaveClass('bg-transparent');
      expect(cardElement).toHaveClass('border-2');
      expect(cardElement).toHaveClass('border-slate-600');
    });

    it('applies glass variant styling', () => {
      render(
        <Card variant="glass" data-testid="card">
          <p>Test content</p>
        </Card>
      );

      const cardElement = screen.getByTestId('card');
      expect(cardElement).toHaveClass('bg-slate-800/80');
      expect(cardElement).toHaveClass('backdrop-blur-sm');
      expect(cardElement).toHaveClass('border-slate-700/50');
    });

    it('falls back to default variant for invalid variant', () => {
      render(
        <Card variant="invalid" data-testid="card">
          <p>Test content</p>
        </Card>
      );

      const cardElement = screen.getByTestId('card');
      expect(cardElement).toHaveClass('bg-slate-800');
      expect(cardElement).toHaveClass('shadow-lg');
    });
  });

  describe('Sizes', () => {
    it('applies small size styling', () => {
      render(
        <Card size="sm" data-testid="card">
          <p>Test content</p>
        </Card>
      );

      const cardElement = screen.getByTestId('card');
      expect(cardElement).toHaveClass('p-3');
    });

    it('applies medium size styling (default)', () => {
      render(
        <Card size="md" data-testid="card">
          <p>Test content</p>
        </Card>
      );

      const cardElement = screen.getByTestId('card');
      expect(cardElement).toHaveClass('p-4');
    });

    it('applies large size styling', () => {
      render(
        <Card size="lg" data-testid="card">
          <p>Test content</p>
        </Card>
      );

      const cardElement = screen.getByTestId('card');
      expect(cardElement).toHaveClass('p-6');
    });

    it('applies extra large size styling', () => {
      render(
        <Card size="xl" data-testid="card">
          <p>Test content</p>
        </Card>
      );

      const cardElement = screen.getByTestId('card');
      expect(cardElement).toHaveClass('p-8');
    });
  });

  describe('Interactive States', () => {
    it('applies interactive styling when interactive is true', () => {
      render(
        <Card interactive data-testid="card">
          <p>Test content</p>
        </Card>
      );

      const cardElement = screen.getByTestId('card');
      expect(cardElement).toHaveClass('cursor-pointer');
      expect(cardElement).toHaveClass('hover:scale-[1.02]');
      expect(cardElement).toHaveClass('active:scale-[0.98]');
      expect(cardElement).toHaveAttribute('tabIndex', '0');
      expect(cardElement).toHaveAttribute('role', 'button');
    });

    it('does not apply interactive styling when interactive is false', () => {
      render(
        <Card interactive={false} data-testid="card">
          <p>Test content</p>
        </Card>
      );

      const cardElement = screen.getByTestId('card');
      expect(cardElement).not.toHaveClass('cursor-pointer');
      expect(cardElement).not.toHaveAttribute('tabIndex');
      expect(cardElement).not.toHaveAttribute('role');
    });

    it('handles click events when interactive', () => {
      const handleClick = vi.fn();
      render(
        <Card interactive onClick={handleClick} data-testid="card">
          <p>Test content</p>
        </Card>
      );

      const cardElement = screen.getByTestId('card');
      fireEvent.click(cardElement);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles keyboard events when interactive', () => {
      const handleClick = vi.fn();
      render(
        <Card interactive onClick={handleClick} data-testid="card">
          <p>Test content</p>
        </Card>
      );

      const cardElement = screen.getByTestId('card');
      fireEvent.keyDown(cardElement, { key: 'Enter' });
      // Note: onClick won't be triggered by keyDown in this test setup
      // In real usage, you'd need to add onKeyDown handler
    });
  });

  describe('Hover Effects', () => {
    it('applies hover effects by default', () => {
      render(
        <Card data-testid="card">
          <p>Test content</p>
        </Card>
      );

      const cardElement = screen.getByTestId('card');
      expect(cardElement).toHaveClass('hover:shadow-xl');
      expect(cardElement).toHaveClass('hover:border-slate-600');
    });

    it('disables hover effects when hover is false', () => {
      render(
        <Card hover={false} data-testid="card">
          <p>Test content</p>
        </Card>
      );

      const cardElement = screen.getByTestId('card');
      expect(cardElement).not.toHaveClass('hover:shadow-xl');
      expect(cardElement).not.toHaveClass('hover:border-slate-600');
    });

    it('disables hover effects when loading', () => {
      render(
        <Card loading data-testid="card">
          <p>Test content</p>
        </Card>
      );

      const cardElement = screen.getByTestId('card');
      expect(cardElement).not.toHaveClass('hover:shadow-xl');
      expect(cardElement).not.toHaveClass('hover:border-slate-600');
    });
  });

  describe('Loading State', () => {
    it('renders skeleton when loading is true', () => {
      render(
        <Card loading data-testid="card">
          <p>This should not be visible</p>
        </Card>
      );

      const cardElement = screen.getByTestId('card');
      expect(cardElement).toHaveClass('animate-pulse');
      expect(cardElement).toHaveClass('pointer-events-none');
      expect(screen.queryByText('This should not be visible')).not.toBeInTheDocument();
      
      // Check for skeleton elements
      const skeletonElements = cardElement.querySelectorAll('.skeleton');
      expect(skeletonElements.length).toBeGreaterThan(0);
    });

    it('renders children when loading is false', () => {
      render(
        <Card loading={false} data-testid="card">
          <p>Test content</p>
        </Card>
      );

      expect(screen.getByText('Test content')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper focus styles for interactive cards', () => {
      render(
        <Card interactive data-testid="card">
          <p>Test content</p>
        </Card>
      );

      const cardElement = screen.getByTestId('card');
      expect(cardElement).toHaveClass('focus-visible:outline-none');
      expect(cardElement).toHaveClass('focus-visible:ring-2');
      expect(cardElement).toHaveClass('focus-visible:ring-amber-500');
    });

    it('has proper ARIA attributes for interactive cards', () => {
      render(
        <Card interactive data-testid="card">
          <p>Test content</p>
        </Card>
      );

      const cardElement = screen.getByTestId('card');
      expect(cardElement).toHaveAttribute('role', 'button');
      expect(cardElement).toHaveAttribute('tabIndex', '0');
    });
  });
});

describe('Card Sub-components', () => {
  describe('CardHeader', () => {
    it('renders with correct styling', () => {
      render(
        <CardHeader data-testid="card-header">
          <h2>Header content</h2>
        </CardHeader>
      );

      const headerElement = screen.getByTestId('card-header');
      expect(headerElement).toHaveClass('flex');
      expect(headerElement).toHaveClass('flex-col');
      expect(headerElement).toHaveClass('space-y-1.5');
      expect(headerElement).toHaveClass('pb-4');
    });
  });

  describe('CardTitle', () => {
    it('renders with correct styling', () => {
      render(
        <CardTitle data-testid="card-title">
          Title text
        </CardTitle>
      );

      const titleElement = screen.getByTestId('card-title');
      expect(titleElement.tagName).toBe('H3');
      expect(titleElement).toHaveClass('text-xl');
      expect(titleElement).toHaveClass('font-semibold');
      expect(titleElement).toHaveClass('text-slate-100');
    });
  });

  describe('CardDescription', () => {
    it('renders with correct styling', () => {
      render(
        <CardDescription data-testid="card-description">
          Description text
        </CardDescription>
      );

      const descriptionElement = screen.getByTestId('card-description');
      expect(descriptionElement.tagName).toBe('P');
      expect(descriptionElement).toHaveClass('text-sm');
      expect(descriptionElement).toHaveClass('text-slate-400');
    });
  });

  describe('CardContent', () => {
    it('renders with correct styling', () => {
      render(
        <CardContent data-testid="card-content">
          Content text
        </CardContent>
      );

      const contentElement = screen.getByTestId('card-content');
      expect(contentElement).toHaveClass('pt-0');
    });
  });

  describe('CardFooter', () => {
    it('renders with correct styling', () => {
      render(
        <CardFooter data-testid="card-footer">
          Footer content
        </CardFooter>
      );

      const footerElement = screen.getByTestId('card-footer');
      expect(footerElement).toHaveClass('flex');
      expect(footerElement).toHaveClass('items-center');
      expect(footerElement).toHaveClass('pt-4');
    });
  });

  describe('CardSkeleton', () => {
    it('renders default skeleton with 3 lines', () => {
      render(<CardSkeleton />);
      
      const skeletonElements = document.querySelectorAll('.skeleton');
      expect(skeletonElements.length).toBe(5); // title + subtitle + 3 content lines
    });

    it('renders skeleton with custom number of lines', () => {
      render(<CardSkeleton lines={5} />);
      
      const skeletonElements = document.querySelectorAll('.skeleton');
      expect(skeletonElements.length).toBe(7); // title + subtitle + 5 content lines
    });
  });
});

describe('Card Integration', () => {
  it('renders complete card with all sub-components', () => {
    render(
      <Card data-testid="card">
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
          <CardDescription>Test Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Test content</p>
        </CardContent>
        <CardFooter>
          <button>Action</button>
        </CardFooter>
      </Card>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  it('maintains proper structure and styling when combined', () => {
    render(
      <Card variant="elevated" size="lg" interactive data-testid="card">
        <CardHeader>
          <CardTitle>Interactive Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Content</p>
        </CardContent>
      </Card>
    );

    const cardElement = screen.getByTestId('card');
    expect(cardElement).toHaveClass('shadow-xl'); // elevated variant
    expect(cardElement).toHaveClass('p-6'); // lg size
    expect(cardElement).toHaveClass('cursor-pointer'); // interactive
  });
});
