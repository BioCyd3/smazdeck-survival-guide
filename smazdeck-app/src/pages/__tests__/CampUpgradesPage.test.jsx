import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { vi } from 'vitest';
import CampUpgradesPage from '../CampUpgradesPage';
import * as dataHelpers from '../../lib/data-helpers';

// Mock the data helpers
vi.mock('../../lib/data-helpers', () => ({
  loadCampUpgrades: vi.fn(),
}));

// Mock the useDebounce hook
vi.mock('../../hooks/useDebounce', () => ({
  default: vi.fn((value) => value),
}));

const mockCampUpgradesData = {
  camp_upgrades: [
    {
      level: 'C10',
      requirements: ['Squad 1 Lv9', 'Armigo Hut Lv9'],
    },
    {
      level: 'C11',
      requirements: ['Field Lab 1 Lv10', 'Power Plant Lv10'],
    },
    {
      level: 'C12',
      requirements: ['Hospital 1 Lv11', 'Hatchery Lv11'],
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

describe('CampUpgradesPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    dataHelpers.loadCampUpgrades.mockImplementation(() => new Promise(() => {}));
    
    renderWithHelmet(<CampUpgradesPage />);
    
    expect(screen.getByText('Loading camp upgrades...')).toBeInTheDocument();
  });

  it('renders camp upgrades data after loading', async () => {
    dataHelpers.loadCampUpgrades.mockResolvedValue(mockCampUpgradesData);
    
    renderWithHelmet(<CampUpgradesPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Camp Upgrades')).toBeInTheDocument();
    });

    expect(screen.getByText('C10')).toBeInTheDocument();
    expect(screen.getByText('C11')).toBeInTheDocument();
    expect(screen.getByText('C12')).toBeInTheDocument();
    expect(screen.getByText('Squad 1 Lv9')).toBeInTheDocument();
    expect(screen.getByText('Field Lab 1 Lv10')).toBeInTheDocument();
  });

  it('renders error state when loading fails', async () => {
    dataHelpers.loadCampUpgrades.mockRejectedValue(new Error('Failed to load'));
    
    renderWithHelmet(<CampUpgradesPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Failed to load camp upgrades data')).toBeInTheDocument();
    });

    expect(screen.getByText('Try Again')).toBeInTheDocument();
  });

  it('filters camp upgrades based on search term', async () => {
    dataHelpers.loadCampUpgrades.mockResolvedValue(mockCampUpgradesData);
    
    renderWithHelmet(<CampUpgradesPage />);
    
    await waitFor(() => {
      expect(screen.getByText('C10')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search by camp level or building requirements...');
    fireEvent.change(searchInput, { target: { value: 'C10' } });

    expect(screen.getByText('C10')).toBeInTheDocument();
    expect(screen.queryByText('C11')).not.toBeInTheDocument();
    expect(screen.queryByText('C12')).not.toBeInTheDocument();
  });

  it('shows no results message when search yields no matches', async () => {
    dataHelpers.loadCampUpgrades.mockResolvedValue(mockCampUpgradesData);
    
    renderWithHelmet(<CampUpgradesPage />);
    
    await waitFor(() => {
      expect(screen.getByText('C10')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search by camp level or building requirements...');
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });

    expect(screen.getByText('No camp upgrades found matching "nonexistent"')).toBeInTheDocument();
  });

  it('displays all camp upgrade information correctly', async () => {
    dataHelpers.loadCampUpgrades.mockResolvedValue(mockCampUpgradesData);
    
    renderWithHelmet(<CampUpgradesPage />);
    
    await waitFor(() => {
      expect(screen.getByText('C10')).toBeInTheDocument();
    });

    // Check that all sections are rendered
    expect(screen.getAllByText('Requirements')).toHaveLength(3);

    // Check specific content
    expect(screen.getByText('Armigo Hut Lv9')).toBeInTheDocument();
    expect(screen.getByText('Power Plant Lv10')).toBeInTheDocument();
    expect(screen.getByText('Hospital 1 Lv11')).toBeInTheDocument();
  });

  it('handles empty camp upgrades data gracefully', async () => {
    dataHelpers.loadCampUpgrades.mockResolvedValue({ camp_upgrades: [] });
    
    renderWithHelmet(<CampUpgradesPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Camp Upgrades')).toBeInTheDocument();
    });

    expect(screen.getByText('No camp upgrades available')).toBeInTheDocument();
  });

  it('sets correct SEO meta tags', async () => {
    dataHelpers.loadCampUpgrades.mockResolvedValue(mockCampUpgradesData);
    
    renderWithHelmet(<CampUpgradesPage />);
    
    await waitFor(() => {
      expect(document.title).toBe('Camp Upgrades - Smazdeck Survival Guide');
    });

    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription?.getAttribute('content')).toContain('camp upgrade requirements in Smazdeck Survival');
  });
});