import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import Tooltip from './Tooltip';

describe('Tooltip Component', () => {
  const getTooltip = container => container.querySelector('[role="tooltip"]');

  it('renders children correctly', () => {
    render(
      <Tooltip text="Tooltip text">
        <button>Hover me</button>
      </Tooltip>
    );

    expect(screen.getByText('Hover me')).toBeInTheDocument();
  });

  it('shows tooltip text as title attribute for basic accessibility', () => {
    render(
      <Tooltip text="Tooltip text">
        <button>Hover me</button>
      </Tooltip>
    );

    const wrapper = screen.getByText('Hover me').parentElement;
    expect(wrapper).toHaveAttribute('title', 'Tooltip text');
  });

  it('has proper ARIA attributes', () => {
    const { container } = render(
      <Tooltip text="Tooltip text">
        <button>Hover me</button>
      </Tooltip>
    );

    const wrapper = screen.getByText('Hover me').parentElement;
    const tooltip = getTooltip(container);

    expect(wrapper).toHaveAttribute('role', 'button');
    expect(wrapper).toHaveAttribute('tabIndex', '0');
    expect(tooltip).toHaveAttribute('role', 'tooltip');
    expect(tooltip).toHaveAttribute('id', 'tooltip');
  });

  it('is initially hidden', () => {
    const { container } = render(
      <Tooltip text="Tooltip text">
        <button>Hover me</button>
      </Tooltip>
    );

    const tooltip = getTooltip(container);
    expect(tooltip).toHaveClass('opacity-0');
    expect(tooltip).toHaveAttribute('aria-hidden', 'true');
  });

  it('shows tooltip on mouse enter and hides on mouse leave', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Tooltip text="Tooltip text">
        <button>Hover me</button>
      </Tooltip>
    );

    const wrapper = screen.getByText('Hover me').parentElement;
    const tooltip = getTooltip(container);

    // Initially hidden
    expect(tooltip).toHaveClass('opacity-0');
    expect(tooltip).toHaveAttribute('aria-hidden', 'true');

    // Mouse enter - should show
    await user.hover(wrapper);
    expect(tooltip).toHaveClass('opacity-100');
    expect(tooltip).toHaveAttribute('aria-hidden', 'false');

    // Mouse leave - should hide
    await user.unhover(wrapper);
    expect(tooltip).toHaveClass('opacity-0');
    expect(tooltip).toHaveAttribute('aria-hidden', 'true');
  });

  it('shows tooltip on focus and hides on blur', () => {
    const { container } = render(
      <Tooltip text="Tooltip text">
        <button>Focus me</button>
      </Tooltip>
    );

    const wrapper = screen.getByText('Focus me').parentElement;
    const tooltip = getTooltip(container);

    // Initially hidden
    expect(tooltip).toHaveClass('opacity-0');

    // Focus - should show
    fireEvent.focus(wrapper);
    expect(tooltip).toHaveClass('opacity-100');
    expect(tooltip).toHaveAttribute('aria-hidden', 'false');
    expect(wrapper).toHaveAttribute('aria-describedby', 'tooltip');

    // Blur - should hide
    fireEvent.blur(wrapper);
    expect(tooltip).toHaveClass('opacity-0');
    expect(tooltip).toHaveAttribute('aria-hidden', 'true');
    expect(wrapper).not.toHaveAttribute('aria-describedby');
  });

  it('applies top position by default', () => {
    const { container } = render(
      <Tooltip text="Tooltip text">
        <button>Hover me</button>
      </Tooltip>
    );

    const tooltip = getTooltip(container);
    expect(tooltip).toHaveClass('bottom-full');
    expect(tooltip).toHaveClass('mb-2');
  });

  it('applies bottom position when specified', () => {
    const { container } = render(
      <Tooltip text="Tooltip text" position="bottom">
        <button>Hover me</button>
      </Tooltip>
    );

    const tooltip = getTooltip(container);
    expect(tooltip).toHaveClass('top-full');
    expect(tooltip).toHaveClass('mt-2');
  });

  it('applies left position when specified', () => {
    const { container } = render(
      <Tooltip text="Tooltip text" position="left">
        <button>Hover me</button>
      </Tooltip>
    );

    const tooltip = getTooltip(container);
    expect(tooltip).toHaveClass('right-full');
    expect(tooltip).toHaveClass('mr-2');
    expect(tooltip).toHaveClass('top-1/2');
    expect(tooltip).toHaveClass('-translate-y-1/2');
  });

  it('applies right position when specified', () => {
    const { container } = render(
      <Tooltip text="Tooltip text" position="right">
        <button>Hover me</button>
      </Tooltip>
    );

    const tooltip = getTooltip(container);
    expect(tooltip).toHaveClass('left-full');
    expect(tooltip).toHaveClass('ml-2');
    expect(tooltip).toHaveClass('top-1/2');
    expect(tooltip).toHaveClass('-translate-y-1/2');
  });

  it('has proper styling classes', () => {
    const { container } = render(
      <Tooltip text="Tooltip text">
        <button>Hover me</button>
      </Tooltip>
    );

    const wrapper = screen.getByText('Hover me').parentElement;
    const tooltip = getTooltip(container);

    // Wrapper styling
    expect(wrapper).toHaveClass('cursor-help');
    expect(wrapper).toHaveClass('focus:outline-none');
    expect(wrapper).toHaveClass('focus:ring-2');
    expect(wrapper).toHaveClass('focus:ring-amber-400');

    // Tooltip styling
    expect(tooltip).toHaveClass('bg-slate-900');
    expect(tooltip).toHaveClass('text-white');
    expect(tooltip).toHaveClass('text-sm');
    expect(tooltip).toHaveClass('rounded-lg');
    expect(tooltip).toHaveClass('shadow-lg');
    expect(tooltip).toHaveClass('border');
    expect(tooltip).toHaveClass('border-slate-700');
    expect(tooltip).toHaveClass('transition-opacity');
    expect(tooltip).toHaveClass('duration-200');
    expect(tooltip).toHaveClass('pointer-events-none');
  });

  it('displays the correct tooltip text', () => {
    const { container } = render(
      <Tooltip text="Custom tooltip message">
        <button>Hover me</button>
      </Tooltip>
    );

    const tooltip = getTooltip(container);
    expect(tooltip).toHaveTextContent('Custom tooltip message');
  });

  it('has arrow element with proper styling', () => {
    const { container } = render(
      <Tooltip text="Tooltip text">
        <button>Hover me</button>
      </Tooltip>
    );

    const tooltip = getTooltip(container);
    const arrow = tooltip.querySelector('div:last-child');

    expect(arrow).toHaveClass('absolute');
    expect(arrow).toHaveClass('w-2');
    expect(arrow).toHaveClass('h-2');
    expect(arrow).toHaveClass('bg-slate-900');
    expect(arrow).toHaveClass('transform');
    expect(arrow).toHaveClass('rotate-45');
  });

  it('positions arrow correctly for top position', () => {
    const { container } = render(
      <Tooltip text="Tooltip text" position="top">
        <button>Hover me</button>
      </Tooltip>
    );

    const tooltip = getTooltip(container);
    const arrow = tooltip.querySelector('div:last-child');

    expect(arrow).toHaveClass('top-full');
    expect(arrow).toHaveClass('-mt-1');
    expect(arrow).toHaveClass('left-1/2');
    expect(arrow).toHaveClass('-translate-x-1/2');
    expect(arrow).toHaveClass('border-r');
    expect(arrow).toHaveClass('border-b');
  });

  it('positions arrow correctly for bottom position', () => {
    const { container } = render(
      <Tooltip text="Tooltip text" position="bottom">
        <button>Hover me</button>
      </Tooltip>
    );

    const tooltip = getTooltip(container);
    const arrow = tooltip.querySelector('div:last-child');

    expect(arrow).toHaveClass('bottom-full');
    expect(arrow).toHaveClass('-mb-1');
    expect(arrow).toHaveClass('left-1/2');
    expect(arrow).toHaveClass('-translate-x-1/2');
    expect(arrow).toHaveClass('border-l');
    expect(arrow).toHaveClass('border-t');
  });
});
