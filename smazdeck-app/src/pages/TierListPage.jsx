import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { getTierLists } from '../lib/data-helpers';
import TierRow from '../components/Smaz/TierRow';
import EnhancedTierRow from '../components/Smaz/EnhancedTierRow';
import TierListControls from '../components/Smaz/TierListControls';
import TierListExport from '../components/Smaz/TierListExport';
import TierListMobile from '../components/Smaz/TierListMobile';

const TierListPage = () => {
  const [tierLists, setTierLists] = useState({});
  const [selectedTierList, setSelectedTierList] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDragMode, setIsDragMode] = useState(false);
  const [modifiedTierList, setModifiedTierList] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Tier list display names mapping
  const tierListDisplayNames = {
    'overall_battle_tier_list': 'Overall Battle Tier List',
    'pure_dps_tier_list': 'Pure DPS Tier List',
    'backline_dps_tier_list': 'Backline DPS Tier List',
    'frontline_hybrid_tier_list': 'Frontline Hybrid Tier List',
    'tank_bruiser_tier_list': 'Tank/Bruiser Tier List',
    'support_debuff_tier_list': 'Support/Debuff Tier List',
    'rage_skill_tier_list': 'Rage Skill Tier List',
    'offensive_battle_trait_tier_list': 'Offensive Battle Traits',
    'defensive_battle_trait_tier_list': 'Defensive Battle Traits',
    'production_pal_tier_list': 'Production Pal Tier List',
  };

  useEffect(() => {
    const fetchTierLists = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const loadedTierLists = await getTierLists();
        setTierLists(loadedTierLists);
        
        // Set the first available tier list as default
        const firstTierListKey = Object.keys(loadedTierLists)[0];
        if (firstTierListKey) {
          setSelectedTierList(firstTierListKey);
        }
      } catch (err) {
        setError('Failed to load tier lists. Please try refreshing the page.');
        console.error('Error loading tier lists:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTierLists();
  }, []);

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Reset modified tier list when selection changes
  useEffect(() => {
    setModifiedTierList(null);
    setIsDragMode(false);
  }, [selectedTierList]);

  const currentTierList = modifiedTierList || tierLists[selectedTierList];
  const tierListKeys = Object.keys(tierLists);

  // Handle drag and drop reordering
  const handleReorder = (draggedItem, targetTier) => {
    if (!currentTierList) return;

    const newTierList = { ...currentTierList };
    newTierList.tiers = newTierList.tiers.map(tier => ({ ...tier, entries: [...(tier.entries || [])] }));

    // Find source tier and remove item
    const sourceTier = newTierList.tiers.find(tier => tier.tier === draggedItem.tier);
    if (sourceTier) {
      sourceTier.entries.splice(draggedItem.index, 1);
    }

    // Find target tier and add item
    const targetTierObj = newTierList.tiers.find(tier => tier.tier === targetTier);
    if (targetTierObj) {
      targetTierObj.entries.push(draggedItem.entry);
    }

    setModifiedTierList(newTierList);
  };

  // Toggle drag mode
  const handleToggleDragMode = () => {
    setIsDragMode(!isDragMode);
  };

  // Reset to original order
  const handleResetOrder = () => {
    setModifiedTierList(null);
    setIsDragMode(false);
  };

  // Show info modal (placeholder)
  const handleShowInfo = () => {
    // This could open a modal with detailed instructions
    console.log('Show tier list info');
  };

  const hasChanges = modifiedTierList !== null;

  // Loading state
  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>Loading Tier Lists... | Smazdeck Survival Guide</title>
          <meta name="description" content="Loading tier lists for competitive Smazdeck Survival gameplay" />
        </Helmet>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-amber-400 text-xl mb-4">⏳ Loading...</div>
            <p className="text-slate-300">Loading tier lists...</p>
          </div>
        </div>
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <Helmet>
          <title>Error Loading Tier Lists | Smazdeck Survival Guide</title>
          <meta name="description" content="Error loading tier lists data" />
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

  // No tier lists available
  if (tierListKeys.length === 0) {
    return (
      <>
        <Helmet>
          <title>No Tier Lists Available | Smazdeck Survival Guide</title>
          <meta name="description" content="No tier lists currently available" />
        </Helmet>
        <div className="text-center py-12">
          <div className="text-slate-400 text-xl mb-4">📭 No Data</div>
          <p className="text-slate-300">
            No tier lists are currently available. Please check back later.
          </p>
        </div>
      </>
    );
  }

  const currentDisplayName = tierListDisplayNames[selectedTierList] || selectedTierList.replace(/_/g, ' ');
  const currentDescription = currentTierList?.description || `Rankings for ${currentDisplayName.toLowerCase()}`;

  return (
    <>
      <Helmet>
        <title>{currentDisplayName} | Smazdeck Survival Guide</title>
        <meta 
          name="description" 
          content={`${currentDescription} - Comprehensive tier rankings for competitive Smazdeck Survival gameplay.`}
        />
        <meta property="og:title" content={`${currentDisplayName} - Tier Rankings`} />
        <meta 
          property="og:description" 
          content={`Competitive tier rankings: ${currentDescription}`}
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 font-['Exo_2']">
            Tier Lists
          </h1>
          <p className="text-slate-300 text-lg mb-6">
            Comprehensive tier rankings for different game modes and strategies
          </p>

          {/* Tier List Selector */}
          <div className="mb-6">
            <label htmlFor="tier-list-select" className="block text-sm font-medium text-slate-300 mb-2">
              Select Tier List:
            </label>
            <select
              id="tier-list-select"
              value={selectedTierList}
              onChange={(e) => setSelectedTierList(e.target.value)}
              className="w-full max-w-md px-4 py-2 bg-slate-700 text-slate-200 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            >
              {tierListKeys.map((key) => (
                <option key={key} value={key}>
                  {tierListDisplayNames[key] || key.replace(/_/g, ' ')}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Current Tier List Display */}
        {currentTierList && (
          <div>
            {/* Tier List Header */}
            <div className="mb-8 p-6 bg-slate-800/50 rounded-xl border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-3 font-['Exo_2']">
                {currentTierList.title || currentDisplayName}
                {hasChanges && (
                  <span className="ml-3 text-sm font-normal text-amber-400">
                    (Modified)
                  </span>
                )}
              </h2>
              {currentTierList.description && (
                <p className="text-slate-300 leading-relaxed">
                  {currentTierList.description}
                </p>
              )}
              <div className="mt-4 text-sm text-slate-400">
                <span>Total Tiers: {currentTierList.tiers?.length || 0}</span>
                <span className="mx-2">•</span>
                <span>
                  Total Entries: {currentTierList.tiers?.reduce((acc, tier) => acc + (tier.entries?.length || 0), 0) || 0}
                </span>
              </div>
            </div>

            {/* Tier List Controls */}
            <TierListControls
              isDragMode={isDragMode}
              onToggleDragMode={handleToggleDragMode}
              onResetOrder={handleResetOrder}
              hasChanges={hasChanges}
              onShowInfo={handleShowInfo}
              className="mb-8"
            />

            {/* Tier List Content - Mobile vs Desktop */}
            {currentTierList.tiers && currentTierList.tiers.length > 0 ? (
              isMobile ? (
                <TierListMobile 
                  tierList={currentTierList} 
                  tierListName={currentDisplayName}
                />
              ) : (
                <div className="space-y-6">
                  {currentTierList.tiers.map((tier, index) => (
                    <EnhancedTierRow 
                      key={`${tier.tier}-${index}`} 
                      tier={tier}
                      onReorder={handleReorder}
                      isDragMode={isDragMode}
                    />
                  ))}
                </div>
              )
            ) : (
              <div className="text-center py-12">
                <div className="text-slate-400 text-xl mb-4">📋 No Tiers</div>
                <p className="text-slate-300">
                  This tier list doesn't have any tiers defined yet.
                </p>
              </div>
            )}

            {/* Export Section */}
            <div className="mt-12">
              <TierListExport 
                tierList={currentTierList}
                tierListName={currentDisplayName}
              />
            </div>

            {/* Tier List Footer */}
            <div className="mt-8 p-4 bg-slate-800/30 rounded-xl border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-2">
                💡 How to Read This Tier List
              </h3>
              <div className="text-sm text-slate-300 space-y-1">
                <p><strong className="text-tier-s-400">S-Tier:</strong> Exceptional performance, meta-defining</p>
                <p><strong className="text-tier-a-400">A-Tier:</strong> Strong performance, highly viable</p>
                <p><strong className="text-tier-b-400">B-Tier:</strong> Good performance, situationally strong</p>
                <p><strong className="text-tier-c-400">C-Tier:</strong> Average performance, niche uses</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TierListPage;
