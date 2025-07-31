import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 mt-auto" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-bold text-lg mb-2">Smazdeck Survival</h3>
            <p className="text-sm mb-4 text-amber-400 font-medium">
              Master the Meta. Dominate the Game.
            </p>
            <p className="text-xs text-slate-500">
              Your ultimate guide to competitive Smazdeck Survival gameplay, 
              featuring comprehensive tier lists, character guides, and strategic insights.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="text-white font-semibold text-sm mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="/smazdex" 
                  className="hover:text-amber-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-sm"
                >
                  Smazdex
                </a>
              </li>
              <li>
                <a 
                  href="/tier-lists" 
                  className="hover:text-amber-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-sm"
                >
                  Tier Lists
                </a>
              </li>
              <li>
                <a 
                  href="/builds" 
                  className="hover:text-amber-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-sm"
                >
                  Builds
                </a>
              </li>
              <li>
                <a 
                  href="/mechanics/camp-upgrades" 
                  className="hover:text-amber-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-sm"
                >
                  Game Mechanics
                </a>
              </li>
            </ul>
          </div>

          {/* Resources & Links */}
          <div className="text-center md:text-left">
            <h4 className="text-white font-semibold text-sm mb-3">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="https://github.com/yourusername/smazdeck-survival-guide" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-sm inline-flex items-center gap-1"
                  aria-label="View source code on GitHub (opens in new tab)"
                >
                  <svg 
                    className="w-4 h-4" 
                    fill="currentColor" 
                    viewBox="0 0 24 24" 
                    aria-hidden="true"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub Repository
                </a>
              </li>
              <li>
                <a 
                  href="https://store.steampowered.com/app/1623730/Palworld/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-sm inline-flex items-center gap-1"
                  aria-label="View Palworld on Steam (opens in new tab)"
                >
                  <svg 
                    className="w-4 h-4" 
                    fill="currentColor" 
                    viewBox="0 0 24 24" 
                    aria-hidden="true"
                  >
                    <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.62 20.51 6.363 24 11.979 24c6.624 0 11.979-5.354 11.979-11.979C23.958 5.354 18.603.001 11.979.001zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54z"/>
                  </svg>
                  Official Game
                </a>
              </li>
              <li>
                <a 
                  href="https://palworld.wiki.gg/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-sm inline-flex items-center gap-1"
                  aria-label="Visit Palworld Wiki (opens in new tab)"
                >
                  <svg 
                    className="w-4 h-4" 
                    fill="currentColor" 
                    viewBox="0 0 24 24" 
                    aria-hidden="true"
                  >
                    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.632 1.499-.4-.131-.932-.16-1.379-.16-1.478 0-2.642.479-2.642 1.07 0 .422.418.81 1.084 1.015.67.206 1.55.333 2.379.333.83 0 1.709-.127 2.379-.333.666-.205 1.084-.593 1.084-1.015 0-.591-1.164-1.07-2.642-1.07-.447 0-.979.029-1.379.16 1.152-.867 2.808-1.429 4.632-1.499l-.8-3.747-2.597.547a1.25 1.25 0 0 1-2.498-.056c0-.688.562-1.249 1.25-1.249z"/>
                  </svg>
                  Community Wiki
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-8 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500">
            <div className="mb-2 sm:mb-0">
              <p>
                &copy; {currentYear} Smazdeck Survival Guide. All rights reserved.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span>Built with React & Vite</span>
              <span>•</span>
              <span>Deployed on GitHub Pages</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
