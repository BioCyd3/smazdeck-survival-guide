import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import SearchBar from '../components/common/SearchBar';
import useDebounce from '../hooks/useDebounce';
import { loadBuilds } from '../lib/data-helpers';

const BuildsPage = () => {
  const [builds, setBuilds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const fetchBuilds = async () => {
      try {
        setLoading(true);
        const buildsData = await loadBuilds();
        setBuilds(buildsData.best_battle_builds || []);
      } catch (err) {
        setError('Failed to load builds data');
        console.error('Error loading builds:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBuilds();
  }, []);

  // Filter builds based on search term
  const filteredBuilds = builds.filter(build =>
    build.role.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
    build.examples.some(example =>
      example.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    ) ||
    build.primary_traits.some(trait =>
      trait.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    )
  );

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Helmet>
          <title>Battle Builds - Smazdeck Survival Guide</title>
          <meta name="description" content="Loading battle builds..." />
        </Helmet>
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-400 mx-auto"></div>
          <p className="mt-4 text-slate-400">Loading builds...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Helmet>
          <title>Battle Builds - Smazdeck Survival Guide</title>
          <meta name="description" content="Error loading battle builds" />
        </Helmet>
        <div className="text-center">
          <p className="text-red-400 text-xl">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Battle Builds - Smazdeck Survival Guide</title>
        <meta
          name="description"
          content="Discover the best battle builds for Smazdeck Survival. Learn optimal trait combinations and strategies for different roles including DPS, Tank, and Hybrid builds."
        />
        <meta name="keywords" content="smazdeck, battle builds, traits, DPS, tank, hybrid, strategy" />
      </Helmet>

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-100 mb-4">Battle Builds</h1>
        <p className="text-slate-300 text-lg">
          Discover the best battle builds and trait combinations for different roles in Smazdeck Survival.
          Each build is optimized for specific playstyles and team compositions.
        </p>
      </div>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placeholder="Search builds by role, Smaz examples, or traits..."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
        {filteredBuilds.length > 0 ? (
          filteredBuilds.map((build, index) => (
            <BuildCard key={index} build={build} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-slate-400 text-xl">
              {debouncedSearchTerm
                ? `No builds found matching "${debouncedSearchTerm}"`
                : 'No builds available'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const BuildCard = React.memo(({ build }) => {
  return (
    <Card className="hover:border-amber-500 transition-colors">
      <div className="space-y-4">
        {/* Role Header */}
        <div className="border-b border-slate-600 pb-3">
          <h2 className="text-2xl font-bold text-amber-400 mb-2">{build.role}</h2>
        </div>

        {/* Example Smazs */}
        <div>
          <h3 className="text-lg font-semibold text-slate-200 mb-2">Example Smazs</h3>
          <div className="flex flex-wrap gap-2">
            {build.examples.map((example, index) => (
              <Badge key={index} variant="secondary" className="text-sm">
                {example}
              </Badge>
            ))}
          </div>
        </div>

        {/* Primary Traits */}
        <div>
          <h3 className="text-lg font-semibold text-slate-200 mb-2">Primary Traits</h3>
          <div className="grid gap-2 sm:grid-cols-2">
            {build.primary_traits.map((trait, index) => (
              <Badge key={index} variant="primary" className="text-sm justify-start">
                {trait}
              </Badge>
            ))}
          </div>
        </div>

        {/* Substitute Traits */}
        {build.substitutes && build.substitutes.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-slate-200 mb-2">Substitute Traits</h3>
            <div className="flex flex-wrap gap-2">
              {build.substitutes.map((substitute, index) => (
                <Badge key={index} variant="tier" className="text-sm">
                  {substitute}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
});

BuildCard.displayName = 'BuildCard';

export default BuildsPage;