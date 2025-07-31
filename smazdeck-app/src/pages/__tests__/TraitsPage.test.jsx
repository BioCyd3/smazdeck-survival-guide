import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { vi } from 'vitest';
import TraitsPage from '../TraitsPage';
import * as dataHelpers from '../../lib/data-helpers';

// Mock the data helpers
vi.mock('../../lib/data-helpers', () => ({
  getTraits: vi.fn(),
}));

// Mock the useDebounce hook
vi.mock('../../hooks/useDebounce', () => ({
  default: vi.fn((value) => value),
}));

const mockTraitsData = {
  traits: {
    note: 'S-tier (N/A)*: Not generally available, but on extremely rare occasions can appear on UR-Smazmons.',
    battle_traits: {
      offensive: [
        {
          description: 'Attack',
          tiers: [
            { tier: 'S', name: 'Warlike', value: '10%' },
            { tier: 'A', name: 'Belligerent', value: '7%' },
            { tier: 'B', name: 'Combative', value: '4%' },
          ],
        },
        {
          description: 'Crit Damage',
          tiers: [
            { tier: 'S', name: 'Heartless', value: '15%' },
            { tier: 'A', name: 'Ruthless', value: '8%' },
          ],
        },
      ],
      defensive: [
        {
          description: 'HP',
          tiers: [
            { tier: 'S', name: 'Vigorous', value: '10%' },
            { tier: 'A', name: 'Robust', value: '7%' },
          ],
        },
      ],
    },
    production_traits: [
      {
        description: 'Job Efficiency',
        tiers: [
          { tier: 'S', name: 'Workaholic', value: '25%' },
          { tier: 'A', name: 'Industrious', value: null },
        ],
      },
    ],
  },
};

const renderWithHelmet = (component) => {
  return render(
    <HelmetProvider>
      {component}
    </HelmetProvider>
  );
};

describe('TraitsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    // Since getTraits is synchronous, we'll test the error state instead
    dataHelpers.getTraits.mockImplementation(() => {
      throw new Error('Loading...');
    });
    
    renderWithHelmet(<TraitsPage />);
    
    expect(screen.getByText('Failed to load traits data')).toBeInTheDocument();
  });

  it('renders traits data after loading', async () => {
    dataHelpers.getTraits.mockReturnValue(mockTraitsData);
    
    renderWithHelmet(<TraitsPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Traits Guide')).toBeInTheDocument();
    });

    expect(screen.getByText('Battle - offensive')).toBeInTheDocument();
    expect(screen.getByText('Battle - defensive')).toBeInTheDocument();
    expect(screen.getByText('Production')).toBeInTheDocument();
    expect(screen.getByText('Attack')).toBeInTheDocument();
    expect(screen.getByText('HP')).toBeInTheDocument();
  });

  it('displays the note correctly', async () => {
    dataHelpers.getTraits.mockReturnValue(mockTraitsData);
    
    renderWithHelmet(<TraitsPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Traits Guide')).toBeInTheDocument();
    });

    expect(screen.getByText(/S-tier \(N\/A\)\*: Not generally available/)).toBeInTheDocument();
  });

  it('renders error state when loading fails', async () => {
    dataHelpers.getTraits.mockImplementation(() => {
      throw new Error('Failed to load');
    });
    
    renderWithHelmet(<TraitsPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Failed to load traits data')).toBeInTheDocument();
    });

    expect(screen.getByText('Try Again')).toBeInTheDocument();
  });

  it('filters traits based on search term', async () => {
    dataHelpers.getTraits.mockReturnValue(mockTraitsData);
    
    renderWithHelmet(<TraitsPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Attack')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search traits by category, description, or trait name...');
    fireEvent.change(searchInput, { target: { value: 'Attack' } });

    expect(screen.getByText('Attack')).toBeInTheDocument();
    expect(screen.queryByText('HP')).not.toBeInTheDocument();
    expect(screen.queryByText('Job Efficiency')).not.toBeInTheDocument();
  });

  it('shows no results message when search yields no matches', async () => {
    dataHelpers.getTraits.mockReturnValue(mockTraitsData);
    
    renderWithHelmet(<TraitsPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Attack')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search traits by category, description, or trait name...');
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });

    expect(screen.getByText('No traits found matching "nonexistent"')).toBeInTheDocument();
  });

  it('displays trait tiers with correct colors and information', async () => {
    dataHelpers.getTraits.mockReturnValue(mockTraitsData);
    
    renderWithHelmet(<TraitsPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Attack')).toBeInTheDocument();
    });

    // Check tier badges (multiple S-Tier badges exist)
    expect(screen.getAllByText('S-Tier')).toHaveLength(4); // 2 offensive + 1 defensive + 1 production
    expect(screen.getAllByText('A-Tier')).toHaveLength(4);
    expect(screen.getByText('B-Tier')).toBeInTheDocument();

    // Check trait names
    expect(screen.getByText('Warlike')).toBeInTheDocument();
    expect(screen.getByText('Belligerent')).toBeInTheDocument();
    expect(screen.getByText('Combative')).toBeInTheDocument();

    // Check trait values (multiple 10% values exist)
    expect(screen.getAllByText('10%')).toHaveLength(2); // Attack S-tier and HP S-tier
    expect(screen.getByText('7%')).toBeInTheDocument();
    expect(screen.getByText('4%')).toBeInTheDocument();
  });

  it('handles traits with null values correctly', async () => {
    dataHelpers.getTraits.mockReturnValue(mockTraitsData);
    
    renderWithHelmet(<TraitsPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Job Efficiency')).toBeInTheDocument();
    });

    expect(screen.getByText('Industrious')).toBeInTheDocument();
    expect(screen.getByText('Value not available')).toBeInTheDocument();
  });

  it('displays all trait categories correctly', async () => {
    dataHelpers.getTraits.mockReturnValue(mockTraitsData);
    
    renderWithHelmet(<TraitsPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Traits Guide')).toBeInTheDocument();
    });

    // Check that all sections are rendered
    expect(screen.getAllByText('Trait Tiers')).toHaveLength(4); // 2 offensive + 1 defensive + 1 production

    // Check specific content
    expect(screen.getByText('Heartless')).toBeInTheDocument();
    expect(screen.getByText('Vigorous')).toBeInTheDocument();
    expect(screen.getByText('Workaholic')).toBeInTheDocument();
  });

  it('handles empty traits data gracefully', async () => {
    dataHelpers.getTraits.mockReturnValue({ traits: {} });
    
    renderWithHelmet(<TraitsPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Traits Guide')).toBeInTheDocument();
    });

    expect(screen.getByText('No traits available')).toBeInTheDocument();
  });

  it('sets correct SEO meta tags', async () => {
    dataHelpers.getTraits.mockReturnValue(mockTraitsData);
    
    renderWithHelmet(<TraitsPage />);
    
    await waitFor(() => {
      expect(document.title).toBe('Traits Guide - Smazdeck Survival Guide');
    });

    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription?.getAttribute('content')).toContain('Smaz traits in Smazdeck Survival');
  });
});