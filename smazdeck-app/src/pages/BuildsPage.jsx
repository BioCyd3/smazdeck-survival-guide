import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import SearchBar from '../components/common/SearchBar';
import useDebounce from '../hooks/useDebounce';
import { loadBuilds } from '../lib/data-helpers';
import Heading from '../components/ui/Heading';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Breadcrumb from '../components/ui/Breadcrumb';

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
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <LoadingSpinner size="lg" className="mb-4" />
            <Heading level={3} variant="subheading" color="accent" className="mb-2">
              Loading Battle Builds
            </Heading>
            <p className="text-slate-400">Fetching optimal build strategies...</p>
          </div>
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
        <div className="min-h-screen flex items-center justify-center">
          <Card className="max-w-md mx-auto text-center p-8">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl"></div>
              <div className="relative text-4xl p-4 bg-slate-800/50 rounded-full border border-red-500/50 inline-block">
                ⚠️
              </div>
            </div>
            
            <Heading level={3} variant="subheading" color="primary" className="mb-4">
              Failed to Load Builds
            </Heading>
            
            <p className="text-slate-300 mb-6 leading-relaxed">{error}</p>
            
            <Button
              onClick={() => window.location.reload()}
              variant="primary"
              size="md"
              className="hover-lift"
            >
              Try Again
            </Button>
          </Card>
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

      {/* Enhanced Breadcrumb Navigation */}
      <Breadcrumb 
        items={[
          { label: 'Home', href: '/' },
          { label: 'Battle Builds' }
        ]}
        className="mb-6"
      />

      {/* Enhanced Header Section */}
      <div className="text-center mb-12">
        <Heading level={1} variant="display" color="gradient" className="mb-4">
          Battle Builds
        </Heading>
        <p className="text-xl text-slate-300 mb-4 max-w-4xl mx-auto">
          Discover the best battle builds and trait combinations for different roles in Smazdeck Survival
        </p>
        <p className="text-slate-400 max-w-3xl mx-auto">
          Each build is optimized for specific playstyles and team compositions, 
          featuring carefully selected traits and example Smazs to guide your strategy
        </p>
        
        {/* Build stats */}
        <div className="flex justify-center gap-8 mt-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-400">{builds.length}</div>
            <div className="text-sm text-slate-400">Build Guides</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{filteredBuilds.length}</div>
            <div className="text-sm text-slate-400">Filtered Results</div>
          </div>
        </div>
      </div>

      {/* Enhanced Search Section */}
      <Card className="mb-8">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Heading level={3} variant="subheading" color="primary">
              Find Your Perfect Build
            </Heading>
            <Badge variant="secondary" className="text-xs">
              {builds.length} Available
            </Badge>
          </div>
          
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            placeholder="Search builds by role, Smaz examples, or traits..."
            className="mb-4"
          />
          
          <p className="text-sm text-slate-400">
            Search through roles, example Smazs, and trait combinations to find the perfect build for your playstyle
          </p>
        </div>
      </Card>

      {/* Enhanced Builds Grid */}
      <div className="grid gap-8 lg:grid-cols-1">
        {filteredBuilds.length > 0 ? (
          filteredBuilds.map((build, index) => (
            <div key={index} className="animate-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <BuildCard build={build} />
            </div>
          ))
        ) : (
          <Card className="text-center py-16">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-slate-500/20 rounded-full blur-xl"></div>
              <div className="relative text-4xl p-4 bg-slate-800/50 rounded-full border border-slate-700 inline-block">
                🔍
              </div>
            </div>
            
            <Heading level={3} variant="subheading" color="muted" className="mb-4">
              {debouncedSearchTerm ? 'No Builds Found' : 'No Builds Available'}
            </Heading>
            
            <p className="text-slate-400 mb-6 max-w-md mx-auto">
              {debouncedSearchTerm
                ? `No builds found matching "${debouncedSearchTerm}". Try adjusting your search terms.`
                : 'No build guides are currently available. Check back later for new content.'}
            </p>
            
            {debouncedSearchTerm && (
              <Button 
                onClick={() => setSearchTerm('')}
                variant="secondary" 
                size="sm"
              >
                Clear Search
              </Button>
            )}
          </Card>
        )}
      </div>
    </div>
  );
};

const BuildCard = React.memo(({ build }) => {
  return (
    <Card className="hover:border-amber-500 transition-all duration-300 hover-lift group overflow-hidden">
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative p-8 space-y-6">
        {/* Enhanced Role Header */}
        <div className="border-b border-slate-600 pb-4">
          <div className="flex items-center justify-between">
            <Heading level={2} variant="heading" color="accent" className="group-hover:text-amber-300 transition-colors duration-300">
              {build.role}
            </Heading>
            <div className="flex items-center gap-2">
              <Badge variant="primary" className="text-xs">
                {build.primary_traits.length} Traits
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {build.examples.length} Examples
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Enhanced Example Smazs */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="text-lg">🎯</div>
                <Heading level={4} variant="subheading" color="primary">
                  Example Smazs
                </Heading>
              </div>
              <div className="flex flex-wrap gap-2">
                {build.examples.map((example, index) => (
                  <Badge key={index} variant="secondary" className="text-sm hover:bg-slate-600 transition-colors">
                    {example}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Substitute Traits */}
            {build.substitutes && build.substitutes.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="text-lg">🔄</div>
                  <Heading level={4} variant="subheading" color="secondary">
                    Substitute Traits
                  </Heading>
                </div>
                <div className="flex flex-wrap gap-2">
                  {build.substitutes.map((substitute, index) => (
                    <Badge key={index} variant="outline" className="text-sm hover:bg-slate-700 transition-colors">
                      {substitute}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div>
            {/* Enhanced Primary Traits */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="text-lg">⚡</div>
                <Heading level={4} variant="subheading" color="primary">
                  Primary Traits
                </Heading>
              </div>
              <div className="space-y-2">
                {build.primary_traits.map((trait, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-amber-500/30 transition-colors">
                    <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                    <span className="text-slate-200 font-medium">{trait}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Build effectiveness indicator */}
        <div className="mt-6 p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Build Effectiveness</span>
            <div className="flex items-center gap-2">
              <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <span className="text-amber-400 font-medium">High</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
});

BuildCard.displayName = 'BuildCard';

export default BuildsPage;