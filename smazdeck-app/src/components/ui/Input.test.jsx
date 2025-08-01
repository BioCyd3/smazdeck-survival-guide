import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Input, Label, FormField, Textarea } from './Input';

// Mock icon component for testing
const MockIcon = ({ className, ...props }) => (
  <svg className={className} data-testid="mock-icon" {...props}>
    <circle cx="12" cy="12" r="10" />
  </svg>
);

describe('Input Component', () => {
  describe('Basic Functionality', () => {
    it('renders input correctly', () => {
      render(<Input placeholder="Test input" data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('placeholder', 'Test input');
    });

    it('handles value changes', () => {
      const handleChange = vi.fn();
      render(<Input onChange={handleChange} data-testid="input" />);
      
      const input = screen.getByTestId('input');
      fireEvent.change(input, { target: { value: 'test value' } });
      
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(<Input ref={ref} />);
      expect(ref).toHaveBeenCalled();
    });

    it('applies custom className', () => {
      render(<Input className="custom-class" data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input).toHaveClass('custom-class');
    });
  });

  describe('Variants', () => {
    it('applies default variant styling', () => {
      render(<Input data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input).toHaveClass('border-slate-600');
      expect(input).toHaveClass('bg-slate-800');
    });

    it('applies error variant styling', () => {
      render(<Input variant="error" data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input).toHaveClass('border-red-500');
      expect(input).toHaveClass('focus:border-red-500');
    });

    it('applies success variant styling', () => {
      render(<Input variant="success" data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input).toHaveClass('border-green-500');
      expect(input).toHaveClass('focus:border-green-500');
    });

    it('applies warning variant styling', () => {
      render(<Input variant="warning" data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input).toHaveClass('border-amber-500');
      expect(input).toHaveClass('focus:border-amber-500');
    });

    it('overrides variant based on validation props', () => {
      render(<Input variant="default" error="Error message" data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input).toHaveClass('border-red-500');
    });
  });

  describe('Sizes', () => {
    it('applies small size styling', () => {
      render(<Input size="sm" data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input).toHaveClass('h-8');
      expect(input).toHaveClass('px-3');
      expect(input).toHaveClass('text-sm');
    });

    it('applies medium size styling (default)', () => {
      render(<Input size="md" data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input).toHaveClass('h-10');
      expect(input).toHaveClass('px-4');
      expect(input).toHaveClass('text-base');
    });

    it('applies large size styling', () => {
      render(<Input size="lg" data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input).toHaveClass('h-12');
      expect(input).toHaveClass('px-6');
      expect(input).toHaveClass('text-lg');
    });
  });

  describe('States', () => {
    it('applies disabled styling and behavior', () => {
      render(<Input disabled data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input).toBeDisabled();
      expect(input).toHaveClass('disabled:opacity-50');
    });

    it('applies required attribute', () => {
      render(<Input required data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('required');
    });

    it('applies full width by default', () => {
      render(<Input data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input).toHaveClass('w-full');
    });

    it('removes full width when specified', () => {
      render(<Input fullWidth={false} data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input).not.toHaveClass('w-full');
    });
  });

  describe('Icons', () => {
    it('renders left icon correctly', () => {
      render(
        <Input leftIcon={<MockIcon />} data-testid="input" />
      );
      
      const icon = screen.getByTestId('mock-icon');
      const input = screen.getByTestId('input');
      
      expect(icon).toBeInTheDocument();
      expect(input).toHaveClass('pl-10');
    });

    it('renders right icon correctly', () => {
      render(
        <Input rightIcon={<MockIcon />} data-testid="input" />
      );
      
      const icon = screen.getByTestId('mock-icon');
      const input = screen.getByTestId('input');
      
      expect(icon).toBeInTheDocument();
      expect(input).toHaveClass('pr-10');
    });

    it('handles icon click events', () => {
      const handleIconClick = vi.fn();
      render(
        <Input 
          leftIcon={<MockIcon />} 
          onLeftIconClick={handleIconClick}
          data-testid="input" 
        />
      );
      
      const icon = screen.getByTestId('mock-icon');
      fireEvent.click(icon.parentElement);
      
      expect(handleIconClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Input Types', () => {
    it('defaults to text type', () => {
      render(<Input data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('type', 'text');
    });

    it('accepts different input types', () => {
      render(<Input type="email" data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('type', 'email');
    });
  });
});

describe('Label Component', () => {
  it('renders label correctly', () => {
    render(<Label>Test Label</Label>);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('shows required indicator when required', () => {
    render(<Label required>Required Label</Label>);
    expect(screen.getByText('*')).toBeInTheDocument();
    expect(screen.getByText('*')).toHaveClass('text-red-400');
  });

  it('applies custom className', () => {
    render(<Label className="custom-label">Label</Label>);
    const label = screen.getByText('Label');
    expect(label).toHaveClass('custom-label');
  });
});

describe('FormField Component', () => {
  it('renders label and input together', () => {
    render(
      <FormField label="Test Field">
        <Input data-testid="input" />
      </FormField>
    );
    
    expect(screen.getByText('Test Field')).toBeInTheDocument();
    expect(screen.getByTestId('input')).toBeInTheDocument();
  });

  it('shows error message', () => {
    render(
      <FormField label="Test Field" error="This field is required">
        <Input data-testid="input" />
      </FormField>
    );
    
    expect(screen.getByText('This field is required')).toBeInTheDocument();
    expect(screen.getByText('This field is required')).toHaveClass('text-red-400');
  });

  it('shows success message', () => {
    render(
      <FormField label="Test Field" success="Field is valid">
        <Input data-testid="input" />
      </FormField>
    );
    
    expect(screen.getByText('Field is valid')).toBeInTheDocument();
    expect(screen.getByText('Field is valid')).toHaveClass('text-green-400');
  });

  it('shows warning message', () => {
    render(
      <FormField label="Test Field" warning="Please check this field">
        <Input data-testid="input" />
      </FormField>
    );
    
    expect(screen.getByText('Please check this field')).toBeInTheDocument();
    expect(screen.getByText('Please check this field')).toHaveClass('text-amber-400');
  });

  it('shows hint when no validation messages', () => {
    render(
      <FormField label="Test Field" hint="This is a helpful hint">
        <Input data-testid="input" />
      </FormField>
    );
    
    expect(screen.getByText('This is a helpful hint')).toBeInTheDocument();
    expect(screen.getByText('This is a helpful hint')).toHaveClass('text-slate-400');
  });

  it('associates label with input via htmlFor', () => {
    render(
      <FormField label="Test Field">
        <Input data-testid="input" />
      </FormField>
    );
    
    const label = screen.getByText('Test Field');
    const input = screen.getByTestId('input');
    
    expect(label).toHaveAttribute('for', input.id);
  });
});

describe('Textarea Component', () => {
  it('renders textarea correctly', () => {
    render(<Textarea placeholder="Test textarea" data-testid="textarea" />);
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toBeInTheDocument();
    expect(textarea.tagName).toBe('TEXTAREA');
    expect(textarea).toHaveAttribute('placeholder', 'Test textarea');
  });

  it('applies default rows', () => {
    render(<Textarea data-testid="textarea" />);
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveAttribute('rows', '4');
  });

  it('applies custom rows', () => {
    render(<Textarea rows={6} data-testid="textarea" />);
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveAttribute('rows', '6');
  });

  it('applies resize classes', () => {
    render(<Textarea resize="none" data-testid="textarea" />);
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveClass('resize-none');
  });

  it('handles value changes', () => {
    const handleChange = vi.fn();
    render(<Textarea onChange={handleChange} data-testid="textarea" />);
    
    const textarea = screen.getByTestId('textarea');
    fireEvent.change(textarea, { target: { value: 'test content' } });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('applies validation variants', () => {
    render(<Textarea error="Error message" data-testid="textarea" />);
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveClass('border-red-500');
  });
});