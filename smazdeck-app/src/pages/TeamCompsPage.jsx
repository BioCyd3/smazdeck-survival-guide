import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import SearchBar from '../components/common/SearchBar';
import useDebounce from '../hooks/useDebounce';
import { loadTeamComps } from '../lib/data-helpers';

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
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-400 mx-auto"></div>
          <p className="mt-4 text-slate-400">Loading team compositions...</p>
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
        <title>Team Compositions - Smazdeck Survival Guide</title>
        <meta
          name="description"
          content="Discover effective team compositions for Smazdeck Survival. Learn strategic combinations, role explanations, and synergies for competitive play."
        />
        <meta name="keywords" content="smazdeck, team compositions, strategy, synergy, competitive, tactics" />
      </Helmet>

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-100 mb-4">Team Compositions</h1>
        <p className="text-slate-300 text-lg">
          Explore proven team compositions and strategic combinations for competitive Smazdeck Survival.
          Each composition includes detailed explanations of roles, synergies, and tactical approaches.
        </p>
      </div>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placeholder="Search team compositions by name, strategy, or Smaz names..."
      />

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