import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const linkStyles = {
    base: 'px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-800',
    inactive: 'text-slate-300 hover:bg-slate-700 hover:text-white',
    active: 'bg-slate-900 text-white',
  };

  const mobileLinkStyles = {
    base: 'block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-800',
    inactive: 'text-slate-300 hover:bg-slate-700 hover:text-white',
    active: 'bg-slate-900 text-white',
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleMobileMenu();
    }
  };

  return (
    <>
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-amber-400 text-slate-900 px-4 py-2 z-50 rounded-br-md font-medium focus:outline-none"
      >
        Skip to main content
      </a>
      
      <header className="bg-slate-800 shadow-md" role="banner">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" role="navigation" aria-label="Main navigation">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <NavLink 
                to="/" 
                className="text-white font-bold text-xl hover:text-amber-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-800 rounded-md px-2 py-1"
                aria-label="Smazdeck Survival - Home"
              >
                Smazdeck Survival
              </NavLink>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink
                  to="/smazdex"
                  className={({ isActive }) =>
                    `${linkStyles.base} ${isActive ? linkStyles.active : linkStyles.inactive}`
                  }
                  aria-current={({ isActive }) => isActive ? 'page' : undefined}
                >
                  Smazdex
                </NavLink>
                <NavLink
                  to="/tier-lists"
                  className={({ isActive }) =>
                    `${linkStyles.base} ${isActive ? linkStyles.active : linkStyles.inactive}`
                  }
                  aria-current={({ isActive }) => isActive ? 'page' : undefined}
                >
                  Tier Lists
                </NavLink>
                <NavLink
                  to="/builds"
                  className={({ isActive }) =>
                    `${linkStyles.base} ${isActive ? linkStyles.active : linkStyles.inactive}`
                  }
                  aria-current={({ isActive }) => isActive ? 'page' : undefined}
                >
                  Builds
                </NavLink>
                <NavLink
                  to="/team-comps"
                  className={({ isActive }) =>
                    `${linkStyles.base} ${isActive ? linkStyles.active : linkStyles.inactive}`
                  }
                  aria-current={({ isActive }) => isActive ? 'page' : undefined}
                >
                  Team Comps
                </NavLink>
                <NavLink
                  to="/mechanics/camp-upgrades"
                  className={({ isActive }) =>
                    `${linkStyles.base} ${isActive ? linkStyles.active : linkStyles.inactive}`
                  }
                  aria-current={({ isActive }) => isActive ? 'page' : undefined}
                >
                  Mechanics
                </NavLink>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                onKeyDown={handleKeyDown}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-400 transition-colors duration-200"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label="Toggle navigation menu"
              >
                <span className="sr-only">Open main menu</span>
                {/* Hamburger icon */}
                <svg
                  className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                {/* Close icon */}
                <svg
                  className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <div 
            className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden`}
            id="mobile-menu"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-slate-700 mt-2">
              <NavLink
                to="/smazdex"
                className={({ isActive }) =>
                  `${mobileLinkStyles.base} ${isActive ? mobileLinkStyles.active : mobileLinkStyles.inactive}`
                }
                onClick={closeMobileMenu}
                aria-current={({ isActive }) => isActive ? 'page' : undefined}
              >
                Smazdex
              </NavLink>
              <NavLink
                to="/tier-lists"
                className={({ isActive }) =>
                  `${mobileLinkStyles.base} ${isActive ? mobileLinkStyles.active : mobileLinkStyles.inactive}`
                }
                onClick={closeMobileMenu}
                aria-current={({ isActive }) => isActive ? 'page' : undefined}
              >
                Tier Lists
              </NavLink>
              <NavLink
                to="/builds"
                className={({ isActive }) =>
                  `${mobileLinkStyles.base} ${isActive ? mobileLinkStyles.active : mobileLinkStyles.inactive}`
                }
                onClick={closeMobileMenu}
                aria-current={({ isActive }) => isActive ? 'page' : undefined}
              >
                Builds
              </NavLink>
              <NavLink
                to="/team-comps"
                className={({ isActive }) =>
                  `${mobileLinkStyles.base} ${isActive ? mobileLinkStyles.active : mobileLinkStyles.inactive}`
                }
                onClick={closeMobileMenu}
                aria-current={({ isActive }) => isActive ? 'page' : undefined}
              >
                Team Comps
              </NavLink>
              <NavLink
                to="/mechanics/camp-upgrades"
                className={({ isActive }) =>
                  `${mobileLinkStyles.base} ${isActive ? mobileLinkStyles.active : mobileLinkStyles.inactive}`
                }
                onClick={closeMobileMenu}
                aria-current={({ isActive }) => isActive ? 'page' : undefined}
              >
                Mechanics
              </NavLink>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
