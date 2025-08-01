import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button, { ButtonGroup, IconButton } from './Button';

// Mock icon component for testing
const MockIcon = ({ className, ...props }) => (
  <svg className={className} data-testid="mock-icon" {...props}>
    <circle cx="12" cy="12" r="10" />
  </svg>
);

describe('Button Component', () => {
  describe('Basic Functionality', () => {
    it('renders children correctly', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('handles click events', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click me</Button>);
      
      fireEvent.click(screen.getByText('Click me'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(<Button ref={ref}>Button</Button>);
      expect(ref).toHaveBeenCalled();
    });

    it('applies custom className', () => {
      render(<Button className="custom-class" data-testid="button">Button</Button>);
      const button = screen.getByTestId('button');
      expect(button).toHaveClass('custom-class');
    });

    it('passes through additional props', () => {
      render(<Button data-testid="button" data-custom="value">Button</Button>);
      const button = screen.getByTestId('button');
      expect(button).toHaveAttribute('data-custom', 'value');
    });
  });

  describe('Variants', () => {
    it('applies primary variant styling (default)', () => {
      render(<Button data-testid="button">Button</Button>);
      const button = screen.getByTestId('button');
      expect(button).toHaveClass('bg-amber-500');
      expect(button).toHaveClass('text-slate-900');
      expect(button).toHaveClass('hover:bg-amber-600');
    });

    it('applies secondary variant styling', () => {
      render(<Button variant="secondary" data-testid="button">Button</Button>);
      const button = screen.getByTestId('button');
      expect(button).toHaveClass('bg-slate-700');
      expect(button).toHaveClass('text-slate-200');
      expect(button).toHaveClass('hover:bg-slate-600');
    });

    it('applies ghost variant styling', () => {
      render(<Button variant="ghost" data-testid="button">Button</Button>);
      const button = screen.getByTestId('button');
      expect(button).toHaveClass('bg-transparent');
      expect(button).toHaveClass('text-slate-200');
      expect(button).toHaveClass('hover:bg-slate-800');
    });

    it('applies danger variant styling', () => {
      render(<Button variant="danger" data-testid="button">Button</Button>);
      const button = screen.getByTestId('button');
      expect(button).toHaveClass('bg-red-600');
      expect(button).toHaveClass('text-white');
      expect(button).toHaveClass('hover:bg-red-700');
    });

    it('applies success variant styling', () => {
      render(<Button variant="success" data-testid="button">Button</Button>);
      const button = screen.getByTestId('button');
      expect(button).toHaveClass('bg-green-600');
      expect(button).toHaveClass('text-white');
      expect(button).toHaveClass('hover:bg-green-700');
    });

    it('applies warning variant styling', () => {
      render(<Button variant="warning" data-testid="button">Button</Button>);
      const button = screen.getByTestId('button');
      expect(button).toHaveClass('bg-amber-600');
      expect(button).toHaveClass('text-slate-900');
      expect(button).toHaveClass('hover:bg-amber-700');
    });

    it('applies info variant styling', () => {
      render(<Button variant="info" data-testid="button">Button</Button>);
      const button = screen.getByTestId('button');
      expect(button).toHaveClass('bg-blue-600');
      expect(button).toHaveClass('text-white');
      expect(button).toHaveClass('hover:bg-blue-700');
    });

    it('applies outline variant styling', () => {
      render(<Button variant="outline" data-testid="button">Button</Button>);
      const button = screen.getByTestId('button');
      expect(button).toHaveClass('border-2');
      expect(button).toHaveClass('border-slate-600');
      expect(button).toHaveClass('text-slate-200');
    });

    it('falls back to primary variant for invalid variant', () => {
      render(<Button variant="invalid" data-testid="button">Button</Button>);
      const button = screen.getByTestId('button');
      expect(button).toHaveClass('bg-amber-500');
    });
  });

  describe('Sizes', () => {
    it('applies extra small size styling', () => {
      render(<Button size="xs" data-testid="button">Button</Button>);
      const button = screen.getByTestId('button');
      expect(button).toHaveClass('h-7');
      expect(button).toHaveClass('px-2');
      expect(button).toHaveClass('text-xs');
    });

    it('applies small size styling', () => {
      render(<Button size="sm" data-testid="button">Button</Button>);
      const button = screen.getByTestId('button');
      expect(button).toHaveClass('h-8');
      expect(button).toHaveClass('px-3');
      expect(button).toHaveClass('text-sm');
    });

    it('applies medium size styling (default)', () => {
      render(<Button size="md" data-testid="button">Button</Button>);
      const button = screen.getByTestId('button');
      expect(button).toHaveClass('h-10');
      expect(button).toHaveClass('px-4');
      expect(button).toHaveClass('text-base');
    });

    it('applies large size styling', () => {
      render(<Button size="lg" data-testid="button">Button</Button>);
      const button = screen.getByTestId('button');
      expect(button).toHaveClass('h-12');
      expect(button).toHaveClass('px-6');
      expect(button).toHaveClass('text-lg');
    });

    it('applies extra large size styling', () => {
      render(<Button size="xl" data-testid="button">Button</Button>);
      const button = screen.getByTestId('button');
      expect(button).toHaveClass('h-14');
      expect(button).toHaveClass('px-8');
      expect(button).toHaveClass('text-xl');
    });
  });

  describe('States', () => {
    it('applies disabled styling and behavior', () => {
      const handleClick = vi.fn();
      render(
        <Button disabled onClick={handleClick} data-testid="button">
          Button
        </Button>
      );
      
      const button = screen.getByTestId('button');
      expect(button).toBeDisabled();
      expect(button).toHaveClass('opacity-50');
      expect(button).toHaveClass('cursor-not-allowed');
      expect(button).toHaveAttribute('aria-disabled', 'true');
      
      fireEvent.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('applies loading styling and behavior', () => {
      const handleClick = vi.fn();
      render(
        <Button loading onClick={handleClick} data-testid="button">
          Button
        </Button>
      );
      
      const button = screen.getByTestId('button');
      expect(button).toBeDisabled();
      expect(button).toHaveClass('cursor-wait');
      expect(button).toHaveClass('opacity-50');
      expect(button).toHaveAttribute('aria-disabled', 'true');
      
      // Check for loading spinner
      const spinner = button.querySelector('svg');
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveClass('animate-spin');
      
      fireEvent.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('applies full width styling', () => {
      render(<Button fullWidth data-testid="button">Button</Button>);
      const button = screen.getByTestId('button');
      expect(button).toHaveClass('w-full');
    });
  });

  describe('Icons', () => {
    it('renders icon on the left by default', () => {
      render(
        <Button icon={<MockIcon />} data-testid="button">
          Button Text
        </Button>
      );
      
      const button = screen.getByTestId('button');
      const icon = screen.getByTestId('mock-icon');
      
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass('mr-2');
      
      // Check that icon has left margin (indicating left position)
      expect(icon).toHaveClass('mr-2');
      expect(icon).not.toHaveClass('ml-2');
    });

    it('renders icon on the right when specified', () => {
      render(
        <Button icon={<MockIcon />} iconPosition="right" data-testid="button">
          Button Text
        </Button>
      );
      
      const icon = screen.getByTestId('mock-icon');
      
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass('ml-2');
      
      // Check that icon has right margin (indicating right position)
      expect(icon).toHaveClass('ml-2');
      expect(icon).not.toHaveClass('mr-2');
    });

    it('renders icon without spacing when no text', () => {
      render(<Button icon={<MockIcon />} data-testid="button" />);
      
      const icon = screen.getByTestId('mock-icon');
      expect(icon).toBeInTheDocument();
      expect(icon).not.toHaveClass('mr-2');
      expect(icon).not.toHaveClass('ml-2');
    });

    it('applies correct icon size based on button size', () => {
      render(<Button icon={<MockIcon />} size="lg" data-testid="button">Button</Button>);
      
      const icon = screen.getByTestId('mock-icon');
      expect(icon).toHaveClass('w-6');
      expect(icon).toHaveClass('h-6');
    });

    it('hides icon during loading state', () => {
      render(
        <Button icon={<MockIcon />} loading data-testid="button">
          Button
        </Button>
      );
      
      expect(screen.queryByTestId('mock-icon')).not.toBeInTheDocument();
      
      // But loading spinner should be present
      const button = screen.getByTestId('button');
      const spinner = button.querySelector('svg');
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveClass('animate-spin');
    });
  });

  describe('Button Types', () => {
    it('defaults to button type', () => {
      render(<Button data-testid="button">Button</Button>);
      const button = screen.getByTestId('button');
      expect(button).toHaveAttribute('type', 'button');
    });

    it('accepts submit type', () => {
      render(<Button type="submit" data-testid="button">Submit</Button>);
      const button = screen.getByTestId('button');
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('accepts reset type', () => {
      render(<Button type="reset" data-testid="button">Reset</Button>);
      const button = screen.getByTestId('button');
      expect(button).toHaveAttribute('type', 'reset');
    });
  });

  describe('Accessibility', () => {
    it('has proper focus styles', () => {
      render(<Button data-testid="button">Button</Button>);
      const button = screen.getByTestId('button');
      expect(button).toHaveClass('focus-visible:outline-none');
      expect(button).toHaveClass('focus-visible:ring-2');
      expect(button).toHaveClass('focus-visible:ring-offset-2');
    });

    it('has proper disabled accessibility attributes', () => {
      render(<Button disabled data-testid="button">Button</Button>);
      const button = screen.getByTestId('button');
      expect(button).toHaveAttribute('aria-disabled', 'true');
      expect(button).toBeDisabled();
    });

    it('has proper loading accessibility attributes', () => {
      render(<Button loading data-testid="button">Button</Button>);
      const button = screen.getByTestId('button');
      expect(button).toHaveAttribute('aria-disabled', 'true');
      expect(button).toBeDisabled();
    });

    it('sets aria-hidden on icons', () => {
      render(<Button icon={<MockIcon />}>Button</Button>);
      const icon = screen.getByTestId('mock-icon');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });
  });
});

describe('ButtonGroup Component', () => {
  it('renders children correctly', () => {
    render(
      <ButtonGroup>
        <Button>First</Button>
        <Button>Second</Button>
      </ButtonGroup>
    );
    
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
  });

  it('applies horizontal orientation by default', () => {
    render(
      <ButtonGroup data-testid="button-group">
        <Button>First</Button>
        <Button>Second</Button>
      </ButtonGroup>
    );
    
    const group = screen.getByTestId('button-group');
    expect(group).toHaveClass('flex-row');
    expect(group).toHaveAttribute('role', 'group');
  });

  it('applies vertical orientation when specified', () => {
    render(
      <ButtonGroup orientation="vertical" data-testid="button-group">
        <Button>First</Button>
        <Button>Second</Button>
      </ButtonGroup>
    );
    
    const group = screen.getByTestId('button-group');
    expect(group).toHaveClass('flex-col');
  });

  it('applies group styling to buttons in horizontal layout', () => {
    render(
      <ButtonGroup>
        <Button data-testid="first">First</Button>
        <Button data-testid="middle">Middle</Button>
        <Button data-testid="last">Last</Button>
      </ButtonGroup>
    );
    
    const firstButton = screen.getByTestId('first');
    const middleButton = screen.getByTestId('middle');
    const lastButton = screen.getByTestId('last');
    
    expect(firstButton).toHaveClass('rounded-r-none');
    expect(middleButton).toHaveClass('rounded-none');
    expect(lastButton).toHaveClass('rounded-l-none');
  });

  it('applies group styling to buttons in vertical layout', () => {
    render(
      <ButtonGroup orientation="vertical">
        <Button data-testid="first">First</Button>
        <Button data-testid="middle">Middle</Button>
        <Button data-testid="last">Last</Button>
      </ButtonGroup>
    );
    
    const firstButton = screen.getByTestId('first');
    const middleButton = screen.getByTestId('middle');
    const lastButton = screen.getByTestId('last');
    
    expect(firstButton).toHaveClass('rounded-b-none');
    expect(middleButton).toHaveClass('rounded-none');
    expect(lastButton).toHaveClass('rounded-t-none');
  });

  it('inherits size and variant from group props', () => {
    render(
      <ButtonGroup size="lg" variant="secondary">
        <Button data-testid="button">Button</Button>
      </ButtonGroup>
    );
    
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('h-12'); // lg size
    expect(button).toHaveClass('bg-slate-700'); // secondary variant
  });

  it('allows individual buttons to override group props', () => {
    render(
      <ButtonGroup size="lg" variant="secondary">
        <Button size="sm" variant="primary" data-testid="button">Button</Button>
      </ButtonGroup>
    );
    
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('h-8'); // sm size (overridden)
    expect(button).toHaveClass('bg-amber-500'); // primary variant (overridden)
  });
});

describe('IconButton Component', () => {
  it('renders icon correctly', () => {
    render(
      <IconButton 
        icon={<MockIcon />} 
        aria-label="Icon button"
        data-testid="icon-button"
      />
    );
    
    const button = screen.getByTestId('icon-button');
    const icon = screen.getByTestId('mock-icon');
    
    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Icon button');
  });

  it('applies square aspect ratio', () => {
    render(
      <IconButton 
        icon={<MockIcon />} 
        aria-label="Icon button"
        data-testid="icon-button"
      />
    );
    
    const button = screen.getByTestId('icon-button');
    expect(button).toHaveClass('aspect-square');
  });

  it('applies correct size styling', () => {
    render(
      <IconButton 
        icon={<MockIcon />} 
        aria-label="Icon button"
        size="lg"
        data-testid="icon-button"
      />
    );
    
    const button = screen.getByTestId('icon-button');
    expect(button).toHaveClass('h-12');
    expect(button).toHaveClass('w-12');
    expect(button).toHaveClass('p-2.5');
  });

  it('defaults to ghost variant', () => {
    render(
      <IconButton 
        icon={<MockIcon />} 
        aria-label="Icon button"
        data-testid="icon-button"
      />
    );
    
    const button = screen.getByTestId('icon-button');
    expect(button).toHaveClass('bg-transparent');
  });

  it('accepts custom variant', () => {
    render(
      <IconButton 
        icon={<MockIcon />} 
        aria-label="Icon button"
        variant="primary"
        data-testid="icon-button"
      />
    );
    
    const button = screen.getByTestId('icon-button');
    expect(button).toHaveClass('bg-amber-500');
  });

  it('requires aria-label for accessibility', () => {
    render(
      <IconButton 
        icon={<MockIcon />} 
        aria-label="Delete item"
        data-testid="icon-button"
      />
    );
    
    const button = screen.getByTestId('icon-button');
    expect(button).toHaveAttribute('aria-label', 'Delete item');
  });
});