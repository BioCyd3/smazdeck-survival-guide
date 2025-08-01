import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { DataComparison, StatComparison } from './DataComparison';
import { useResponsive } from '../../hooks/useResponsive';

// Mock the useResponsive hook
vi.mock('../../hooks/useResponsive');

// Mock data for testing
const mockData = [
  {
    id: 1,
    name: 'Fluff Static',
    tier: 'S',
    damage: 208,
    skills: 2,
    image: '/images/smazs/fluff-static.png',
    description: 'Electric-type Smaz with high damage output',
    details: 'Excellent for DPS roles with strong ascension effects'
  },
  {
    id: 2,
    name: 'Lendanear',
    tier: 'A',
    damage: 325,
    skills: 3,
    image: '/images/smazs/lendanear.png',
    description: 'Healing-focused Smaz with support abilities',
    details: 'Great for support roles and team sustainability'
  },
  {
    id: 3,
    name: 'Test Smaz',
    tier: 'B',
    damage: 150,
    skills: 1,
    image: '/images/smazs/test-smaz.png',
    description: 'Basic Smaz for testing purposes',
    details: 'Simple abilities suitable for beginners'
  }
];

const mockColumns = [
  { key: 'name', header: 'Name', primary: true },
  { key: 'tier', header: 'Tier', showInMobile: true },
  { key: 'damage', header: 'Damage', showInMobile: true },
  { key: 'skills', header: 'Skills', showInMobile: false },
  { key: 'description', header: 'Description', showInMobile: false }
];

const mockStats = [
  { key: 'damage', label: 'Damage', higherIsBetter: true },
  { key: 'skills', label: 'Skills', higherIsBetter: true },
  { key: 'tier', label: 'Tier' }
];

