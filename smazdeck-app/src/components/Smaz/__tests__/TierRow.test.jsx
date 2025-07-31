import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import TierRow from '../TierRow';

// Mock the Accordion and SmazCard components
vi.mock('../../ui/Accordion', () => ({
  default: ({ title, children, startOpen }) => (
    <div data-testid="accordion" data-start-open={startOpen}>
      <div data-testid="accordion-title">{title}</div>
      <div data-testid="accordion-content">{children}</div>
    </div>
  ),
}));

vi.mock('../SmazCard', () => ({
  default: ({ smaz }) => (
    <div data-testid="smaz-card" data-smaz-id={smaz.id} data-smaz-name={smaz.name}>
      {smaz.name}
    </div>
  ),
}));

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

const mockTier = {
  tier: 'S',
  tier_name: 'Game-Changing',
  entries: [
    {
      name: 'Test Smaz 1',
      explanation: 'This is a test explanation for Smaz 1',
      smaz: {
        id: 'smaz-1',
        name: 'Test Smaz 1',
        slug: 'test-smaz-1',
      },
    },
    {
      name: 'Test Smaz 2',
      explanation: 'This is a test explanation for Smaz 2',
      smaz: {
        id: 'smaz-2',
        name: 'Test Smaz 2',
        slug: 'test-smaz-2',
      },
    },
  ],
};

