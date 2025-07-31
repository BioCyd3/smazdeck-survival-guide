import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { vi } from 'vitest';
import TeamCompsPage from '../TeamCompsPage';
import * as dataHelpers from '../../lib/data-helpers';

// Mock the data helpers
vi.mock('../../lib/data-helpers', () => ({
  loadTeamComps: vi.fn(),
}));

// Mock the useDebounce hook
vi.mock('../../hooks/useDebounce', () => ({
  default: vi.fn((value) => value),
}));

const mockTeamCompsData = {
  team_composition_guide: [
    {
      name: 'The Unbreakable Wall',
      strategy_simple: 'Outlast your opponent by being incredibly hard to kill.',
      strategy_complex: 'This composition layers multiple defensive buffs and debuffs to achieve near-invincibility.',
      core_Smazs: [
        {
          name: 'Statchew',
          reason: 'The cornerstone of defense, providing -20% damage taken to the front row.',
        },
        {
          name: 'Platyputz',
          reason: 'Offers personal damage reduction (-20%) and a crucial shield to save allies.',
        },
      ],
      flex_slots: [
        {
          name: 'Dolphriend',
          reason: 'Adds a massive HP pool (+30% from Tidal Guard) and a powerful stun.',
        },
        {
          name: 'Snowkami',
          reason: 'Provides excellent crowd control with Glacial Howl (Freeze).',
        },
      ],
      example_composition: {
        frontline_1: 'Statchew',
        frontline_2: 'Dolphriend',
        backline_1: 'Platyputz',
        backline_2: 'Snowkami',
        backline_3: 'Fingenue',
      },
      key_traits: {
        tanks: 'Robust (HP 7%), Steadfast (Def 7%), Steel Skull (Crit Def 8%)',
        support: 'Defensive traits are prioritized to ensure their survival.',
      },
      weaknesses: 'Susceptible to teams with heavy debuffs, especially defense reduction.',
    },
    {
      name: 'Alpha Strike Nuke Squad',
      strategy_simple: 'Delete the enemy\'s most important Smaz in the first few seconds.',
      strategy_complex: 'This is a hyper-offensive glass cannon strategy.',
      core_Smazs: [
        {
          name: 'Barkplug',
          reason: 'Essential for its team-wide 20% defense reduction.',
        },
      ],
      flex_slots: [
        {
          name: 'Magmolin',
          reason: 'The primary finisher with the highest single-target damage skill.',
        },
      ],
      example_composition: {
        frontline_1: 'Barkplug',
        frontline_2: 'Magmolin',
      },
      key_traits: {
        dps: 'Warlike/Belligerent (Attack), Heartless/Ruthless (Crit Damage)',
      },
      weaknesses: 'Extremely vulnerable to crowd control that can interrupt the combo.',
    },
  ],
};

const renderWithHelmet = (component) => {
  return render(
    <HelmetProvider>
      {component}
    </HelmetProvider>
  );
};

