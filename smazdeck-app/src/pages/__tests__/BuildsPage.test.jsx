import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { vi } from 'vitest';
import BuildsPage from '../BuildsPage';
import * as dataHelpers from '../../lib/data-helpers';

// Mock the data helpers
vi.mock('../../lib/data-helpers', () => ({
  loadBuilds: vi.fn(),
}));

// Mock the useDebounce hook
vi.mock('../../hooks/useDebounce', () => ({
  default: vi.fn((value) => value),
}));

const mockBuildsData = {
  best_battle_builds: [
    {
      role: 'DPS (Backline-Ranged)',
      examples: ['Lucidina', 'Mantleray', 'Fingenue'],
      primary_traits: [
        'Belligerent (Attack 7%)',
        'Fortunate (Crit Rate 5%)',
        'Ruthless (Crit Damage 8%)',
      ],
      substitutes: ['Robust (HP 7%)'],
    },
    {
      role: 'Pure Tank or Support',
      examples: ['Dolphriend', 'Fulgairy', 'Statchew'],
      primary_traits: [
        'Robust (HP 7%)',
        'Steadfast (Def 7%)',
        'Unyielding (Tenacity 5%)',
      ],
      substitutes: ['Elusive (Evade 5%)'],
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

describe('BuildsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    dataHelpers.loadBuilds.mockImplementation(() => new Promise(() => {}));
    
    renderWithHelmet(<BuildsPage />);
    
    expect(screen.getByText('Loading builds...')).toBeInTheDocument();
    expect(screen.getByText('Loading builds...')).toBeInTheDocument();
  });

  it('renders builds data after loading', async () => {
    dataHelpers.loadBuilds.mockResolvedValue(mockBuildsData);
    
    renderWithHelmet(<BuildsPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Battle Builds')).toBeInTheDocument();
    });

    expect(screen.getByText('DPS (Backline-Ranged)')).toBeInTheDocument();
    expect(screen.getByText('Pure Tank or Support')).toBeInTheDocument();
    expect(screen.getByText('Lucidina')).toBeInTheDocument();
    expect(screen.getByText('Belligerent (Attack 7%)')).toBeInTheDocument();
  });

  it('renders error state when loading fails', async () => {
    dataHelpers.loadBuilds.mockRejectedValue(new Error('Failed to load'));
    
    renderWithHelmet(<BuildsPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Failed to load builds data')).toBeInTheDocument();
    });

    expect(screen.getByText('Try Again')).toBeInTheDocument();
  });

  it('filters builds based on search term', async () => {
    dataHelpers.loadBuilds.mockResolvedValue(mockBuildsData);
    
    renderWithHelmet(<BuildsPage />);
    
    await waitFor(() => {
      expect(screen.getByText('DPS (Backline-Ranged)')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search builds by role, Smaz examples, or traits...');
    fireEvent.change(searchInput, { target: { value: 'DPS' } });

    expect(screen.getByText('DPS (Backline-Ranged)')).toBeInTheDocument();
    expect(screen.queryByText('Pure Tank or Support')).not.toBeInTheDocument();
  });

  it('shows no results message when search yields no matches', async () => {
    dataHelpers.loadBuilds.mockResolvedValue(mockBuildsData);
    
    renderWithHelmet(<BuildsPage />);
    
    await waitFor(() => {
      expect(screen.getByText('DPS (Backline-Ranged)')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search builds by role, Smaz examples, or traits...');
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });

    expect(screen.getByText('No builds found matching "nonexistent"')).toBeInTheDocument();
  });

  it('displays all build information correctly', async () => {
    dataHelpers.loadBuilds.mockResolvedValue(mockBuildsData);
    
    renderWithHelmet(<BuildsPage />);
    
    await waitFor(() => {
      expect(screen.getByText('DPS (Backline-Ranged)')).toBeInTheDocument();
    });

    // Check that all sections are rendered
    expect(screen.getAllByText('Example Smazs')).toHaveLength(2);
    expect(screen.getAllByText('Primary Traits')).toHaveLength(2);
    expect(screen.getAllByText('Substitute Traits')).toHaveLength(2);

    // Check specific content
    expect(screen.getByText('Mantleray')).toBeInTheDocument();
    expect(screen.getByText('Fortunate (Crit Rate 5%)')).toBeInTheDocument();
    expect(screen.getAllByText('Robust (HP 7%)')).toHaveLength(2); // Appears in both builds
  });

  it('handles empty builds data gracefully', async () => {
    dataHelpers.loadBuilds.mockResolvedValue({ best_battle_builds: [] });
    
    renderWithHelmet(<BuildsPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Battle Builds')).toBeInTheDocument();
    });

    expect(screen.getByText('No builds available')).toBeInTheDocument();
  });

  it('sets correct SEO meta tags', async () => {
    dataHelpers.loadBuilds.mockResolvedValue(mockBuildsData);
    
    renderWithHelmet(<BuildsPage />);
    
    await waitFor(() => {
      expect(document.title).toBe('Battle Builds - Smazdeck Survival Guide');
    });

    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription?.getAttribute('content')).toContain('battle builds for Smazdeck Survival');
  });
});