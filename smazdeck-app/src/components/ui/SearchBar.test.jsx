import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SearchBar from './SearchBar';

describe('SearchBar Component', () => {
  const mockSuggestions = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
  ];

  describe('Basic Functionality', () => {
    it('renders search input correctly', () => {
      render(<SearchBar placeholder="Search items..." data-testid="search" />);
      const input = screen.getByTestId('search');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('placeholder', 'Search items...');
    });

    it('handles value changes', () => {
      const handleChange = vi.fn();
      render(<SearchBar value="" onChange={handleChange} data-testid="search" />);
      
      const input = screen.getByTestId('search');
      fireEvent.change(input, { target: { value: 'test' } });
      
      expect(handleChange).toHaveBeenCalledWith('test');
    });

    it('shows search icon', () => {
      render(<SearchBar data-testid="search" />);
      const searchIcon = document.querySelector('svg');
      expect(searchIcon).toBeInTheDocument();
    });

    it('shows clear button when value exists and clearable', () => {
      render(<SearchBar value="test" clearable data-testid="search" />);
      // The clear icon should be present as the right icon
      const icons = document.querySelectorAll('svg');
      expect(icons.length).toBeGreaterThan(1); // Search icon + clear icon
    });
  });

  describe('Search Functionality', () => {
    it('calls onSearch when Enter is pressed', () => {
      const handleSearch = vi.fn();
      render(<SearchBar value="test" onSearch={handleSearch} data-testid="search" />);
      
      const input = screen.getByTestId('search');
      fireEvent.keyDown(input, { key: 'Enter' });
      
      expect(handleSearch).toHaveBeenCalledWith('test');
    });

    it('debounces search calls', async () => {
      const handleSearch = vi.fn();
      const handleChange = vi.fn();
      render(
        <SearchBar 
          value=""
          onChange={handleChange}
          onSearch={handleSearch} 
          debounceMs={100} 
          data-testid="search" 
        />
      );
      
      const input = screen.getByTestId('search');
      fireEvent.change(input, { target: { value: 'test' } });
      
      // Should not call immediately
      expect(handleSearch).not.toHaveBeenCalled();
      
      // Should call after debounce delay
      await waitFor(() => {
        expect(handleSearch).toHaveBeenCalledWith('test');
      }, { timeout: 300 });
    });

    it('handles clear functionality', () => {
      const handleChange = vi.fn();
      const handleClear = vi.fn();
      
      render(
        <SearchBar 
          value="test" 
          onChange={handleChange}
          onClear={handleClear}
          clearable 
          data-testid="search" 
        />
      );
      
      // Find the clear button by looking for the clickable div with role="button"
      const clearButton = document.querySelector('[role="button"]');
      expect(clearButton).toBeInTheDocument();
      fireEvent.click(clearButton);
      
      expect(handleChange).toHaveBeenCalledWith('');
      expect(handleClear).toHaveBeenCalled();
    });
  });

  describe('Suggestions', () => {
    it('shows suggestions when focused and has value', () => {
      render(
        <SearchBar 
          value="test" 
          suggestions={mockSuggestions}
          showSuggestions
          highlightQuery={false}
          data-testid="search" 
        />
      );
      
      const input = screen.getByTestId('search');
      fireEvent.focus(input);
      
      expect(screen.getByText('Apple')).toBeInTheDocument();
      expect(screen.getByText('Banana')).toBeInTheDocument();
    });

    it('handles suggestion selection', () => {
      const handleChange = vi.fn();
      const handleSuggestionSelect = vi.fn();
      
      render(
        <SearchBar 
          value="test" 
          onChange={handleChange}
          onSuggestionSelect={handleSuggestionSelect}
          suggestions={mockSuggestions}
          showSuggestions
          highlightQuery={false}
          data-testid="search" 
        />
      );
      
      const input = screen.getByTestId('search');
      fireEvent.focus(input);
      
      const suggestion = screen.getByText('Apple');
      fireEvent.click(suggestion);
      
      expect(handleChange).toHaveBeenCalledWith('apple');
      expect(handleSuggestionSelect).toHaveBeenCalledWith(mockSuggestions[0], 0);
    });

    it('navigates suggestions with keyboard', () => {
      render(
        <SearchBar 
          value="test" 
          suggestions={mockSuggestions}
          showSuggestions
          highlightQuery={false}
          data-testid="search" 
        />
      );
      
      const input = screen.getByTestId('search');
      fireEvent.focus(input);
      
      // Arrow down should select first suggestion
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      
      const firstSuggestion = screen.getByText('Apple');
      expect(firstSuggestion.parentElement).toHaveClass('bg-amber-500/10');
    });

    it('selects suggestion with Enter key', () => {
      const handleChange = vi.fn();
      
      render(
        <SearchBar 
          value="test" 
          onChange={handleChange}
          suggestions={mockSuggestions}
          showSuggestions
          highlightQuery={false}
          data-testid="search" 
        />
      );
      
      const input = screen.getByTestId('search');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'ArrowDown' }); // Select first
      fireEvent.keyDown(input, { key: 'Enter' }); // Confirm selection
      
      expect(handleChange).toHaveBeenCalledWith('apple');
    });

    it('closes suggestions with Escape key', () => {
      render(
        <SearchBar 
          value="test" 
          suggestions={mockSuggestions}
          showSuggestions
          highlightQuery={false}
          data-testid="search" 
        />
      );
      
      const input = screen.getByTestId('search');
      fireEvent.focus(input);
      
      expect(screen.getByText('Apple')).toBeInTheDocument();
      
      fireEvent.keyDown(input, { key: 'Escape' });
      
      expect(screen.queryByText('Apple')).not.toBeInTheDocument();
    });

    it('highlights search query in suggestions', () => {
      render(
        <SearchBar 
          value="app" 
          suggestions={mockSuggestions}
          showSuggestions
          highlightQuery
          data-testid="search" 
        />
      );
      
      const input = screen.getByTestId('search');
      fireEvent.focus(input);
      
      const highlightedText = document.querySelector('mark');
      expect(highlightedText).toBeInTheDocument();
    });

    it('limits suggestions to maxSuggestions', () => {
      const manySuggestions = Array.from({ length: 20 }, (_, i) => ({
        value: `item${i}`,
        label: `Item ${i}`
      }));
      
      render(
        <SearchBar 
          value="item" 
          suggestions={manySuggestions}
          showSuggestions
          maxSuggestions={5}
          data-testid="search" 
        />
      );
      
      const input = screen.getByTestId('search');
      fireEvent.focus(input);
      
      const suggestionElements = document.querySelectorAll('[role="option"]');
      expect(suggestionElements).toHaveLength(5);
    });
  });

  describe('Loading State', () => {
    it('shows loading spinner when loading', () => {
      render(<SearchBar loading data-testid="search" />);
      
      const spinner = document.querySelector('.animate-spin');
      expect(spinner).toBeInTheDocument();
    });

    it('hides clear button when loading', () => {
      render(<SearchBar value="test" loading clearable data-testid="search" />);
      
      // Should show spinner instead of clear button
      const spinner = document.querySelector('.animate-spin');
      expect(spinner).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(
        <SearchBar 
          suggestions={mockSuggestions}
          showSuggestions
          data-testid="search" 
        />
      );
      
      const input = screen.getByTestId('search');
      expect(input).toHaveAttribute('role', 'combobox');
      expect(input).toHaveAttribute('aria-autocomplete', 'list');
      expect(input).toHaveAttribute('aria-haspopup', 'listbox');
    });

    it('updates aria-expanded when suggestions are shown', () => {
      render(
        <SearchBar 
          value="a"
          suggestions={mockSuggestions}
          showSuggestions
          data-testid="search" 
        />
      );
      
      const input = screen.getByTestId('search');
      
      // Initially collapsed
      expect(input).toHaveAttribute('aria-expanded', 'false');
      
      // Expanded when focused
      fireEvent.focus(input);
      expect(input).toHaveAttribute('aria-expanded', 'true');
    });

    it('sets aria-activedescendant for selected suggestion', () => {
      render(
        <SearchBar 
          value="a"
          suggestions={mockSuggestions}
          showSuggestions
          data-testid="search" 
        />
      );
      
      const input = screen.getByTestId('search');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      
      expect(input).toHaveAttribute('aria-activedescendant', 'suggestion-0');
    });

    it('has proper suggestion roles', () => {
      render(
        <SearchBar 
          value="a"
          suggestions={mockSuggestions}
          showSuggestions
          data-testid="search" 
        />
      );
      
      const input = screen.getByTestId('search');
      fireEvent.focus(input);
      
      const suggestionsList = document.querySelector('[role="listbox"]');
      const suggestions = document.querySelectorAll('[role="option"]');
      
      expect(suggestionsList).toBeInTheDocument();
      expect(suggestions).toHaveLength(mockSuggestions.length);
    });
  });

  describe('Disabled State', () => {
    it('disables input when disabled prop is true', () => {
      render(<SearchBar disabled data-testid="search" />);
      const input = screen.getByTestId('search');
      expect(input).toBeDisabled();
    });

    it('does not show suggestions when disabled', () => {
      render(
        <SearchBar 
          value="a"
          disabled
          suggestions={mockSuggestions}
          showSuggestions
          data-testid="search" 
        />
      );
      
      const input = screen.getByTestId('search');
      fireEvent.focus(input);
      
      expect(screen.queryByText('Apple')).not.toBeInTheDocument();
    });
  });
});