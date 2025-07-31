import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import SearchBar from '../components/common/SearchBar';
import useDebounce from '../hooks/useDebounce';
import { loadCampUpgrades } from '../lib/data-helpers';

const CampUpgradesPage = () => {
  const [campUpgrades, setCampUpgrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const fetchCampUpgrades = async () => {
      try {
        setLoading(true);
        const campUpgradesData = await loadCampUpgrades();
        setCampUpgrades(campUpgradesData.camp_upgrades || []);
      } catch (err) {
        setError('Failed to load camp upgrades data');
        console.error('Error loading camp upgrades:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCampUpgrades();
  }, []);

  // Filter camp upgrades based on search term
  const filteredUpgrades = campUpgrades.filter(upgrade =>
    upgrade.level.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
    upgrade.requirements.some(req =>
      req.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    )
  );

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Helmet>
          <title>Camp Upgrades - Smazdeck Survival Guide</title>
          <meta name="description" content="Loading camp upgrades..." />
        </Helmet>
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-400 mx-auto"></div>
          <p className="mt-4 text-slate-400">Loading camp upgrades...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Helmet>
          <title>Camp Upgrades - Smazdeck Survival Guide</title>
          <meta name="description" content="Error loading camp upgrades" />
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
        <title>Camp Upgrades - Smazdeck Survival Guide</title>
        <meta
          name="description"
          content="Complete guide to camp upgrade requirements in Smazdeck Survival. Learn the building prerequisites for each camp level from C10 to C30."
        />
        <meta name="keywords" content="smazdeck, camp upgrades, building requirements, progression, levels" />
      </Helmet>

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-100 mb-4">Camp Upgrades</h1>
        <p className="text-slate-300 text-lg">
          Complete guide to camp upgrade requirements. Each camp level requires specific building upgrades
          to unlock. Plan your progression efficiently with this comprehensive reference.
        </p>
      </div>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placeholder="Search by camp level or building requirements..."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredUpgrades.length > 0 ? (
          filteredUpgrades.map((upgrade, index) => (
            <CampUpgradeCard key={index} upgrade={upgrade} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-slate-400 text-xl">
              {debouncedSearchTerm
                ? `No camp upgrades found matching "${debouncedSearchTerm}"`
                : 'No camp upgrades available'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const CampUpgradeCard = React.memo(({ upgrade }) => {
  return (
    <Card className="hover:border-amber-500 transition-colors">
      <div className="space-y-3">
        {/* Camp Level Header */}
        <div className="text-center border-b border-slate-600 pb-3">
          <h2 className="text-2xl font-bold text-amber-400">{upgrade.level}</h2>
        </div>

        {/* Requirements */}
        <div>
          <h3 className="text-lg font-semibold text-slate-200 mb-2">Requirements</h3>
          <div className="space-y-2">
            {upgrade.requirements.map((requirement, index) => (
              <Badge key={index} variant="secondary" className="text-sm w-full justify-center">
                {requirement}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
});

CampUpgradeCard.displayName = 'CampUpgradeCard';

export default CampUpgradesPage;