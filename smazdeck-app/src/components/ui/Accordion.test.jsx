import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import Accordion from './Accordion';

describe('Accordion Component', () => {
  it('renders title and children correctly', () => {
    render(
      <Accordion title="Test Accordion">
        <p>Test content</p>
      </Accordion>
    );

    expect(screen.getByText('Test Accordion')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('starts closed by default', () => {
    render(
      <Accordion title="Test Accordion">
        <p>Test content</p>
      </Accordion>
    );

    const button = screen.getByRole('button');
    const content =
      screen.getByText('Test content').parentElement.parentElement;

    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(content).toHaveClass('max-h-0');
    expect(content).toHaveClass('opacity-0');
  });

  it('starts open when startOpen is true', () => {
    render(
      <Accordion title="Test Accordion" startOpen={true}>
        <p>Test content</p>
      </Accordion>
    );

    const button = screen.getByRole('button');
    const content =
      screen.getByText('Test content').parentElement.parentElement;

    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(content).toHaveClass('max-h-screen');
    expect(content).toHaveClass('opacity-100');
  });

  it('toggles open/closed state when clicked', async () => {
    const user = userEvent.setup();

    render(
      <Accordion title="Test Accordion">
        <p>Test content</p>
      </Accordion>
    );

    const button = screen.getByRole('button');
    const content =
      screen.getByText('Test content').parentElement.parentElement;

    // Initially closed
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(content).toHaveClass('max-h-0');

    // Click to open
    await user.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(content).toHaveClass('max-h-screen');

    // Click to close
    await user.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(content).toHaveClass('max-h-0');
  });

  it('toggles when Enter key is pressed', () => {
    render(
      <Accordion title="Test Accordion">
        <p>Test content</p>
      </Accordion>
    );

    const button = screen.getByRole('button');
    const content =
      screen.getByText('Test content').parentElement.parentElement;

    // Initially closed
    expect(button).toHaveAttribute('aria-expanded', 'false');

    // Press Enter to open
    fireEvent.keyDown(button, { key: 'Enter' });
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(content).toHaveClass('max-h-screen');

    // Press Enter to close
    fireEvent.keyDown(button, { key: 'Enter' });
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(content).toHaveClass('max-h-0');
  });

  it('toggles when Space key is pressed', () => {
    render(
      <Accordion title="Test Accordion">
        <p>Test content</p>
      </Accordion>
    );

    const button = screen.getByRole('button');
    const content =
      screen.getByText('Test content').parentElement.parentElement;

    // Initially closed
    expect(button).toHaveAttribute('aria-expanded', 'false');

    // Press Space to open
    fireEvent.keyDown(button, { key: ' ' });
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(content).toHaveClass('max-h-screen');

    // Press Space to close
    fireEvent.keyDown(button, { key: ' ' });
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(content).toHaveClass('max-h-0');
  });

  it('does not toggle for other keys', () => {
    render(
      <Accordion title="Test Accordion">
        <p>Test content</p>
      </Accordion>
    );

    const button = screen.getByRole('button');

    // Initially closed
    expect(button).toHaveAttribute('aria-expanded', 'false');

    // Press other keys - should not toggle
    fireEvent.keyDown(button, { key: 'Tab' });
    fireEvent.keyDown(button, { key: 'Escape' });
    fireEvent.keyDown(button, { key: 'ArrowDown' });

    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('has proper ARIA attributes', () => {
    render(
      <Accordion title="Test Accordion">
        <p>Test content</p>
      </Accordion>
    );

    const button = screen.getByRole('button');
    const content = screen.getByRole('region');

    // Button should have aria-expanded and aria-controls
    expect(button).toHaveAttribute('aria-expanded');
    expect(button).toHaveAttribute('aria-controls');

    // Content should have role="region" and aria-labelledby
    expect(content).toHaveAttribute('aria-labelledby');

    // The aria-controls and aria-labelledby should reference each other
    const buttonId = button.getAttribute('id');
    const contentId = content.getAttribute('id');
    const ariaControls = button.getAttribute('aria-controls');
    const ariaLabelledBy = content.getAttribute('aria-labelledby');

    expect(ariaControls).toBe(contentId);
    expect(ariaLabelledBy).toBe(buttonId);
  });

  it('has proper button type attribute', () => {
    render(
      <Accordion title="Test Accordion">
        <p>Test content</p>
      </Accordion>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'button');
  });

  it('has aria-hidden on the chevron icon', () => {
    render(
      <Accordion title="Test Accordion">
        <p>Test content</p>
      </Accordion>
    );

    const chevron = screen
      .getByRole('button')
      .querySelector('span[aria-hidden]');
    expect(chevron).toHaveAttribute('aria-hidden', 'true');
  });

  it('rotates chevron icon when opened', async () => {
    const user = userEvent.setup();

    render(
      <Accordion title="Test Accordion">
        <p>Test content</p>
      </Accordion>
    );

    const button = screen.getByRole('button');
    const chevron = button.querySelector('span[aria-hidden]');

    // Initially not rotated
    expect(chevron).not.toHaveClass('rotate-180');

    // Click to open - should rotate
    await user.click(button);
    expect(chevron).toHaveClass('rotate-180');

    // Click to close - should not be rotated
    await user.click(button);
    expect(chevron).not.toHaveClass('rotate-180');
  });

  it('has focus styles for accessibility', () => {
    render(
      <Accordion title="Test Accordion">
        <p>Test content</p>
      </Accordion>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('focus:outline-none');
    expect(button).toHaveClass('focus:ring-2');
    expect(button).toHaveClass('focus:ring-amber-400');
  });
});
