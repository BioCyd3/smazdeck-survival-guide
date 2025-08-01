import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TierListControls from '../TierListControls';

describe('TierListControls', () => {
  const mockProps = {
    isDragMode: false,
    onToggleDragMode: vi.fn(),
    onResetOrder: vi.fn(),
    hasChanges: false,
    onShowInfo: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders controls correctly', () => {
    render(<TierListControls {...mockProps} />);
    
    expect(screen.getByText('Edit Mode')).toBeInTheDocument();
    expect(screen.getByText('View only')).toBeInTheDocument();
    expect(screen.getByText('How to Use')).toBeInTheDocument();
  });

  it('shows View Mode button when in drag mode', () => {
    render(<TierListControls {...mockProps} isDragMode={true} />);
    
    expect(screen.getByText('View Mode')).toBeInTheDocument();
    expect(screen.getByText('Editing enabled')).toBeInTheDocument();
  });

  it('calls onToggleDragMode when mode button is clicked', () => {
    render(<TierListControls {...mockProps} />);
    
    const modeButton = screen.getByText('Edit Mode');
    fireEvent.click(modeButton);
    
    expect(mockProps.onToggleDragMode).toHaveBeenCalledTimes(1);
  });

  it('shows reset button when there are changes', () => {
    render(<TierListControls {...mockProps} hasChanges={true} />);
    
    expect(screen.getByText('Reset Changes')).toBeInTheDocument();
  });

  it('hides reset button when there are no changes', () => {
    render(<TierListControls {...mockProps} hasChanges={false} />);
    
    expect(screen.queryByText('Reset Changes')).not.toBeInTheDocument();
  });

  it('calls onResetOrder when reset button is clicked', () => {
    render(<TierListControls {...mockProps} hasChanges={true} />);
    
    const resetButton = screen.getByText('Reset Changes');
    fireEvent.click(resetButton);
    
    expect(mockProps.onResetOrder).toHaveBeenCalledTimes(1);
  });

  it('calls onShowInfo when info button is clicked', () => {
    render(<TierListControls {...mockProps} />);
    
    const infoButton = screen.getByText('How to Use');
    fireEvent.click(infoButton);
    
    expect(mockProps.onShowInfo).toHaveBeenCalledTimes(1);
  });

  it('shows drag instructions when in drag mode', () => {
    render(<TierListControls {...mockProps} isDragMode={true} />);
    
    expect(screen.getByText('Drag & Drop Instructions:')).toBeInTheDocument();
    expect(screen.getByText('• Click and drag any Smaz card to move it between tiers')).toBeInTheDocument();
    expect(screen.getByText('• Drop zones will highlight when you drag over them')).toBeInTheDocument();
    expect(screen.getByText('• Changes are temporary until you save or export')).toBeInTheDocument();
    expect(screen.getByText('• Use "Reset Changes" to undo all modifications')).toBeInTheDocument();
  });

  it('hides drag instructions when not in drag mode', () => {
    render(<TierListControls {...mockProps} isDragMode={false} />);
    
    expect(screen.queryByText('Drag & Drop Instructions:')).not.toBeInTheDocument();
  });

  it('renders different button text based on drag mode', () => {
    const { rerender } = render(<TierListControls {...mockProps} isDragMode={true} />);
    
    expect(screen.getByText('View Mode')).toBeInTheDocument();
    
    rerender(<TierListControls {...mockProps} isDragMode={false} />);
    expect(screen.getByText('Edit Mode')).toBeInTheDocument();
  });

  it('shows appropriate mode indicators', () => {
    const { rerender } = render(<TierListControls {...mockProps} isDragMode={true} />);
    
    expect(screen.getByText('Editing enabled')).toBeInTheDocument();
    expect(screen.getByText('Drag & drop active')).toBeInTheDocument();
    
    rerender(<TierListControls {...mockProps} isDragMode={false} />);
    expect(screen.getByText('View only')).toBeInTheDocument();
    expect(screen.getByText('Read-only mode')).toBeInTheDocument();
  });

  it('shows correct mode indicator', () => {
    const { rerender } = render(<TierListControls {...mockProps} isDragMode={false} />);
    
    expect(screen.getByText('View only')).toBeInTheDocument();
    
    rerender(<TierListControls {...mockProps} isDragMode={true} />);
    
    expect(screen.getByText('Editing enabled')).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    const { container } = render(
      <TierListControls {...mockProps} className="custom-class" />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });
});