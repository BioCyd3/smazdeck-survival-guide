import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { vi } from 'vitest';
import TechTreePage from '../TechTreePage';
import * as dataHelpers from '../../lib/data-helpers';

// Mock the data helpers
vi.mock('../../lib/data-helpers', () => ({
  loadTechTreeBuffs: vi.fn(),
}));

// Mock the useDebounce hook
vi.mock('../../hooks/useDebounce', () => ({
  default: vi.fn((value) => value),
}));

const mockTechTreeData = {
  tech_tree_buffs: {
    growth: {
      Smazmon_building_and_research: {
        job_efficiency_bonus: '20.0%',
        time_reduction: '-10m',
        upgrade_speed: '20.0%',
      },
      elemental_production: {
        description: 'Water / Earth / Fire / Electric',
        bonus: '15.0%',
        output: '15.0%',
      },
    },
    all_Smazmon: {
      damage: '5.0%',
      atk_def_hp: '5.0%',
    },
    armigo_training: {
      harvest_speed: '50.0%',
      lumber_steel: '25.0%',
      gold: '20.0%',
    },
  },
};

const renderWithHelmet = (component) => {
  return render(
    <HelmetProvider>
      {component}
    </HelmetProvider>
  );
};

describe('TechTreePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    dataHelpers.loadTechTreeBuffs.mockImplementation(() => new Promise(() => {}));
    
    renderWithHelmet(<TechTreePage />);
    
    expect(screen.getByText('Loading tech tree buffs...')).toBeInTheDocument();
  });

  it('renders tech tree data after loading', async () => {
    dataHelpers.loadTechTreeBuffs.mockResolvedValue(mockTechTreeData);
    
    renderWithHelmet(<TechTreePage />);
    
    await waitFor(() => {
      expect(screen.getByText('Tech Tree Buffs')).toBeInTheDocument();
    });

    expect(screen.getByText('growth')).toBeInTheDocument();
    expect(screen.getByText('all Smazmon')).toBeInTheDocument();
    expect(screen.getByText('armigo training')).toBeInTheDocument();
    expect(screen.getByText('Smazmon building and research')).toBeInTheDocument();
  });

  it('renders error state when loading fails', async () => {
    dataHelpers.loadTechTreeBuffs.mockRejectedValue(new Error('Failed to load'));
    
    renderWithHelmet(<TechTreePage />);
    
    await waitFor(() => {
      expect(screen.getByText('Failed to load tech tree data')).toBeInTheDocument();
    });

    expect(screen.getByText('Try Again')).toBeInTheDocument();
  });

  it('filters tech tree buffs based on search term', async () => {
    dataHelpers.loadTechTreeBuffs.mockResolvedValue(mockTechTreeData);
    
    renderWithHelmet(<TechTreePage />);
    
    await waitFor(() => {
      expect(screen.getByText('growth')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search tech tree buffs by category or effect...');
    fireEvent.change(searchInput, { target: { value: 'growth' } });

    expect(screen.getByText('growth')).toBeInTheDocument();
    expect(screen.queryByText('all Smazmon')).not.toBeInTheDocument();
    expect(screen.queryByText('armigo training')).not.toBeInTheDocument();
  });

  it('shows no results message when search yields no matches', async () => {
    dataHelpers.loadTechTreeBuffs.mockResolvedValue(mockTechTreeData);
    
    renderWithHelmet(<TechTreePage />);
    
    await waitFor(() => {
      expect(screen.getByText('growth')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search tech tree buffs by category or effect...');
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });

    expect(screen.getByText('No tech tree buffs found matching "nonexistent"')).toBeInTheDocument();
  });

  it('displays tech tree buff information correctly', async () => {
    dataHelpers.loadTechTreeBuffs.mockResolvedValue(mockTechTreeData);
    
    renderWithHelmet(<TechTreePage />);
    
    await waitFor(() => {
      expect(screen.getByText('growth')).toBeInTheDocument();
    });

    // Check specific content
    expect(screen.getAllByText('20.0%')).toHaveLength(3); // Multiple 20.0% values exist
    expect(screen.getByText('-10m')).toBeInTheDocument();
    expect(screen.getByText(/job efficiency bonus/i)).toBeInTheDocument();
    expect(screen.getByText(/time reduction/i)).toBeInTheDocument();
  });

  it('handles different data types correctly', async () => {
    dataHelpers.loadTechTreeBuffs.mockResolvedValue(mockTechTreeData);
    
    renderWithHelmet(<TechTreePage />);
    
    await waitFor(() => {
      expect(screen.getByText('growth')).toBeInTheDocument();
    });

    // Check that simple string values are displayed (multiple 5.0% values exist)
    expect(screen.getAllByText('5.0%')).toHaveLength(2);
    
    // Check that object values are displayed with key-value pairs
    expect(screen.getByText('harvest speed')).toBeInTheDocument();
    expect(screen.getByText('50.0%')).toBeInTheDocument();
  });

  it('handles empty tech tree data gracefully', async () => {
    dataHelpers.loadTechTreeBuffs.mockResolvedValue({ tech_tree_buffs: {} });
    
    renderWithHelmet(<TechTreePage />);
    
    await waitFor(() => {
      expect(screen.getByText('Tech Tree Buffs')).toBeInTheDocument();
    });

    expect(screen.getByText('No tech tree buffs available')).toBeInTheDocument();
  });

  it('sets correct SEO meta tags', async () => {
    dataHelpers.loadTechTreeBuffs.mockResolvedValue(mockTechTreeData);
    
    renderWithHelmet(<TechTreePage />);
    
    await waitFor(() => {
      expect(document.title).toBe('Tech Tree Buffs - Smazdeck Survival Guide');
    });

    const metaDescription = document.querySelector('meta[name="description"]');
    expect(document.title).toBe('Tech Tree Buffs - Smazdeck Survival Guide');
  });
});