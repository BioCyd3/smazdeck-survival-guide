import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { getSmazs } from '../lib/data-helpers';
import SmazCard from '../components/Smaz/SmazCard';
import SearchBar from '../components/common/SearchBar';
import useDebounce from '../hooks/useDebounce';

const SmazdexPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const smazs = useMemo(() => {
    try {
      setIsLoading(true);
      setError(null);
      const data = getSmazs();
      setIsLoading(false);
      return data;
    } catch (err) {
      setError('Failed to load Smazs data. Please try refreshing the page.');
      setIsLoading(false);
      return [];
    }
  }, []);

  const filteredSmazs = useMemo(() => {
    if (!debouncedSearchTerm) {
      return smazs;
    }
    return smazs.filter(smaz =>
      smaz.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [smazs, debouncedSearchTerm]);

  const resultsCount = filteredSmazs.length;
  const totalCount = smazs.length;

  if (error) {
    return (
      <>
        <Helmet>
          <title>Smazdex - Error | Smazdeck Survival Guide</title>
          <meta name="description" content="Error loading Smazdex data" />
        </Helmet>
        <div className="text-center py-12">
          <div className="text-red-400 text-xl mb-4">⚠️ Error</div>
          <p className="text-slate-300 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Retry
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Smazdex - Complete Character Database | Smazdeck Survival Guide</title>
        <meta 
          name="description" 
          content={`Browse all ${totalCount} Smazs with detailed profiles, skills, and ascension effects. Search and discover the perfect characters for your team.`}
        />
        <meta property="og:title" content="Smazdex - Complete Character Database" />
        <meta 
          property="og:description" 
          content="Comprehensive database of all Smazs with detailed information for competitive play" 
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 font-['Exo_2']">
            Smazdex
          </h1>
          <p className="text-slate-300 text-lg mb-6">
            Comprehensive database of all Smazs with detailed profiles, skills, and ascension effects
          </p>
          
          <SearchBar 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm}
            placeholder="Search Smazs by name..."
          />
          
          {/* Results Counter */}
          <div className="flex justify-between items-center mt-4 text-sm text-slate-400">
            <span>
              {searchTerm ? (
                <>Showing {resultsCount} of {totalCount} Smazs</>
              ) : (
                <>Showing all {totalCount} Smazs</>
              )}
            </span>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-amber-400 hover:text-amber-300 transition-colors duration-200"
              >
                Clear search
              </button>
            )}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="text-amber-400 text-xl mb-4">⏳ Loading...</div>
            <p className="text-slate-300">Loading Smazs data...</p>
          </div>
        )}

        {/* No Results State */}
        {!isLoading && searchTerm && resultsCount === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-400 text-xl mb-4">🔍 No Results</div>
            <p className="text-slate-300 mb-4">
              No Smazs found matching "{searchTerm}"
            </p>
            <button
              onClick={() => setSearchTerm('')}
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Show All Smazs
            </button>
          </div>
        )}

        {/* Smazs Grid */}
        {!isLoading && resultsCount > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredSmazs.map(smaz => (
              <SmazCard key={smaz.id} smaz={smaz} />
            ))}
          </div>
        )}

        {/* Empty State for no Smazs at all */}
        {!isLoading && !searchTerm && totalCount === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-400 text-xl mb-4">📭 No Data</div>
            <p className="text-slate-300">
              No Smazs data available. Please check back later.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default SmazdexPage;
