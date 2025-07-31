import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Header from '../Header';

// Helper function to render Header with Router
const renderHeader = () => {
  return render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
};

describe('Header Component', () => {
  describe('Basic Rendering', () => {
    test('renders the site logo/title', () => {
      renderHeader();
      expect(screen.getByRole('link', { name: /smazdeck survival - home/i })).toBeInTheDocument();
    });

    test('renders all navigation links on desktop', () => {
      renderHeader();
      // Check that navigation links exist (both desktop and mobile versions)
      const smazdexLinks = screen.getAllByRole('link', { name: /smazdex/i });
      const tierListLinks = screen.getAllByRole('link', { name: /tier lists/i });
      const buildsLinks = screen.getAllByRole('link', { name: /builds/i });
      const teamCompsLinks = screen.getAllByRole('link', { name: /team comps/i });
      const mechanicsLinks = screen.getAllByRole('link', { name: /mechanics/i });
      
      expect(smazdexLinks).toHaveLength(2); // Desktop and mobile
      expect(tierListLinks).toHaveLength(2);
      expect(buildsLinks).toHaveLength(2);
      expect(teamCompsLinks).toHaveLength(2);
      expect(mechanicsLinks).toHaveLength(2);
    });

    test('renders skip to content link', () => {
      renderHeader();
      expect(screen.getByRole('link', { name: /skip to main content/i })).toBeInTheDocument();
    });
  });

  describe('Mobile Menu Functionality', () => {
    test('mobile menu button is present', () => {
      renderHeader();
      expect(screen.getByRole('button', { name: /toggle navigation menu/i })).toBeInTheDocument();
    });

    test('mobile menu is initially closed', () => {
      renderHeader();
      const mobileMenu = screen.getByRole('button', { name: /toggle navigation menu/i });
      expect(mobileMenu).toHaveAttribute('aria-expanded', 'false');
    });

    test('clicking mobile menu button opens the menu', async () => {
      const user = userEvent.setup();
      renderHeader();
      
      const menuButton = screen.getByRole('button', { name: /toggle navigation menu/i });
      await user.click(menuButton);
      
      expect(menuButton).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument();
    });

    test('clicking mobile menu button twice closes the menu', async () => {
      const user = userEvent.setup();
      renderHeader();
      
      const menuButton = screen.getByRole('button', { name: /toggle navigation menu/i });
      
      // Open menu
      await user.click(menuButton);
      expect(menuButton).toHaveAttribute('aria-expanded', 'true');
      
      // Close menu
      await user.click(menuButton);
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    });

    test('clicking a mobile navigation link closes the menu', async () => {
      const user = userEvent.setup();
      renderHeader();
      
      const menuButton = screen.getByRole('button', { name: /toggle navigation menu/i });
      
      // Open menu
      await user.click(menuButton);
      expect(menuButton).toHaveAttribute('aria-expanded', 'true');
      
      // Click a navigation link (we need to get all links and find the mobile one)
      const smazdexLinks = screen.getAllByRole('link', { name: /smazdex/i });
      const mobileSmazdexLink = smazdexLinks.find(link => 
        link.closest('#mobile-menu')
      );
      
      if (mobileSmazdexLink) {
        await user.click(mobileSmazdexLink);
        expect(menuButton).toHaveAttribute('aria-expanded', 'false');
      }
    });
  });

  describe('Keyboard Navigation', () => {
    test('mobile menu button responds to Enter key', async () => {
      const user = userEvent.setup();
      renderHeader();
      
      const menuButton = screen.getByRole('button', { name: /toggle navigation menu/i });
      menuButton.focus();
      
      await user.keyboard('{Enter}');
      expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    });

    test('mobile menu button responds to Space key', async () => {
      const user = userEvent.setup();
      renderHeader();
      
      const menuButton = screen.getByRole('button', { name: /toggle navigation menu/i });
      menuButton.focus();
      
      await user.keyboard(' ');
      expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    });

    test('navigation links are focusable', () => {
      renderHeader();
      const smazdexLinks = screen.getAllByRole('link', { name: /smazdex/i });
      const desktopSmazdexLink = smazdexLinks[0]; // First one is desktop
      desktopSmazdexLink.focus();
      expect(desktopSmazdexLink).toHaveFocus();
    });
  });

  describe('Accessibility', () => {
    test('header has proper role', () => {
      renderHeader();
      expect(screen.getByRole('banner')).toBeInTheDocument();
    });

    test('navigation has proper role and label', () => {
      renderHeader();
      expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument();
    });

    test('mobile menu has proper ARIA attributes', () => {
      renderHeader();
      const menuButton = screen.getByRole('button', { name: /toggle navigation menu/i });
      
      expect(menuButton).toHaveAttribute('aria-expanded');
      expect(menuButton).toHaveAttribute('aria-controls', 'mobile-menu');
    });

    test('skip link has proper href', () => {
      renderHeader();
      const skipLink = screen.getByRole('link', { name: /skip to main content/i });
      expect(skipLink).toHaveAttribute('href', '#main-content');
    });

    test('hamburger icons have proper aria-hidden attributes', () => {
      renderHeader();
      // SVG elements with aria-hidden="true"
      const svgElements = screen.getByRole('button', { name: /toggle navigation menu/i })
        .querySelectorAll('svg[aria-hidden="true"]');
      expect(svgElements).toHaveLength(2); // Hamburger and close icons
      svgElements.forEach(svg => {
        expect(svg).toHaveAttribute('aria-hidden', 'true');
      });
    });
  });

  describe('Responsive Design', () => {
    test('desktop navigation is hidden on mobile screens', () => {
      renderHeader();
      // The desktop nav should have 'hidden md:block' classes
      const desktopNav = screen.getByRole('navigation', { name: /main navigation/i })
        .querySelector('.hidden.md\\:block');
      expect(desktopNav).toBeInTheDocument();
    });

    test('mobile menu button is hidden on desktop screens', () => {
      renderHeader();
      // The mobile button should have 'md:hidden' class
      const mobileButton = screen.getByRole('button', { name: /toggle navigation menu/i });
      expect(mobileButton.closest('.md\\:hidden')).toBeInTheDocument();
    });
  });

  describe('Visual States', () => {
    test('navigation links have hover and focus styles', () => {
      renderHeader();
      const smazdexLinks = screen.getAllByRole('link', { name: /smazdex/i });
      const desktopSmazdexLink = smazdexLinks[0]; // First one is desktop
      
      // Check that focus styles are applied (focus:ring classes)
      expect(desktopSmazdexLink).toHaveClass('focus:ring-2', 'focus:ring-amber-400');
    });

    test('mobile menu button has proper styling classes', () => {
      renderHeader();
      const menuButton = screen.getByRole('button', { name: /toggle navigation menu/i });
      
      expect(menuButton).toHaveClass('hover:text-white', 'hover:bg-slate-700');
      expect(menuButton).toHaveClass('focus:ring-2', 'focus:ring-amber-400');
    });
  });
});