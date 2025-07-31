import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SearchBar from '../components/common/SearchBar';
import { getAllSmazs } from '../lib/data-helpers';

const NotFoundPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  // Handle search functionality
  const handleSearch = (term) => {
    setSearchTerm(term);
    
    if (term.trim() === '') {
      setSearchResults([]);
      return;
    }

    try {
      const allSmazs = getAllSmazs();
      const filteredSmazs = allSmazs.filter(smaz =>
        smaz.name.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(filteredSmazs.slice(0, 5)); // Limit to 5 results
    } catch (error) {
      console.error('Error searching Smazs:', error);
      setSearchResults([]);
    }
  };

  const handleSmazClick = (smazId) => {
    navigate(`/smazdex/${smazId}`);
  };

  const popularPages = [
    { name: 'Smazdex', path: '/smazdex', description: 'Browse all Smazs and their abilities' },
    { name: 'Tier Lists', path: '/tier-lists', description: 'View competitive rankings' },
    { name: 'Builds', path: '/builds', description: 'Discover effective battle builds' },
    { name: 'Team Compositions', path: '/team-comps', description: 'Learn about team synergies' },
    { name: 'Game Mechanics', path: '/mechanics/camp-upgrades', description: 'Understand game systems' },
  ];

  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | Smazdeck Survival Guide</title>
        <meta 
          name="description" 
          content="The page you're looking for doesn't exist. Use our search to find Smazs, guides, and strategies for Smazdeck Survival." 
        />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href={`${window.location.origin}/404`} />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* 404 Header */}
          <div className="text-center mb-12">
            <div className="mb-6">
              <h1 className="text-8xl md:text-9xl font-bold text-amber-400 mb-2 leading-none">
                404
              </h1>
              <div className="w-24 h-1 bg-amber-400 mx-auto mb-6"></div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Page Not Found
            </h2>
            
            <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
              The page you're looking for doesn't exist or has been moved. 
              But don't worry - we can help you find what you need!
            </p>
          </div>

          {/* Search Section */}
          <div className="mb-12">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-white mb-4 text-center">
                Search for Smazs
              </h3>
              
              <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={handleSearch}
                placeholder="Search for Smazs by name..."
                className="mb-4"
              />

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                  <h4 className="text-sm font-medium text-slate-300 mb-3">
                    Found {searchResults.length} Smaz{searchResults.length !== 1 ? 's' : ''}:
                  </h4>
                  <div className="space-y-2">
                    {searchResults.map((smaz) => (
                      <button
                        key={smaz.id}
                        onClick={() => handleSmazClick(smaz.id)}
                        className="w-full text-left p-3 rounded-md bg-slate-700 hover:bg-slate-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-800"
                      >
                        <div className="font-medium text-white">{smaz.name}</div>
                        <div className="text-sm text-slate-400">
                          {smaz.skills?.length || 0} skill{smaz.skills?.length !== 1 ? 's' : ''} available
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {searchTerm && searchResults.length === 0 && (
                <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 text-center">
                  <p className="text-slate-400">
                    No Smazs found matching "{searchTerm}". Try a different search term.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Popular Pages */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-white mb-6 text-center">
              Popular Pages
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularPages.map((page) => (
                <Link
                  key={page.path}
                  to={page.path}
                  className="block p-6 bg-slate-800 rounded-lg border border-slate-700 hover:border-amber-400 hover:bg-slate-750 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900 group"
                >
                  <h4 className="font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors duration-200">
                    {page.name}
                  </h4>
                  <p className="text-sm text-slate-400">
                    {page.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="text-center space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Link
              to="/"
              className="inline-block bg-amber-400 text-slate-900 font-bold py-3 px-6 rounded-lg hover:bg-amber-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              <svg 
                className="w-5 h-5 inline-block mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Go to Homepage
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="inline-block bg-slate-700 text-white font-medium py-3 px-6 rounded-lg hover:bg-slate-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              <svg 
                className="w-5 h-5 inline-block mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Go Back
            </button>
          </div>

          {/* Help Text */}
          <div className="mt-12 text-center">
            <p className="text-sm text-slate-500">
              Still can't find what you're looking for? Try browsing our{' '}
              <Link 
                to="/smazdex" 
                className="text-amber-400 hover:text-amber-300 underline focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-sm"
              >
                complete Smazdex
              </Link>{' '}
              or check out our{' '}
              <Link 
                to="/tier-lists" 
                className="text-amber-400 hover:text-amber-300 underline focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-sm"
              >
                tier lists
              </Link>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
