import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../Footer';

describe('Footer Component', () => {
  describe('Basic Rendering', () => {
    test('renders footer with proper role', () => {
      render(<Footer />);
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    test('renders site branding and motto', () => {
      render(<Footer />);
      expect(screen.getByText('Smazdeck Survival')).toBeInTheDocument();
      expect(screen.getByText('Master the Meta. Dominate the Game.')).toBeInTheDocument();
    });

    test('renders site description', () => {
      render(<Footer />);
      expect(screen.getByText(/your ultimate guide to competitive smazdeck survival/i)).toBeInTheDocument();
    });

    test('renders current year in copyright', () => {
      render(<Footer />);
      const currentYear = new Date().getFullYear();
      expect(screen.getByText(new RegExp(`© ${currentYear} Smazdeck Survival Guide`))).toBeInTheDocument();
    });
  });

  describe('Navigation Links', () => {
    test('renders all quick navigation links', () => {
      render(<Footer />);
      
      expect(screen.getByRole('link', { name: /smazdex/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /tier lists/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /builds/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /game mechanics/i })).toBeInTheDocument();
    });

    test('navigation links have correct href attributes', () => {
      render(<Footer />);
      
      expect(screen.getByRole('link', { name: /smazdex/i })).toHaveAttribute('href', '/smazdex');
      expect(screen.getByRole('link', { name: /tier lists/i })).toHaveAttribute('href', '/tier-lists');
      expect(screen.getByRole('link', { name: /builds/i })).toHaveAttribute('href', '/builds');
      expect(screen.getByRole('link', { name: /game mechanics/i })).toHaveAttribute('href', '/mechanics/camp-upgrades');
    });

    test('navigation links have proper hover and focus styles', () => {
      render(<Footer />);
      
      const smazdexLink = screen.getByRole('link', { name: /smazdex/i });
      expect(smazdexLink).toHaveClass('hover:text-amber-400', 'focus:ring-2', 'focus:ring-amber-400');
    });
  });

  describe('External Resource Links', () => {
    test('renders GitHub repository link', () => {
      render(<Footer />);
      
      const githubLink = screen.getByRole('link', { name: /view source code on github/i });
      expect(githubLink).toBeInTheDocument();
      expect(githubLink).toHaveAttribute('target', '_blank');
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    test('renders official game link', () => {
      render(<Footer />);
      
      const gameLink = screen.getByRole('link', { name: /view palworld on steam/i });
      expect(gameLink).toBeInTheDocument();
      expect(gameLink).toHaveAttribute('target', '_blank');
      expect(gameLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    test('renders community wiki link', () => {
      render(<Footer />);
      
      const wikiLink = screen.getByRole('link', { name: /visit palworld wiki/i });
      expect(wikiLink).toBeInTheDocument();
      expect(wikiLink).toHaveAttribute('target', '_blank');
      expect(wikiLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    test('external links have proper security attributes', () => {
      render(<Footer />);
      
      const externalLinks = screen.getAllByRole('link').filter(link => 
        link.getAttribute('target') === '_blank'
      );
      
      externalLinks.forEach(link => {
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });
  });

  describe('Accessibility', () => {
    test('external links have descriptive aria-labels', () => {
      render(<Footer />);
      
      expect(screen.getByLabelText(/view source code on github.*opens in new tab/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/view palworld on steam.*opens in new tab/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/visit palworld wiki.*opens in new tab/i)).toBeInTheDocument();
    });

    test('icons have proper aria-hidden attributes', () => {
      render(<Footer />);
      
      const icons = screen.getByRole('contentinfo').querySelectorAll('svg[aria-hidden="true"]');
      expect(icons.length).toBeGreaterThan(0);
      
      icons.forEach(icon => {
        expect(icon).toHaveAttribute('aria-hidden', 'true');
      });
    });

    test('links have proper focus styles for keyboard navigation', () => {
      render(<Footer />);
      
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toHaveClass('focus:outline-none', 'focus:ring-2');
      });
    });
  });

  describe('Responsive Layout', () => {
    test('has responsive grid classes', () => {
      render(<Footer />);
      
      const footerContent = screen.getByRole('contentinfo').querySelector('.grid');
      expect(footerContent).toHaveClass('grid-cols-1', 'md:grid-cols-3');
    });

    test('has responsive text alignment classes', () => {
      render(<Footer />);
      
      const brandSection = screen.getByText('Smazdeck Survival').closest('div');
      expect(brandSection).toHaveClass('text-center', 'md:text-left');
    });

    test('bottom bar has responsive flex layout', () => {
      render(<Footer />);
      
      // Find the parent flex container that has the responsive classes
      const bottomBarContainer = screen.getByText(/© \d{4} Smazdeck Survival Guide/i).closest('.flex');
      expect(bottomBarContainer).toHaveClass('flex-col', 'sm:flex-row');
    });
  });

  describe('Visual Design', () => {
    test('has proper background and text colors', () => {
      render(<Footer />);
      
      const footer = screen.getByRole('contentinfo');
      expect(footer).toHaveClass('bg-slate-900', 'text-slate-400');
    });

    test('brand title has proper styling', () => {
      render(<Footer />);
      
      const brandTitle = screen.getByText('Smazdeck Survival');
      expect(brandTitle).toHaveClass('text-white', 'font-bold', 'text-lg');
    });

    test('motto has accent color styling', () => {
      render(<Footer />);
      
      const motto = screen.getByText('Master the Meta. Dominate the Game.');
      expect(motto).toHaveClass('text-amber-400', 'font-medium');
    });

    test('section headings have proper styling', () => {
      render(<Footer />);
      
      const quickLinksHeading = screen.getByText('Quick Links');
      const resourcesHeading = screen.getByText('Resources');
      
      expect(quickLinksHeading).toHaveClass('text-white', 'font-semibold');
      expect(resourcesHeading).toHaveClass('text-white', 'font-semibold');
    });
  });

  describe('Content Structure', () => {
    test('renders proper heading hierarchy', () => {
      render(<Footer />);
      
      expect(screen.getByRole('heading', { level: 3, name: 'Smazdeck Survival' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 4, name: 'Quick Links' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 4, name: 'Resources' })).toBeInTheDocument();
    });

    test('renders technology stack information', () => {
      render(<Footer />);
      
      expect(screen.getByText('Built with React & Vite')).toBeInTheDocument();
      expect(screen.getByText('Deployed on GitHub Pages')).toBeInTheDocument();
    });

    test('has proper spacing and layout structure', () => {
      render(<Footer />);
      
      const footer = screen.getByRole('contentinfo');
      const container = footer.querySelector('.max-w-7xl');
      expect(container).toHaveClass('mx-auto', 'px-4', 'sm:px-6', 'lg:px-8', 'py-8');
    });
  });
});