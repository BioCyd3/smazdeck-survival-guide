import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import EnhancedTierRow from '../EnhancedTierRow';

// Mock the Accordion component
vi.mock('../../ui/Accordion', () => ({
  default: ({ title, children, startOpen }) => (
    <div data-testid="accordion">
      <div data-testid="accordion-title">{title}</div>
      <div data-testid="accordion-content">{children}</div>
    </div>
  )
}));

// Mock SmazCard component
vi.mock('../SmazCard', () => ({
  default: ({ smaz }) => (
    <div data-testid="smaz-card">
      {smaz.name}
    </div>
  )
}));

describe('EnhancedTierRow', () => {
  const mockTier = {
    tier: 'S',
    tier_name: 'S-Tier: Exceptional',
    entries: [
      {
        name: 'Fire Dragon',
        explanation: 'Excellent damage output',
        smaz: { id: '1', name: 'Fire Dragon', slug: 'fire-dragon' }
      },
      {
        name: 'Water Turtle',
        smaz: { id: '2', name: 'Water Turtle', slug: 'water-turtle' }
      }
    ]
  };

  const mockOnReorder = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders tier information correctly', () => {
    render(<EnhancedTierRow tier={mockTier} />);
    
    expect(screen.getByText('S')).toBeInTheDocument();
    expect(screen.getByText('S-Tier: Exceptional')).toBeInTheDocument();
    expect(screen.getByText('2 Smazs')).toBeInTheDocument();
  });

  it('renders all smaz entries', () => {
    render(<EnhancedTierRow tier={mockTier} />);
    
    expect(screen.getByText('Fire Dragon')).toBeInTheDocument();
    expect(screen.getByText('Water Turtle')).toBeInTheDocument();
  });

  it('shows explanations when available', () => {
    render(<EnhancedTierRow tier={mockTier} />);
    
    expect(screen.getByText('Excellent damage output')).toBeInTheDocument();
  });

  it('displays correct tier colors for S-tier', () => {
    render(<EnhancedTierRow tier={mockTier} />);
    
    const tierBadge = screen.getByText('S').closest('div');
    expect(tierBadge).toHaveClass('bg-tier-s-600/20');
  });

  it('displays correct tier colors for A-tier', () => {
    const aTier = { ...mockTier, tier: 'A', tier_name: 'A-Tier: Strong' };
    render(<EnhancedTierRow tier={aTier} />);
    
    const tierBadge = screen.getByText('A').closest('div');
    expect(tierBadge).toHaveClass('bg-tier-a-600/20');
  });

  it('shows empty state when no entries', () => {
    const emptyTier = { ...mockTier, entries: [] };
    render(<EnhancedTierRow tier={emptyTier} />);
    
    expect(screen.getByText('No Smazs in S-Tier')).toBeInTheDocument();
    expect(screen.getByText('0 Smazs')).toBeInTheDocument();
  });

  it('shows drag mode instructions when isDragMode is true', () => {
    render(<EnhancedTierRow tier={mockTier} isDragMode={true} />);
    
    expect(screen.getByText('Drag to reorder')).toBeInTheDocument();
  });

  it('enables draggable functionality in drag mode', () => {
    render(
      <EnhancedTierRow 
        tier={mockTier} 
        isDragMode={true} 
        onReorder={mockOnReorder} 
      />
    );
    
    const smazCards = screen.getAllByTestId('smaz-card');
    smazCards.forEach(card => {
      // Find the draggable container (should be a parent div with draggable="true")
      const draggableContainer = card.closest('div[draggable="true"]');
      expect(draggableContainer).toBeInTheDocument();
      expect(draggableContainer).toHaveAttribute('draggable', 'true');
    });
  });

  it('handles drag start event', () => {
    render(
      <EnhancedTierRow 
        tier={mockTier} 
        isDragMode={true} 
        onReorder={mockOnReorder} 
      />
    );
    
    const firstSmazCard = screen.getAllByTestId('smaz-card')[0];
    const draggableDiv = firstSmazCard.closest('div[draggable="true"]');
    
    const mockDataTransfer = {
      effectAllowed: '',
      setData: vi.fn()
    };
    
    fireEvent.dragStart(draggableDiv, { dataTransfer: mockDataTransfer });
    
    expect(mockDataTransfer.effectAllowed).toBe('move');
    expect(mockDataTransfer.setData).toHaveBeenCalled();
  });

  it('shows tier statistics', () => {
    render(<EnhancedTierRow tier={mockTier} />);
    
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('total entries')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('with explanations')).toBeInTheDocument();
  });

  it('handles null tier gracefully', () => {
    render(<EnhancedTierRow tier={null} />);
    
    expect(screen.queryByTestId('accordion')).not.toBeInTheDocument();
  });

  it('handles entries without smaz objects', () => {
    const tierWithoutSmazObjects = {
      tier: 'B',
      tier_name: 'B-Tier',
      entries: [
        { name: 'Basic Smaz' }
      ]
    };
    
    render(<EnhancedTierRow tier={tierWithoutSmazObjects} />);
    
    expect(screen.getByText('Basic Smaz')).toBeInTheDocument();
  });

  it('applies hover effects in drag mode', () => {
    render(
      <EnhancedTierRow 
        tier={mockTier} 
        isDragMode={true} 
        onReorder={mockOnReorder} 
      />
    );
    
    const smazCards = screen.getAllByTestId('smaz-card');
    const firstCardContainer = smazCards[0].closest('div[draggable="true"]');
    
    expect(firstCardContainer).toHaveClass('cursor-move');
  });

  it('shows drag indicator overlay in drag mode', () => {
    render(
      <EnhancedTierRow 
        tier={mockTier} 
        isDragMode={true} 
        onReorder={mockOnReorder} 
      />
    );
    
    expect(screen.getAllByText('Drag to move')).toHaveLength(2);
  });
});