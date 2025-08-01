import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TierListMobile from '../TierListMobile';

// Mock SmazCard component
vi.mock('../SmazCard', () => ({
  default: ({ smaz }) => (
    <div data-testid="smaz-card">
      {smaz.name}
    </div>
  )
}));

describe('TierListMobile', () => {
  const mockTierList = {
    title: 'Test Tier List',
    description: 'A test tier list for mobile',
    tiers: [
      {
        tier: 'S',
        tier_name: 'S-Tier: Exceptional',
        entries: [
          {
            name: 'Fire Dragon',
            explanation: 'Excellent damage output',
            smaz: { id: '1', name: 'Fire Dragon', slug: 'fire-dragon' }
          }
        ]
      },
      {
        tier: 'A',
        tier_name: 'A-Tier: Strong',
        entries: [
          {
            name: 'Water Turtle',
            smaz: { id: '2', name: 'Water Turtle', slug: 'water-turtle' }
          }
        ]
      }
    ]
  };

  const mockTierListName = 'Test Tier List';

  it('renders mobile tier list correctly', () => {
    render(<TierListMobile tierList={mockTierList} tierListName={mockTierListName} />);
    
    expect(screen.getByText('Test Tier List')).toBeInTheDocument();
    expect(screen.getByText('A test tier list for mobile')).toBeInTheDocument();
  });

  it('shows tier statistics', () => {
    render(<TierListMobile tierList={mockTierList} tierListName={mockTierListName} />);
    
    expect(screen.getByText('2 tiers')).toBeInTheDocument();
    expect(screen.getByText('2 total entries')).toBeInTheDocument();
  });

  it('renders tier headers correctly', () => {
    render(<TierListMobile tierList={mockTierList} tierListName={mockTierListName} />);
    
    // Use getAllByText since there are multiple S elements (tier badge and legend)
    const sElements = screen.getAllByText('S');
    expect(sElements.length).toBeGreaterThan(0);
    
    expect(screen.getByText('S-Tier: Exceptional')).toBeInTheDocument();
    
    // Check for the specific "Smaz" text (singular form)
    const smazElements = screen.getAllByText('Smaz');
    expect(smazElements.length).toBe(2);
    
    const aElements = screen.getAllByText('A');
    expect(aElements.length).toBeGreaterThan(0);
    
    expect(screen.getByText('A-Tier: Strong')).toBeInTheDocument();
  });

  it('expands S-tier by default', () => {
    render(<TierListMobile tierList={mockTierList} tierListName={mockTierListName} />);
    
    // S-tier should be expanded by default, so Fire Dragon should be visible
    expect(screen.getByText('Fire Dragon')).toBeInTheDocument();
  });

  it('can toggle tier expansion', () => {
    render(<TierListMobile tierList={mockTierList} tierListName={mockTierListName} />);
    
    // A-tier should be collapsed by default
    expect(screen.queryByText('Water Turtle')).not.toBeInTheDocument();
    
    // Click to expand A-tier
    const aTierButton = screen.getByText('A-Tier: Strong').closest('button');
    fireEvent.click(aTierButton);
    
    // Now Water Turtle should be visible
    expect(screen.getByText('Water Turtle')).toBeInTheDocument();
  });

  it('shows tier legend', () => {
    render(<TierListMobile tierList={mockTierList} tierListName={mockTierListName} />);
    
    expect(screen.getByText('Tier Rankings Guide')).toBeInTheDocument();
    expect(screen.getByText('Exceptional - Meta defining')).toBeInTheDocument();
    expect(screen.getByText('Strong - Highly competitive')).toBeInTheDocument();
  });

  it('shows expand/collapse all buttons', () => {
    render(<TierListMobile tierList={mockTierList} tierListName={mockTierListName} />);
    
    expect(screen.getByText('Expand All')).toBeInTheDocument();
    expect(screen.getByText('Collapse All')).toBeInTheDocument();
  });

  it('expands all tiers when Expand All is clicked', () => {
    render(<TierListMobile tierList={mockTierList} tierListName={mockTierListName} />);
    
    // Initially A-tier should be collapsed
    expect(screen.queryByText('Water Turtle')).not.toBeInTheDocument();
    
    // Click Expand All
    const expandAllButton = screen.getByText('Expand All');
    fireEvent.click(expandAllButton);
    
    // Now both tiers should be visible
    expect(screen.getByText('Fire Dragon')).toBeInTheDocument();
    expect(screen.getByText('Water Turtle')).toBeInTheDocument();
  });

  it('collapses all tiers when Collapse All is clicked', () => {
    render(<TierListMobile tierList={mockTierList} tierListName={mockTierListName} />);
    
    // Initially S-tier should be expanded
    expect(screen.getByText('Fire Dragon')).toBeInTheDocument();
    
    // Click Collapse All
    const collapseAllButton = screen.getByText('Collapse All');
    fireEvent.click(collapseAllButton);
    
    // Now no tier content should be visible
    expect(screen.queryByText('Fire Dragon')).not.toBeInTheDocument();
    expect(screen.queryByText('Water Turtle')).not.toBeInTheDocument();
  });

  it('handles empty tier list gracefully', () => {
    render(<TierListMobile tierList={{}} tierListName={mockTierListName} />);
    
    expect(screen.getByText('No tier data available')).toBeInTheDocument();
  });

  it('shows explanations when available', () => {
    render(<TierListMobile tierList={mockTierList} tierListName={mockTierListName} />);
    
    // S-tier is expanded by default, so explanation should be visible
    expect(screen.getByText('Excellent damage output')).toBeInTheDocument();
  });

  it('handles entries without smaz objects', () => {
    const tierListWithoutSmazObjects = {
      title: 'Test Tier List',
      tiers: [
        {
          tier: 'B',
          tier_name: 'B-Tier',
          entries: [
            { name: 'Basic Smaz' }
          ]
        }
      ]
    };
    
    render(<TierListMobile tierList={tierListWithoutSmazObjects} tierListName={mockTierListName} />);
    
    // Find the specific B-tier button (not the one in the legend)
    const bTierButtons = screen.getAllByText('B-Tier');
    const bTierButton = bTierButtons.find(element => element.closest('button'));
    fireEvent.click(bTierButton.closest('button'));
    
    expect(screen.getByText('Basic Smaz')).toBeInTheDocument();
  });
});