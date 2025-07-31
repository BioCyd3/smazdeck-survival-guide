import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import SearchBar from '../components/common/SearchBar';
import useDebounce from '../hooks/useDebounce';
import { loadTechTreeBuffs } from '../lib/data-helpers';

const TechTreePage = () => {
  const [techTreeData, setTechTreeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const fetchTechTreeData = async () => {
      try {
        setLoading(true);
        const data = await loadTechTreeBuffs();
        setTechTreeData(data.tech_tree_buffs || {});
      } catch (err) {
        setError('Failed to load tech tree data');
        console.error('Error loading tech tree:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTechTreeData();
  }, []);

  // Convert tech tree data to searchable format
  const getSearchableBuffs = () => {
    if (!techTreeData) return [];
    
    const buffs = [];
    Object.entries(techTreeData).forEach(([category, categoryData]) => {
      if (typeof categoryData === 'object' && categoryData !== null) {
        Object.entries(categoryData).forEach(([buffName, buffData]) => {
          buffs.push({
            category,
            name: buffName,
            data: buffData,
          });
        });
      }
    });
    return buffs;
  };

  // Filter buffs based on search term
  const filteredBuffs = getSearchableBuffs().filter(buff =>
    buff.category.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
    buff.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
    (typeof buff.data === 'string' && buff.data.toLowerCase().includes(debouncedSearchTerm.toLowerCase())) ||
    (typeof buff.data === 'object' && buff.data !== null && 
     Object.values(buff.data).some(value => 
       typeof value === 'string' && value.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
     ))
  );

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Helmet>
          <title>Tech Tree Buffs - Smazdeck Survival Guide</title>
          <meta name="description" content="Loading tech tree buffs..." />
        </Helmet>
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-400 mx-auto"></div>
          <p className="mt-4 text-slate-400">Loading tech tree buffs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Helmet>
          <title>Tech Tree Buffs - Smazdeck Survival Guide</title>
          <meta name="description" content="Error loading tech tree buffs" />
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
        <title>Tech Tree Buffs - Smazdeck Survival Guide</title>
        <meta
          name="description"
          content="Complete guide to tech tree buffs and bonuses in Smazdeck Survival. Discover all available research upgrades and their benefits."
        />
        <meta name="keywords" content="smazdeck, tech tree, buffs, research, bonuses, upgrades" />
      </Helmet>

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-100 mb-4">Tech Tree Buffs</h1>
        <p className="text-slate-300 text-lg">
          Comprehensive guide to all tech tree research buffs and bonuses. Plan your research priorities
          to maximize your camp's efficiency and combat effectiveness.
        </p>
      </div>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placeholder="Search tech tree buffs by category or effect..."
      />

      <div className="space-y-6">
        {filteredBuffs.length > 0 ? (
          // Group by category
          Object.entries(
            filteredBuffs.reduce((acc, buff) => {
              if (!acc[buff.category]) acc[buff.category] = [];
              acc[buff.category].push(buff);
              return acc;
            }, {})
          ).map(([category, buffs]) => (
            <TechTreeCategorySection key={category} category={category} buffs={buffs} />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-400 text-xl">
              {debouncedSearchTerm
                ? `No tech tree buffs found matching "${debouncedSearchTerm}"`
                : 'No tech tree buffs available'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const TechTreeCategorySection = React.memo(({ category, buffs }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-amber-400 capitalize border-b border-slate-600 pb-2">
        {category.replace(/_/g, ' ')}
      </h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {buffs.map((buff, index) => (
          <TechTreeBuffCard key={`${buff.category}-${buff.name}-${index}`} buff={buff} />
        ))}
      </div>
    </div>
  );
});

const TechTreeBuffCard = React.memo(({ buff }) => {
  const renderBuffData = (data) => {
    if (typeof data === 'string') {
      return (
        <Badge variant="primary" className="text-sm">
          {data}
        </Badge>
      );
    }

    if (typeof data === 'object' && data !== null) {
      return (
        <div className="space-y-2">
          {Object.entries(data).map(([key, value]) => (
            <div key={key} className="flex justify-between items-center">
              <span className="text-slate-300 text-sm capitalize">
                {key.replace(/_/g, ' ')}:
              </span>
              <Badge variant="secondary" className="text-xs">
                {value || 'N/A'}
              </Badge>
            </div>
          ))}
        </div>
      );
    }

    return (
      <Badge variant="tier" className="text-sm">
        {data || 'N/A'}
      </Badge>
    );
  };

  return (
    <Card className="hover:border-amber-500 transition-colors">
      <div className="space-y-3">
        {/* Buff Name Header */}
        <div className="border-b border-slate-600 pb-3">
          <h3 className="text-lg font-semibold text-slate-200 capitalize">
            {buff.name.replace(/_/g, ' ')}
          </h3>
        </div>

        {/* Buff Effects */}
        <div>
          {renderBuffData(buff.data)}
        </div>
      </div>
    </Card>
  );
});

TechTreeCategorySection.displayName = 'TechTreeCategorySection';
TechTreeBuffCard.displayName = 'TechTreeBuffCard';

export default TechTreePage;