describe('TeamCompsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    dataHelpers.loadTeamComps.mockImplementation(() => new Promise(() => {}));
    
    renderWithHelmet(<TeamCompsPage />);
    
    expect(screen.getByText('Loading team compositions...')).toBeInTheDocument();
  });

  it('renders team compositions data after loading', async () => {
    dataHelpers.loadTeamComps.mockResolvedValue(mockTeamCompsData);
    
    renderWithHelmet(<TeamCompsPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Team Compositions')).toBeInTheDocument();
    });

    expect(screen.getByText('The Unbreakable Wall')).toBeInTheDocument();
    expect(screen.getByText('Alpha Strike Nuke Squad')).toBeInTheDocument();
    expect(screen.getByText('Outlast your opponent by being incredibly hard to kill.')).toBeInTheDocument();
  });

  it('renders error state when loading fails', async () => {
    dataHelpers.loadTeamComps.mockRejectedValue(new Error('Failed to load'));
    
    renderWithHelmet(<TeamCompsPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Failed to load team compositions data')).toBeInTheDocument();
    });

    expect(screen.getByText('Try Again')).toBeInTheDocument();
  });

  it('filters team compositions based on search term', async () => {
    dataHelpers.loadTeamComps.mockResolvedValue(mockTeamCompsData);
    
    renderWithHelmet(<TeamCompsPage />);
    
    await waitFor(() => {
      expect(screen.getByText('The Unbreakable Wall')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search team compositions by name, strategy, or Smaz names...');
    fireEvent.change(searchInput, { target: { value: 'Unbreakable' } });

    expect(screen.getByText('The Unbreakable Wall')).toBeInTheDocument();
    expect(screen.queryByText('Alpha Strike Nuke Squad')).not.toBeInTheDocument();
  });

  it('shows no results message when search yields no matches', async () => {
    dataHelpers.loadTeamComps.mockResolvedValue(mockTeamCompsData);
    
    renderWithHelmet(<TeamCompsPage />);
    
    await waitFor(() => {
      expect(screen.getByText('The Unbreakable Wall')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search team compositions by name, strategy, or Smaz names...');
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });

    expect(screen.getByText('No team compositions found matching "nonexistent"')).toBeInTheDocument();
  });

  it('displays core team composition information correctly', async () => {
    dataHelpers.loadTeamComps.mockResolvedValue(mockTeamCompsData);
    
    renderWithHelmet(<TeamCompsPage />);
    
    await waitFor(() => {
      expect(screen.getByText('The Unbreakable Wall')).toBeInTheDocument();
    });

    // Check that all sections are rendered
    expect(screen.getAllByText('Core Smazs')).toHaveLength(2);
    expect(screen.getAllByText('Flex Slots')).toHaveLength(2);
    expect(screen.getAllByText('Example Formation')).toHaveLength(2);

    // Check specific content
    expect(screen.getAllByText('Statchew')).toHaveLength(2); // Appears in core and formation
    expect(screen.getByText('The cornerstone of defense, providing -20% damage taken to the front row.')).toBeInTheDocument();
    expect(screen.getAllByText('Dolphriend')).toHaveLength(2); // Appears in flex and formation
  });

  it('expands and collapses detailed information', async () => {
    dataHelpers.loadTeamComps.mockResolvedValue(mockTeamCompsData);
    
    renderWithHelmet(<TeamCompsPage />);
    
    await waitFor(() => {
      expect(screen.getByText('The Unbreakable Wall')).toBeInTheDocument();
    });

    // Initially, detailed strategy should not be visible
    expect(screen.queryByText('This composition layers multiple defensive buffs and debuffs to achieve near-invincibility.')).not.toBeInTheDocument();

    // Click show details button
    const showDetailsButtons = screen.getAllByText('Show Details');
    fireEvent.click(showDetailsButtons[0]);

    // Now detailed strategy should be visible
    expect(screen.getByText('This composition layers multiple defensive buffs and debuffs to achieve near-invincibility.')).toBeInTheDocument();
    expect(screen.getByText('Detailed Strategy')).toBeInTheDocument();
    expect(screen.getByText('Key Traits')).toBeInTheDocument();
    expect(screen.getByText('Weaknesses')).toBeInTheDocument();

    // Click hide details button
    fireEvent.click(screen.getByText('Hide Details'));

    // Detailed strategy should be hidden again
    expect(screen.queryByText('This composition layers multiple defensive buffs and debuffs to achieve near-invincibility.')).not.toBeInTheDocument();
  });

  it('displays example formation correctly', async () => {
    dataHelpers.loadTeamComps.mockResolvedValue(mockTeamCompsData);
    
    renderWithHelmet(<TeamCompsPage />);
    
    await waitFor(() => {
      expect(screen.getByText('The Unbreakable Wall')).toBeInTheDocument();
    });

    // Check formation positions (appears in both team compositions)
    expect(screen.getAllByText('frontline 1:')).toHaveLength(2);
    expect(screen.getAllByText('frontline 2:')).toHaveLength(2);
    expect(screen.getByText('backline 1:')).toBeInTheDocument();
  });

  it('handles empty team compositions data gracefully', async () => {
    dataHelpers.loadTeamComps.mockResolvedValue({ team_composition_guide: [] });
    
    renderWithHelmet(<TeamCompsPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Team Compositions')).toBeInTheDocument();
    });

    expect(screen.getByText('No team compositions available')).toBeInTheDocument();
  });

  it('sets correct SEO meta tags', async () => {
    dataHelpers.loadTeamComps.mockResolvedValue(mockTeamCompsData);
    
    renderWithHelmet(<TeamCompsPage />);
    
    await waitFor(() => {
      expect(document.title).toBe('Team Compositions - Smazdeck Survival Guide');
    });

    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription?.getAttribute('content')).toContain('effective team compositions for Smazdeck Survival');
  });
});