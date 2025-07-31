import React, { useState, useEffect } from 'react';
import { loadTierList } from '../lib/data-helpers';
import TierRow from '../components/Smaz/TierRow';

const tierListFiles = [
  'overall_battle_tier_list',
  'production_pal_tier_list',
  'pure_dps_tier_list',
  // Add other tier list file names here
];

const TierListsPage = () => {
  const [tierLists, setTierLists] = useState({});

  useEffect(() => {
    const fetchTierLists = async () => {
      const loadedTierLists = {};
      for (const fileName of tierListFiles) {
        const data = await loadTierList(fileName);
        loadedTierLists[fileName] = data;
      }
      setTierLists(loadedTierLists);
    };

    fetchTierLists();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Tier Lists</h1>
      <div className="space-y-8">
        {Object.entries(tierLists).map(([fileName, tierListData]) => (
          <div key={fileName}>
            <h2 className="text-2xl font-bold mb-4 capitalize">
              {fileName.replace(/_/g, ' ')}
            </h2>
            {tierListData.tiers.map(tier => (
              <TierRow key={tier.tier} tier={tier.tier} smazs={tier.smazs} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TierListsPage;
