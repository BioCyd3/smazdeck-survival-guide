import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import SearchBar from '../components/common/SearchBar';
import useDebounce from '../hooks/useDebounce';
import { loadTeamComps } from '../lib/data-helpers';
import Heading from '../components/ui/Heading';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Breadcrumb from '../components/ui/Breadcrumb';

const TeamCompsPage = () => {
  const [teamComps, setTeamComps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const fetchTeamComps = async () => {
      try {
        setLoading(true);
        const teamCompsData = await loadTeamComps();
        setTeamComps(teamCompsData.team_composition_guide || []);
      } catch (err) {
        setError('Failed to load team compositions data');
        console.error('Error loading team compositions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamComps();
  }, []);

  // Filter team compositions based on search term
  const filteredTeamComps = teamComps.filter(comp =>
    comp.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
    comp.strategy_simple.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
    comp.core_Smazs.some(smaz =>
      smaz.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    ) ||
    comp.flex_slots.some(smaz =>
      smaz.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    )
  );

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Helmet>
          <title>Team Compositions - Smazdeck Survival Guide</title>
          <meta name="description" content="Loading team compositions..." />
        </Helmet>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <LoadingSpinner size="lg" className="mb-4" />
            <Heading level={3} variant="subheading" color="accent" className="mb-2">
              Loading Team Compositions
            </Heading>
            <p className="text-slate-400">Fetching strategic team guides...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Helmet>
          <title>Team Compositions - Smazdeck Survival Guide</title>
          <meta name="description" content="Error loading team compositions" />
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
              Failed to Load Team Compositions
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
        <title>Team Compositions - Smazdeck Survival Guide</title>
        <meta
          name="description"
          content="Discover effective team compositions for Smazdeck Survival. Learn strategic combinations, role explanations, and synergies for competitive play."
        />
        <meta name="keywords" content="smazdeck, team compositions, strategy, synergy, competitive, tactics" />
      </Helmet>

      {/* Enhanced Breadcrumb Navigation */}
      <Breadcrumb 
        items={[
          { label: 'Home', href: '/' },
          { label: 'Team Compositions' }
        ]}
        className="mb-6"
      />

      {/* Enhanced Header Section */}
      <div className="text-center mb-12">
        <Heading level={1} variant="display" color="gradient" className="mb-4">
          Team Compositions
        </Heading>
        <p className="text-xl text-slate-300 mb-4 max-w-4xl mx-auto">
          Explore proven team compositions and strategic combinations for competitive Smazdeck Survival
        </p>
        <p className="text-slate-400 max-w-3xl mx-auto">
          Each composition includes detailed explanations of roles, synergies, and tactical approaches 
          to help you dominate the battlefield
        </p>
        
        {/* Team comp stats */}
        <div className="flex justify-center gap-8 mt-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-400">{teamComps.length}</div>
            <div className="text-sm text-slate-400">Team Guides</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{filteredTeamComps.length}</div>
            <div className="text-sm text-slate-400">Filtered Results</div>
          </div>
        </div>
      </div>

      {/* Enhanced Search Section */}
      <Card className="mb-8">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Heading level={3} variant="subheading" color="primary">
              Find Your Strategy
            </Heading>
            <Badge variant="secondary" className="text-xs">
              {teamComps.length} Available
            </Badge>
          </div>
          
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            placeholder="Search team compositions by name, strategy, or Smaz names..."
            className="mb-4"
          />
          
          <p className="text-sm text-slate-400">
            Search through team names, strategies, and Smaz combinations to find the perfect composition for your playstyle
          </p>
        </div>
      </Card>

      <div className="space-y-8">
        {filteredTeamComps.length > 0 ? (
          filteredTeamComps.map((comp, index) => (
            <TeamCompCard key={index} teamComp={comp} />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-400 text-xl">
              {debouncedSearchTerm
                ? `No team compositions found matching "${debouncedSearchTerm}"`
                : 'No team compositions available'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const TeamCompCard = React.memo(({ teamComp }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="hover:border-amber-500 transition-colors">
      <div className="space-y-6">
        {/* Header */}
        <div className="border-b border-slate-600 pb-4">
          <h2 className="text-3xl font-bold text-amber-400 mb-3">{teamComp.name}</h2>
          <p className="text-slate-300 text-lg leading-relaxed">{teamComp.strategy_simple}</p>
        </div>

        {/* Core Smazs */}
        <div>
          <h3 className="text-xl font-semibold text-slate-200 mb-3">Core Smazs</h3>
          <div className="space-y-3">
            {teamComp.core_Smazs.map((smaz, index) => (
              <div key={index} className="bg-slate-700 p-4 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="primary" className="text-sm font-medium">
                    {smaz.name}
                  </Badge>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{smaz.reason}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Flex Slots */}
        <div>
          <h3 className="text-xl font-semibold text-slate-200 mb-3">Flex Slots</h3>
          <div className="grid gap-3 md:grid-cols-2">
            {teamComp.flex_slots.map((smaz, index) => (
              <div key={index} className="bg-slate-700 p-3 rounded-lg">
                <Badge variant="secondary" className="text-sm font-medium mb-2">
                  {smaz.name}
                </Badge>
                <p className="text-slate-300 text-sm leading-relaxed">{smaz.reason}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Example Composition */}
        {teamComp.example_composition && (
          <div>
            <h3 className="text-xl font-semibold text-slate-200 mb-3">Example Formation</h3>
            <div className="bg-slate-700 p-4 rounded-lg">
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {Object.entries(teamComp.example_composition).map(([position, smazName]) => (
                  <div key={position} className="flex items-center space-x-2">
                    <span className="text-slate-400 text-sm capitalize">
                      {position.replace('_', ' ')}:
                    </span>
                    <Badge variant="tier" className="text-xs">
                      {smazName}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Expandable Details */}
        <div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors"
          >
            <span className="font-medium">
              {isExpanded ? 'Hide Details' : 'Show Details'}
            </span>
            <svg
              className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isExpanded && (
            <div className="mt-4 space-y-4">
              {/* Complex Strategy */}
              <div>
                <h4 className="text-lg font-semibold text-slate-200 mb-2">Detailed Strategy</h4>
                <p className="text-slate-300 leading-relaxed">{teamComp.strategy_complex}</p>
              </div>

              {/* Key Traits */}
              {teamComp.key_traits && (
                <div>
                  <h4 className="text-lg font-semibold text-slate-200 mb-2">Key Traits</h4>
                  <div className="space-y-2">
                    {Object.entries(teamComp.key_traits).map(([role, traits]) => (
                      <div key={role} className="bg-slate-700 p-3 rounded-lg">
                        <span className="text-amber-400 font-medium capitalize">{role}: </span>
                        <span className="text-slate-300">{traits}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Weaknesses */}
              {teamComp.weaknesses && (
                <div>
                  <h4 className="text-lg font-semibold text-slate-200 mb-2">Weaknesses</h4>
                  <div className="bg-red-900/20 border border-red-700/50 p-3 rounded-lg">
                    <p className="text-slate-300 leading-relaxed">{teamComp.weaknesses}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
});

TeamCompCard.displayName = 'TeamCompCard';

export default TeamCompsPage;