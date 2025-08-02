import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { getTierLists } from '../lib/data-helpers';
import TierRow from '../components/Smaz/TierRow';
import EnhancedTierRow from '../components/Smaz/EnhancedTierRow';
import TierListControls from '../components/Smaz/TierListControls';
import TierListExport from '../components/Smaz/TierListExport';
import TierListMobile from '../components/Smaz/TierListMobile';
import Heading from '../components/ui/Heading';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Breadcrumb from '../components/ui/Breadcrumb';

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

  // Enhanced Loading state
  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>Loading Tier Lists... | Smazdeck Survival Guide</title>
          <meta name="description" content="Loading tier lists for competitive Smazdeck Survival gameplay" />
        </Helmet>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <LoadingSpinner size="lg" className="mb-4" />
            <Heading level={3} variant="subheading" color="accent" className="mb-2">
              Loading Tier Lists
            </Heading>
            <p className="text-slate-400">Fetching competitive rankings...</p>
          </div>
        </div>
      </>
    );
  }

  // Enhanced Error state
  if (error) {
    return (
      <>
        <Helmet>
          <title>Error Loading Tier Lists | Smazdeck Survival Guide</title>
          <meta name="description" content="Error loading tier lists data" />
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
              Failed to Load Tier Lists
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
        {/* Enhanced Breadcrumb Navigation */}
        <Breadcrumb 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Tier Lists' }
          ]}
          className="mb-6"
        />

        {/* Enhanced Header Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <Heading level={1} variant="display" color="gradient" className="mb-4">
              Tier Lists
            </Heading>
            <p className="text-xl text-slate-300 mb-2 max-w-3xl mx-auto">
              Comprehensive tier rankings for different game modes and strategies
            </p>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Discover the meta with our expertly curated tier lists, updated regularly for competitive play
            </p>
          </div>

          {/* Enhanced Tier List Selector */}
          <Card className="max-w-2xl mx-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Heading level={3} variant="subheading" color="primary">
                  Select Tier List
                </Heading>
                <Badge variant="secondary" className="text-xs">
                  {tierListKeys.length} Available
                </Badge>
              </div>
              
              <select
                id="tier-list-select"
                value={selectedTierList}
                onChange={(e) => setSelectedTierList(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700 text-slate-200 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200 hover:border-slate-500"
              >
                {tierListKeys.map((key) => (
                  <option key={key} value={key}>
                    {tierListDisplayNames[key] || key.replace(/_/g, ' ')}
                  </option>
                ))}
              </select>
              
              <p className="text-sm text-slate-400 mt-2">
                Choose from {tierListKeys.length} different tier lists covering various game modes and strategies
              </p>
            </div>
          </Card>
        </div>

        {/* Current Tier List Display */}
        {currentTierList && (
          <div>
            {/* Enhanced Tier List Header */}
            <Card className="mb-8 overflow-hidden">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-blue-500/5"></div>
              
              <div className="relative p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div className="mb-4 md:mb-0">
                    <div className="flex items-center gap-3 mb-2">
                      <Heading level={2} variant="heading" color="gradient">
                        {currentTierList.title || currentDisplayName}
                      </Heading>
                      {hasChanges && (
                        <Badge variant="warning" className="text-xs">
                          Modified
                        </Badge>
                      )}
                    </div>
                    {currentTierList.description && (
                      <p className="text-slate-300 leading-relaxed max-w-3xl">
                        {currentTierList.description}
                      </p>
                    )}
                  </div>
                  
                  {/* Quick stats */}
                  <div className="flex gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-amber-400">
                        {currentTierList.tiers?.length || 0}
                      </div>
                      <div className="text-xs text-slate-400">Tiers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">
                        {currentTierList.tiers?.reduce((acc, tier) => acc + (tier.entries?.length || 0), 0) || 0}
                      </div>
                      <div className="text-xs text-slate-400">Entries</div>
                    </div>
                  </div>
                </div>
                
                {/* Tier legend */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-red-400 rounded"></div>
                    <span className="text-sm text-slate-300">S-Tier: Meta</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gradient-to-r from-orange-500 to-orange-400 rounded"></div>
                    <span className="text-sm text-slate-300">A-Tier: Strong</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded"></div>
                    <span className="text-sm text-slate-300">B-Tier: Good</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-green-400 rounded"></div>
                    <span className="text-sm text-slate-300">C-Tier: Average</span>
                  </div>
                </div>
              </div>
            </Card>

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

            {/* Enhanced Tier List Footer */}
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {/* How to Read Guide */}
              <Card className="bg-gradient-to-br from-amber-500/10 to-transparent border-amber-500/20">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="text-2xl mr-3">💡</div>
                    <Heading level={4} variant="subheading" color="accent">
                      How to Read This Tier List
                    </Heading>
                  </div>
                  <div className="space-y-3 text-sm text-slate-300">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-red-400 rounded-full"></div>
                      <span><strong className="text-red-400">S-Tier:</strong> Exceptional, meta-defining</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"></div>
                      <span><strong className="text-orange-400">A-Tier:</strong> Strong, highly viable</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full"></div>
                      <span><strong className="text-yellow-400">B-Tier:</strong> Good, situationally strong</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-400 rounded-full"></div>
                      <span><strong className="text-green-400">C-Tier:</strong> Average, niche uses</span>
                    </div>
                  </div>
                </div>
              </Card>
              
              {/* Interactive Features */}
              <Card className="bg-gradient-to-br from-blue-500/10 to-transparent border-blue-500/20">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="text-2xl mr-3">🎮</div>
                    <Heading level={4} variant="subheading" color="secondary">
                      Interactive Features
                    </Heading>
                  </div>
                  <div className="space-y-2 text-sm text-slate-300">
                    <p>• <strong>Drag Mode:</strong> Reorder entries to create your own rankings</p>
                    <p>• <strong>Export:</strong> Save or share your customized tier lists</p>
                    <p>• <strong>Mobile Optimized:</strong> Swipe-friendly interface on mobile</p>
                    <p>• <strong>Real-time Updates:</strong> Rankings updated with meta changes</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TierListPage;
