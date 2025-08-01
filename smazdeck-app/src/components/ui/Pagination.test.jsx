import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Pagination from './Pagination';

describe('Pagination', () => {
  const mockOnPageChange = vi.fn();
  const mockOnPageSizeChange = vi.fn();

  beforeEach(() => {
    mockOnPageChange.mockClear();
    mockOnPageSizeChange.mockClear();
  });

  it('renders pagination controls correctly', () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        totalItems={50}
        pageSize={10}
        onPageChange={mockOnPageChange}
        onPageSizeChange={mockOnPageSizeChange}
      />
    );

    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Showing 11 to 20 of 50 results')).toBeInTheDocument();
  });

  it('calls onPageChange when page button is clicked', () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    fireEvent.click(screen.getByText('3'));
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it('calls onPageSizeChange when page size is changed', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        pageSize={10}
        pageSizeOptions={[10, 25, 50]}
        onPageChange={mockOnPageChange}
        onPageSizeChange={mockOnPageSizeChange}
      />
    );

    const select = screen.getByLabelText('Items per page');
    fireEvent.change(select, { target: { value: '25' } });
    expect(mockOnPageSizeChange).toHaveBeenCalledWith(25);
  });

  it('disables previous button on first page', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const prevButton = screen.getByLabelText('Go to previous page');
    expect(prevButton).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const nextButton = screen.getByLabelText('Go to next page');
    expect(nextButton).toBeDisabled();
  });

  it('shows ellipsis for large page ranges', () => {
    render(
      <Pagination
        currentPage={10}
        totalPages={20}
        maxVisiblePages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const ellipses = screen.getAllByText('...');
    expect(ellipses.length).toBeGreaterThan(0);
  });

  it('shows first and last page buttons when enabled', () => {
    render(
      <Pagination
        currentPage={10}
        totalPages={20}
        showFirstLast={true}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByLabelText('Go to first page')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to last page')).toBeInTheDocument();
  });

  it('hides page size selector when showPageSize is false', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        showPageSize={false}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.queryByLabelText('Items per page')).not.toBeInTheDocument();
  });

  it('hides info text when showInfo is false', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        totalItems={50}
        showInfo={false}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.queryByText(/Showing/)).not.toBeInTheDocument();
  });

  it('renders nothing when totalPages is 1 and no additional features', () => {
    const { container } = render(
      <Pagination
        currentPage={1}
        totalPages={1}
        showPageSize={false}
        showInfo={false}
        onPageChange={mockOnPageChange}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it('handles different sizes correctly', () => {
    const { rerender } = render(
      <Pagination
        currentPage={1}
        totalPages={5}
        size="sm"
        onPageChange={mockOnPageChange}
      />
    );

    let buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveClass('text-xs');

    rerender(
      <Pagination
        currentPage={1}
        totalPages={5}
        size="lg"
        onPageChange={mockOnPageChange}
      />
    );

    buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveClass('text-base');
  });

  it('has proper accessibility attributes', () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Pagination navigation');

    const currentPageButton = screen.getByText('2');
    expect(currentPageButton).toHaveAttribute('aria-current', 'page');
  });

  it('calculates item ranges correctly', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        totalItems={47}
        pageSize={10}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText('Showing 21 to 30 of 47 results')).toBeInTheDocument();
  });

  it('handles last page with fewer items correctly', () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        totalItems={47}
        pageSize={10}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText('Showing 41 to 47 of 47 results')).toBeInTheDocument();
  });
});