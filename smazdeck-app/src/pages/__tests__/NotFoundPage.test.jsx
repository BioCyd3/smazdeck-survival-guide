import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import NotFoundPage from '../NotFoundPage';
import * as dataHelpers from '../../lib/data-helpers';

// Mock the data helpers
vi.mock('../../lib/data-helpers', () => ({
  getAllSmazs: vi.fn()
}));

// Mock react-router-dom navigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

// Helper function to render NotFoundPage with required providers
const renderNotFoundPage = () => {
  return render(
    <HelmetProvider>
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    </HelmetProvider>
  );
};

// Mock Smaz data
const mockSmazs = [
  { id: 'smaz-1', name: 'Fire Dragon', skills: [{ skill_name: 'Flame Breath' }] },
  { id: 'smaz-2', name: 'Water Turtle', skills: [{ skill_name: 'Hydro Pump' }, { skill_name: 'Shell Defense' }] },
  { id: 'smaz-3', name: 'Lightning Bird', skills: [{ skill_name: 'Thunder Strike' }] },
];

describe('NotFoundPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    dataHelpers.getAllSmazs.mockReturnValue(mockSmazs);
  });

  describe('Basic Rendering', () => {
    test('renders 404 heading and error message', () => {
      renderNotFoundPage();
      
      expect(screen.getByRole('heading', { level: 1, name: '404' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2, name: 'Page Not Found' })).toBeInTheDocument();
      expect(screen.getByText(/the page you're looking for doesn't exist/i)).toBeInTheDocument();
    });

    test('renders search section', () => {
      renderNotFoundPage();
      
      expect(screen.getByRole('heading', { level: 3, name: 'Search for Smazs' })).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/search for smazs by name/i)).toBeInTheDocument();
    });

    test('renders popular pages section', () => {
      renderNotFoundPage();
      
      expect(screen.getByRole('heading', { level: 3, name: 'Popular Pages' })).toBeInTheDocument();
      // Check for popular page cards by their descriptions
      expect(screen.getByText('Browse all Smazs and their abilities')).toBeInTheDocument();
      expect(screen.getByText('View competitive rankings')).toBeInTheDocument();
      expect(screen.getByText('Discover effective battle builds')).toBeInTheDocument();
    });

    test('renders action buttons', () => {
      renderNotFoundPage();
      
      expect(screen.getByRole('link', { name: /go to homepage/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /go back/i })).toBeInTheDocument();
    });
  });

  describe('SEO Meta Tags', () => {
    test('sets proper page title', async () => {
      renderNotFoundPage();
      
      await waitFor(() => {
        expect(document.title).toBe('404 - Page Not Found | Smazdeck Survival Guide');
      });
    });

    test('sets proper meta description', async () => {
      renderNotFoundPage();
      
      await waitFor(() => {
        const metaDescription = document.querySelector('meta[name="description"]');
        expect(metaDescription).toHaveAttribute('content', expect.stringContaining('page you\'re looking for doesn\'t exist'));
      });
    });

    test('sets noindex robots meta tag', async () => {
      renderNotFoundPage();
      
      await waitFor(() => {
        const robotsMeta = document.querySelector('meta[name="robots"]');
        expect(robotsMeta).toHaveAttribute('content', 'noindex, nofollow');
      });
    });
  });

  describe('Search Functionality', () => {
    test('displays search results when searching for Smazs', async () => {
      const user = userEvent.setup();
      renderNotFoundPage();
      
      const searchInput = screen.getByPlaceholderText(/search for smazs by name/i);
      await user.type(searchInput, 'Fire');
      
      await waitFor(() => {
        expect(screen.getByText('Found 1 Smaz:')).toBeInTheDocument();
        expect(screen.getByText('Fire Dragon')).toBeInTheDocument();
      });
    });

    test('displays multiple search results', async () => {
      const user = userEvent.setup();
      renderNotFoundPage();
      
      const searchInput = screen.getByPlaceholderText(/search for smazs by name/i);
      await user.type(searchInput, 'a'); // Should match multiple Smazs
      
      await waitFor(() => {
        expect(screen.getByText(/Found \d+ Smazs?:/)).toBeInTheDocument();
      });
    });

    test('displays no results message when no Smazs match', async () => {
      const user = userEvent.setup();
      renderNotFoundPage();
      
      const searchInput = screen.getByPlaceholderText(/search for smazs by name/i);
      await user.type(searchInput, 'NonexistentSmaz');
      
      await waitFor(() => {
        expect(screen.getByText(/no smazs found matching "nonexistentsmaz"/i)).toBeInTheDocument();
      });
    });

    test('clears search results when search term is empty', async () => {
      const user = userEvent.setup();
      renderNotFoundPage();
      
      const searchInput = screen.getByPlaceholderText(/search for smazs by name/i);
      
      // Type and then clear
      await user.type(searchInput, 'Fire');
      await waitFor(() => {
        expect(screen.getByText('Fire Dragon')).toBeInTheDocument();
      });
      
      await user.clear(searchInput);
      await waitFor(() => {
        expect(screen.queryByText('Fire Dragon')).not.toBeInTheDocument();
      });
    });

    test('navigates to Smaz profile when search result is clicked', async () => {
      const user = userEvent.setup();
      renderNotFoundPage();
      
      const searchInput = screen.getByPlaceholderText(/search for smazs by name/i);
      await user.type(searchInput, 'Fire');
      
      await waitFor(() => {
        expect(screen.getByText('Fire Dragon')).toBeInTheDocument();
      });
      
      const smazButton = screen.getByRole('button', { name: /fire dragon/i });
      await user.click(smazButton);
      
      expect(mockNavigate).toHaveBeenCalledWith('/smazdex/smaz-1');
    });

    test('handles search errors gracefully', async () => {
      const user = userEvent.setup();
      dataHelpers.getAllSmazs.mockImplementation(() => {
        throw new Error('Data loading error');
      });
      
      renderNotFoundPage();
      
      const searchInput = screen.getByPlaceholderText(/search for smazs by name/i);
      await user.type(searchInput, 'Fire');
      
      // Should not crash and should not show results
      await waitFor(() => {
        expect(screen.queryByText('Fire Dragon')).not.toBeInTheDocument();
      });
    });
  });

  describe('Popular Pages Navigation', () => {
    test('popular page links have correct href attributes', () => {
      renderNotFoundPage();
      
      // Find links by their text content within the popular pages section
      const popularSection = screen.getByRole('heading', { level: 3, name: 'Popular Pages' }).closest('div');
      const smazdexLink = within(popularSection).getByText('Smazdex').closest('a');
      const tierListsLink = within(popularSection).getByText('Tier Lists').closest('a');
      const buildsLink = within(popularSection).getByText('Builds').closest('a');
      const teamCompsLink = within(popularSection).getByText('Team Compositions').closest('a');
      const mechanicsLink = within(popularSection).getByText('Game Mechanics').closest('a');
      
      expect(smazdexLink).toHaveAttribute('href', '/smazdex');
      expect(tierListsLink).toHaveAttribute('href', '/tier-lists');
      expect(buildsLink).toHaveAttribute('href', '/builds');
      expect(teamCompsLink).toHaveAttribute('href', '/team-comps');
      expect(mechanicsLink).toHaveAttribute('href', '/mechanics/camp-upgrades');
    });

    test('popular page links have descriptions', () => {
      renderNotFoundPage();
      
      expect(screen.getByText('Browse all Smazs and their abilities')).toBeInTheDocument();
      expect(screen.getByText('View competitive rankings')).toBeInTheDocument();
      expect(screen.getByText('Discover effective battle builds')).toBeInTheDocument();
      expect(screen.getByText('Learn about team synergies')).toBeInTheDocument();
      expect(screen.getByText('Understand game systems')).toBeInTheDocument();
    });
  });

  describe('Action Buttons', () => {
    test('homepage link has correct href', () => {
      renderNotFoundPage();
      
      const homepageLink = screen.getByRole('link', { name: /go to homepage/i });
      expect(homepageLink).toHaveAttribute('href', '/');
    });

    test('go back button exists and has proper attributes', () => {
      renderNotFoundPage();
      
      const backButton = screen.getByRole('button', { name: /go back/i });
      expect(backButton).toBeInTheDocument();
      expect(backButton).toHaveClass('focus:outline-none', 'focus:ring-2');
    });
  });

  describe('Accessibility', () => {
    test('has proper heading hierarchy', () => {
      renderNotFoundPage();
      
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument(); // 404
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument(); // Page Not Found
      expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(2); // Search and Popular Pages
    });

    test('action buttons have proper focus styles', () => {
      renderNotFoundPage();
      
      const homepageLink = screen.getByRole('link', { name: /go to homepage/i });
      const backButton = screen.getByRole('button', { name: /go back/i });
      
      expect(homepageLink).toHaveClass('focus:outline-none', 'focus:ring-2');
      expect(backButton).toHaveClass('focus:outline-none', 'focus:ring-2');
    });
  });

  describe('Responsive Design', () => {
    test('has responsive text sizing for 404 heading', () => {
      renderNotFoundPage();
      
      const heading404 = screen.getByRole('heading', { level: 1, name: '404' });
      expect(heading404).toHaveClass('text-8xl', 'md:text-9xl');
    });
  });

  describe('Visual Design', () => {
    test('404 heading has proper styling', () => {
      renderNotFoundPage();
      
      const heading404 = screen.getByRole('heading', { level: 1, name: '404' });
      expect(heading404).toHaveClass('font-bold', 'text-amber-400');
    });

    test('search results have proper styling', async () => {
      const user = userEvent.setup();
      renderNotFoundPage();
      
      const searchInput = screen.getByPlaceholderText(/search for smazs by name/i);
      await user.type(searchInput, 'Fire');
      
      await waitFor(() => {
        const resultsContainer = screen.getByText('Found 1 Smaz:').closest('.bg-slate-800');
        expect(resultsContainer).toHaveClass('rounded-lg', 'border', 'border-slate-700');
      });
    });
  });
});