describe('TierRow', () => {
  it('renders tier information correctly', () => {
    renderWithRouter(<TierRow tier={mockTier} />);
    
    expect(screen.getByText('S')).toBeInTheDocument();
    expect(screen.getByText('Game-Changing (2 Smazs)')).toBeInTheDocument();
  });

  it('applies correct S-tier styling', () => {
    renderWithRouter(<TierRow tier={mockTier} />);
    
    const tierBadge = screen.getByText('S');
    expect(tierBadge).toHaveClass('border-red-500', 'text-red-400', 'bg-red-900/20');
    
    // Check the main container has the tier styling
    const mainContainer = tierBadge.closest('.mb-4');
    expect(mainContainer).toHaveClass('border-red-500', 'bg-red-900/20');
  });

  it('applies correct A-tier styling', () => {
    const aTier = { ...mockTier, tier: 'A', tier_name: 'Excellent' };
    renderWithRouter(<TierRow tier={aTier} />);
    
    const tierBadge = screen.getByText('A');
    expect(tierBadge).toHaveClass('border-violet-500', 'text-violet-400', 'bg-violet-900/20');
    
    const mainContainer = tierBadge.closest('.mb-4');
    expect(mainContainer).toHaveClass('border-violet-500', 'bg-violet-900/20');
  });

  it('applies correct B-tier styling', () => {
    const bTier = { ...mockTier, tier: 'B', tier_name: 'Good' };
    renderWithRouter(<TierRow tier={bTier} />);
    
    const tierBadge = screen.getByText('B');
    expect(tierBadge).toHaveClass('border-blue-500', 'text-blue-400', 'bg-blue-900/20');
    
    const mainContainer = tierBadge.closest('.mb-4');
    expect(mainContainer).toHaveClass('border-blue-500', 'bg-blue-900/20');
  });

  it('applies correct C-tier styling', () => {
    const cTier = { ...mockTier, tier: 'C', tier_name: 'Average' };
    renderWithRouter(<TierRow tier={cTier} />);
    
    const tierBadge = screen.getByText('C');
    expect(tierBadge).toHaveClass('border-green-500', 'text-green-400', 'bg-green-900/20');
    
    const mainContainer = tierBadge.closest('.mb-4');
    expect(mainContainer).toHaveClass('border-green-500', 'bg-green-900/20');
  });

  it('applies default styling for unknown tier', () => {
    const unknownTier = { ...mockTier, tier: 'X', tier_name: 'Unknown' };
    renderWithRouter(<TierRow tier={unknownTier} />);
    
    const tierBadge = screen.getByText('X');
    expect(tierBadge).toHaveClass('border-slate-500', 'text-slate-400', 'bg-slate-900/20');
    
    const mainContainer = tierBadge.closest('.mb-4');
    expect(mainContainer).toHaveClass('border-slate-500', 'bg-slate-900/20');
  });

  it('renders SmazCard components for each entry', () => {
    renderWithRouter(<TierRow tier={mockTier} />);
    
    const smazCards = screen.getAllByTestId('smaz-card');
    expect(smazCards).toHaveLength(2);
    expect(smazCards[0]).toHaveAttribute('data-smaz-name', 'Test Smaz 1');
    expect(smazCards[1]).toHaveAttribute('data-smaz-name', 'Test Smaz 2');
  });

  it('renders explanations for each entry', () => {
    renderWithRouter(<TierRow tier={mockTier} />);
    
    expect(screen.getByText('This is a test explanation for Smaz 1')).toBeInTheDocument();
    expect(screen.getByText('This is a test explanation for Smaz 2')).toBeInTheDocument();
  });

  it('handles entries without smaz objects', () => {
    const tierWithoutSmazObjects = {
      tier: 'A',
      tier_name: 'Test Tier',
      entries: [
        {
          name: 'Unprocessed Smaz',
          explanation: 'This entry has no smaz object',
        },
      ],
    };
    
    renderWithRouter(<TierRow tier={tierWithoutSmazObjects} />);
    
    const smazCard = screen.getByTestId('smaz-card');
    expect(smazCard).toHaveAttribute('data-smaz-name', 'Unprocessed Smaz');
  });

  it('handles entries without explanations', () => {
    const tierWithoutExplanations = {
      tier: 'B',
      tier_name: 'Test Tier',
      entries: [
        {
          name: 'Simple Smaz',
          smaz: {
            id: 'simple-smaz',
            name: 'Simple Smaz',
            slug: 'simple-smaz',
          },
        },
      ],
    };
    
    renderWithRouter(<TierRow tier={tierWithoutExplanations} />);
    
    expect(screen.getByTestId('smaz-card')).toBeInTheDocument();
    expect(screen.queryByText(/explanation/)).not.toBeInTheDocument();
  });

  it('shows empty state when no entries', () => {
    const emptyTier = {
      tier: 'D',
      tier_name: 'Empty Tier',
      entries: [],
    };
    
    renderWithRouter(<TierRow tier={emptyTier} />);
    
    expect(screen.getByText('No Smazs in this tier')).toBeInTheDocument();
    expect(screen.getByText('Empty Tier (0 Smazs)')).toBeInTheDocument();
  });

  it('handles singular vs plural Smaz count correctly', () => {
    const singleEntryTier = {
      tier: 'S',
      tier_name: 'Single Entry',
      entries: [mockTier.entries[0]],
    };
    
    renderWithRouter(<TierRow tier={singleEntryTier} />);
    
    expect(screen.getByText('Single Entry (1 Smaz)')).toBeInTheDocument();
  });

  it('starts S-tier accordion open by default', () => {
    renderWithRouter(<TierRow tier={mockTier} />);
    
    const accordion = screen.getByTestId('accordion');
    expect(accordion).toHaveAttribute('data-start-open', 'true');
  });

  it('starts non-S-tier accordions closed by default', () => {
    const aTier = { ...mockTier, tier: 'A' };
    renderWithRouter(<TierRow tier={aTier} />);
    
    const accordion = screen.getByTestId('accordion');
    expect(accordion).toHaveAttribute('data-start-open', 'false');
  });

  it('returns null when tier prop is missing', () => {
    const { container } = renderWithRouter(<TierRow tier={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('handles missing entries array gracefully', () => {
    const tierWithoutEntries = {
      tier: 'C',
      tier_name: 'No Entries',
    };
    
    renderWithRouter(<TierRow tier={tierWithoutEntries} />);
    
    expect(screen.getByText('No Entries (0 Smazs)')).toBeInTheDocument();
    expect(screen.getByText('No Smazs in this tier')).toBeInTheDocument();
  });

  it('applies responsive grid layout', () => {
    renderWithRouter(<TierRow tier={mockTier} />);
    
    const gridContainer = screen.getAllByTestId('smaz-card')[0].closest('.grid');
    expect(gridContainer).toHaveClass(
      'grid',
      'grid-cols-1',
      'sm:grid-cols-2',
      'md:grid-cols-3',
      'lg:grid-cols-4',
      'xl:grid-cols-5',
      'gap-4'
    );
  });
});