describe('DataComparison', () => {
  beforeEach(() => {
    useResponsive.mockReturnValue({
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      below: vi.fn(() => false),
      getGridCols: vi.fn(() => 3)
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Desktop Layout', () => {
    it('renders data comparison table on desktop', () => {
      render(
        <DataComparison
          data={mockData}
          columns={mockColumns}
          title="Smaz Comparison"
          description="Compare different Smazs"
        />
      );

      expect(screen.getByText('Smaz Comparison')).toBeInTheDocument();
      expect(screen.getByText('Compare different Smazs')).toBeInTheDocument();
      expect(screen.getByText('Fluff Static')).toBeInTheDocument();
      expect(screen.getByText('Lendanear')).toBeInTheDocument();
    });

    it('enables comparison mode when compareMode is true', () => {
      render(
        <DataComparison
          data={mockData}
          columns={mockColumns}
          compareMode={true}
        />
      );

      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes.length).toBeGreaterThan(0);
    });

    it('handles sorting when sortable is enabled', async () => {
      const mockOnSort = vi.fn();
      render(
        <DataComparison
          data={mockData}
          columns={mockColumns}
          onSort={mockOnSort}
        />
      );

      // Click on a sortable column header
      const nameHeader = screen.getByText('Name');
      fireEvent.click(nameHeader);

      await waitFor(() => {
        expect(mockOnSort).toHaveBeenCalled();
      });
    });
  });

  describe('Mobile Layout', () => {
    beforeEach(() => {
      useResponsive.mockReturnValue({
        isMobile: true,
        isTablet: false,
        isDesktop: false,
        below: vi.fn(() => true),
        getGridCols: vi.fn(() => 1)
      });
    });

    it('renders mobile card layout on mobile devices', () => {
      render(
        <DataComparison
          data={mockData}
          columns={mockColumns}
          title="Smaz Comparison"
        />
      );

      expect(screen.getByText('Smaz Comparison')).toBeInTheDocument();
      expect(screen.getByText('Fluff Static')).toBeInTheDocument();
      
      // Should show progressive disclosure cards instead of table
      const expandButtons = screen.getAllByRole('button');
      expect(expandButtons.length).toBeGreaterThan(0);
    });

    it('shows limited items initially with show more button', () => {
      render(
        <DataComparison
          data={mockData}
          columns={mockColumns}
          maxMobileItems={2}
        />
      );

      // Should show "Show more" button if there are more items than maxMobileItems
      if (mockData.length > 2) {
        expect(screen.getByText(/Show \d+ more items/)).toBeInTheDocument();
      }
    });

    it('expands to show all items when show more is clicked', async () => {
      render(
        <DataComparison
          data={mockData}
          columns={mockColumns}
          maxMobileItems={1}
        />
      );

      const showMoreButton = screen.getByText(/Show \d+ more items/);
      fireEvent.click(showMoreButton);

      await waitFor(() => {
        expect(screen.getByText('Test Smaz')).toBeInTheDocument();
      });
    });

    it('handles comparison mode on mobile', () => {
      render(
        <DataComparison
          data={mockData}
          columns={mockColumns}
          compareMode={true}
        />
      );

      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes.length).toBeGreaterThan(0);
    });
  });

  describe('Data Processing', () => {
    it('applies filtering when filterBy is provided', () => {
      const filterFn = (item) => item.tier === 'S';
      
      render(
        <DataComparison
          data={mockData}
          columns={mockColumns}
          filterBy={filterFn}
        />
      );

      expect(screen.getByText('Fluff Static')).toBeInTheDocument();
      expect(screen.queryByText('Lendanear')).not.toBeInTheDocument();
    });

    it('groups data when groupBy is provided', () => {
      render(
        <DataComparison
          data={mockData}
          columns={mockColumns}
          groupBy="tier"
        />
      );

      expect(screen.getByText('S')).toBeInTheDocument();
      expect(screen.getByText('A')).toBeInTheDocument();
      expect(screen.getByText('B')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('calls onItemClick when item is clicked', async () => {
      const mockOnItemClick = vi.fn();
      
      render(
        <DataComparison
          data={mockData}
          columns={mockColumns}
          onItemClick={mockOnItemClick}
        />
      );

      const firstRow = screen.getByText('Fluff Static').closest('tr');
      fireEvent.click(firstRow);

      await waitFor(() => {
        expect(mockOnItemClick).toHaveBeenCalledWith(
          expect.objectContaining({ name: 'Fluff Static' }),
          0
        );
      });
    });

    it('calls onCompare when items are selected for comparison', async () => {
      const mockOnCompare = vi.fn();
      
      render(
        <DataComparison
          data={mockData}
          columns={mockColumns}
          compareMode={true}
          onCompare={mockOnCompare}
        />
      );

      const checkboxes = screen.getAllByRole('checkbox');
      fireEvent.click(checkboxes[1]); // Skip the "select all" checkbox

      await waitFor(() => {
        expect(mockOnCompare).toHaveBeenCalled();
      });
    });
  });
});

describe('StatComparison', () => {
  beforeEach(() => {
    useResponsive.mockReturnValue({
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      below: vi.fn(() => false),
      getGridCols: vi.fn(() => 3)
    });
  });

  it('renders stat comparison table on desktop', () => {
    render(
      <StatComparison
        items={mockData}
        stats={mockStats}
        title="Stat Comparison"
      />
    );

    expect(screen.getByText('Stat Comparison')).toBeInTheDocument();
    expect(screen.getByText('Damage')).toBeInTheDocument();
    expect(screen.getByText('Skills')).toBeInTheDocument();
  });

  it('highlights best values when highlightBest is true', () => {
    render(
      <StatComparison
        items={mockData}
        stats={mockStats}
        highlightBest={true}
      />
    );

    // The highest damage value (325) should be highlighted
    const highestDamage = screen.getByText('325');
    expect(highestDamage).toHaveClass('text-amber-400');
  });

  it('renders mobile layout with progressive disclosure', () => {
    useResponsive.mockReturnValue({
      isMobile: true,
      isTablet: false,
      isDesktop: false,
      below: vi.fn(() => true),
      getGridCols: vi.fn(() => 1)
    });

    render(
      <StatComparison
        items={mockData}
        stats={mockStats}
        title="Stat Comparison"
      />
    );

    expect(screen.getByText('Stat Comparison')).toBeInTheDocument();
    
    // Should show progressive disclosure cards
    const expandButtons = screen.getAllByRole('button');
    expect(expandButtons.length).toBeGreaterThan(0);
  });

  it('handles empty data gracefully', () => {
    render(
      <StatComparison
        items={[]}
        stats={mockStats}
        title="Empty Comparison"
      />
    );

    expect(screen.getByText('No data available for comparison')).toBeInTheDocument();
  });

  it('formats values using custom format functions', () => {
    const customStats = [
      { 
        key: 'damage', 
        label: 'Damage', 
        format: (value) => `${value} DMG`,
        higherIsBetter: true 
      }
    ];

    render(
      <StatComparison
        items={mockData}
        stats={customStats}
      />
    );

    expect(screen.getByText('208 DMG')).toBeInTheDocument();
    expect(screen.getByText('325 DMG')).toBeInTheDocument();
  });
});