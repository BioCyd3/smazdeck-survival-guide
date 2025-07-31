import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import SearchBar from '../components/common/SearchBar';
import useDebounce from '../hooks/useDebounce';
import { getTraits } from '../lib/data-helpers';

const TraitsPage = () => {
  const [traitsData, setTraitsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const fetchTraitsData = async () => {
      try {
        setLoading(true);
        const data = getTraits();
        setTraitsData(data.traits || {});
      } catch (err) {
        setError('Failed to load traits data');
        console.error('Error loading traits:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTraitsData();
  }, []);

  // Convert traits data to searchable format
  const getSearchableTraits = () => {
    if (!traitsData) return [];
    
    const traits = [];
    
    // Process battle traits
    if (traitsData.battle_traits) {
      ['offensive', 'defensive'].forEach(type => {
        if (traitsData.battle_traits[type]) {
          traitsData.battle_traits[type].forEach(trait => {
            traits.push({
              category: `Battle - ${type}`,
              description: trait.description,
              tiers: trait.tiers,
            });
          });
        }
      });
    }
    
    // Process production traits
    if (traitsData.production_traits) {
      traitsData.production_traits.forEach(trait => {
        traits.push({
          category: 'Production',
          description: trait.description,
          tiers: trait.tiers,
        });
      });
    }
    
    return traits;
  };

  // Filter traits based on search term
  const filteredTraits = getSearchableTraits().filter(trait =>
    trait.category.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
    trait.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
    trait.tiers.some(tier =>
      tier.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      (tier.value && tier.value.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
    )
  );

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Helmet>
          <title>Traits Guide - Smazdeck Survival Guide</title>
          <meta name="description" content="Loading traits..." />
        </Helmet>
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-400 mx-auto"></div>
          <p className="mt-4 text-slate-400">Loading traits...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Helmet>
          <title>Traits Guide - Smazdeck Survival Guide</title>
          <meta name="description" content="Error loading traits" />
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
        <title>Traits Guide - Smazdeck Survival Guide</title>
        <meta
          name="description"
          content="Complete guide to Smaz traits in Smazdeck Survival. Learn about battle and production traits, their tiers, and effects for optimal Smaz optimization."
        />
        <meta name="keywords" content="smazdeck, traits, battle traits, production traits, tiers, optimization" />
      </Helmet>

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-100 mb-4">Traits Guide</h1>
        <p className="text-slate-300 text-lg">
          Comprehensive guide to all Smaz traits and their effects. Understanding trait tiers and values
          is crucial for optimizing your Smazs for both battle and production activities.
        </p>
        {traitsData.note && (
          <div className="mt-4 p-4 bg-amber-900/20 border border-amber-700/50 rounded-lg">
            <p className="text-amber-200 text-sm">
              <strong>Note:</strong> {traitsData.note}
            </p>
          </div>
        )}
      </div>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placeholder="Search traits by category, description, or trait name..."
      />

      <div className="space-y-8">
        {filteredTraits.length > 0 ? (
          // Group by category
          Object.entries(
            filteredTraits.reduce((acc, trait) => {
              if (!acc[trait.category]) acc[trait.category] = [];
              acc[trait.category].push(trait);
              return acc;
            }, {})
          ).map(([category, traits]) => (
            <TraitCategorySection key={category} category={category} traits={traits} />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-400 text-xl">
              {debouncedSearchTerm
                ? `No traits found matching "${debouncedSearchTerm}"`
                : 'No traits available'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const TraitCategorySection = React.memo(({ category, traits }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-amber-400 border-b border-slate-600 pb-2">
        {category}
      </h2>
      <div className="space-y-6">
        {traits.map((trait, index) => (
          <TraitCard key={`${category}-${trait.description}-${index}`} trait={trait} />
        ))}
      </div>
    </div>
  );
});

const TraitCard = React.memo(({ trait }) => {
  const getTierColor = (tier) => {
    switch (tier) {
      case 'S': return 'bg-red-600 text-white hover:bg-red-500';
      case 'A': return 'bg-violet-600 text-white hover:bg-violet-500';
      case 'B': return 'bg-blue-600 text-white hover:bg-blue-500';
      case 'C': return 'bg-green-600 text-white hover:bg-green-500';
      default: return 'bg-slate-600 text-slate-200 hover:bg-slate-500';
    }
  };

  return (
    <Card className="hover:border-amber-500 transition-colors">
      <div className="space-y-4">
        {/* Trait Description Header */}
        <div className="border-b border-slate-600 pb-3">
          <h3 className="text-xl font-semibold text-slate-200">{trait.description}</h3>
        </div>

        {/* Trait Tiers */}
        <div>
          <h4 className="text-lg font-medium text-slate-300 mb-3">Trait Tiers</h4>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {trait.tiers.map((tier, index) => (
              <div key={index} className="bg-slate-700 p-3 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <Badge 
                    className={`text-xs font-bold ${getTierColor(tier.tier)}`}
                  >
                    {tier.tier}-Tier
                  </Badge>
                  {tier.value && (
                    <Badge variant="primary" className="text-xs">
                      {tier.value}
                    </Badge>
                  )}
                </div>
                <p className="text-slate-200 font-medium text-sm">{tier.name}</p>
                {!tier.value && (
                  <p className="text-slate-400 text-xs mt-1">Value not available</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
});

TraitCategorySection.displayName = 'TraitCategorySection';
TraitCard.displayName = 'TraitCard';

export default TraitsPage;