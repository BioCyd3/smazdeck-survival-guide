import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import SmazCard from './SmazCard';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const TierListMobile = ({ tierList, tierListName }) => {
  const [expandedTiers, setExpandedTiers] = useState(new Set(['S'])); // S-tier expanded by default

  const toggleTier = (tierLetter) => {
    const newExpanded = new Set(expandedTiers);
    if (newExpanded.has(tierLetter)) {
      newExpanded.delete(tierLetter);
    } else {
      newExpanded.add(tierLetter);
    }
    setExpandedTiers(newExpanded);
  };

  // Enhanced tier-specific colors for mobile with improved visual hierarchy
  const getTierColors = (tierLetter) => {
    const tierUpper = tierLetter.toUpperCase();
    switch (tierUpper) {
      case 'S':
        return {
          bg: 'bg-gradient-tier-s backdrop-blur-sm',
          border: 'border-tier-s-500/70',
          text: 'text-tier-s-300',
          badge: 'bg-gradient-to-br from-tier-s-500 to-tier-s-600 text-white shadow-lg',
          accent: 'bg-gradient-to-br from-tier-s-500/30 to-tier-s-700/10',
          glow: 'shadow-glow-tier-s',
          priority: 'S-TIER',
          description: 'Meta-defining',
        };
      case 'A':
        return {
          bg: 'bg-gradient-tier-a backdrop-blur-sm',
          border: 'border-tier-a-500/70',
          text: 'text-tier-a-300',
          badge: 'bg-gradient-to-br from-tier-a-500 to-tier-a-600 text-white shadow-lg',
          accent: 'bg-gradient-to-br from-tier-a-500/30 to-tier-a-700/10',
          glow: 'shadow-glow-tier-a',
          priority: 'A-TIER',
          description: 'Highly competitive',
        };
      case 'B':
        return {
          bg: 'bg-gradient-tier-b backdrop-blur-sm',
          border: 'border-tier-b-500/70',
          text: 'text-tier-b-300',
          badge: 'bg-gradient-to-br from-tier-b-500 to-tier-b-600 text-white shadow-lg',
          accent: 'bg-gradient-to-br from-tier-b-500/30 to-tier-b-700/10',
          glow: 'shadow-glow-tier-b',
          priority: 'B-TIER',
          description: 'Solid performance',
        };
      case 'C':
        return {
          bg: 'bg-gradient-tier-c backdrop-blur-sm',
          border: 'border-tier-c-500/70',
          text: 'text-tier-c-300',
          badge: 'bg-gradient-to-br from-tier-c-500 to-tier-c-600 text-white shadow-lg',
          accent: 'bg-gradient-to-br from-tier-c-500/30 to-tier-c-700/10',
          glow: 'shadow-glow-tier-c',
          priority: 'C-TIER',
          description: 'Situational',
        };
      default:
        return {
          bg: 'bg-slate-900/30 backdrop-blur-sm',
          border: 'border-slate-500/70',
          text: 'text-slate-300',
          badge: 'bg-gradient-to-br from-slate-600 to-slate-700 text-slate-100 shadow-lg',
          accent: 'bg-gradient-to-br from-slate-600/30 to-slate-700/10',
          glow: 'shadow-lg',
          priority: `${tierLetter.toUpperCase()}-TIER`,
          description: 'Unranked',
        };
    }
  };

  if (!tierList?.tiers) {
    return (
      <div className="text-center py-8">
        <div className="text-slate-400 text-lg">No tier data available</div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Mobile header */}
      <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
        <h2 className="text-lg font-semibold text-white mb-2">
          {tierList.title || tierListName}
        </h2>
        {tierList.description && (
          <p className="text-sm text-slate-300 leading-relaxed">
            {tierList.description}
          </p>
        )}
        <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-400">
          <span>{tierList.tiers.length} tiers</span>
          <span>
            {tierList.tiers.reduce((acc, tier) => acc + (tier.entries?.length || 0), 0)} total entries
          </span>
        </div>
      </div>

      {/* Mobile tier list */}
      {tierList.tiers.map((tier, index) => {
        const { tier: tierLetter, tier_name, entries = [] } = tier;
        const tierColors = getTierColors(tierLetter);
        const isExpanded = expandedTiers.has(tierLetter);

        return (
          <div
            key={`${tierLetter}-${index}`}
            className={cn(
              "rounded-lg border-2 overflow-hidden transition-all duration-300",
              tierColors.border,
              tierColors.bg
            )}
          >
            {/* Enhanced tier header with better visual hierarchy */}
            <button
              onClick={() => toggleTier(tierLetter)}
              className="w-full p-4 flex items-center justify-between hover:bg-slate-800/40 transition-all duration-200 group"
            >
              <div className="flex items-center gap-4">
                {/* Enhanced tier badge */}
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg border-2 border-white/20 transition-all duration-200",
                  tierColors.badge,
                  tierColors.glow,
                  "group-hover:scale-105"
                )}>
                  <span className="drop-shadow-sm">{tierLetter.toUpperCase()}</span>
                </div>
                
                {/* Enhanced tier info */}
                <div className="text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-semibold font-display">
                      {tier_name}
                    </span>
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-xs font-medium",
                      tierColors.text,
                      "bg-slate-800/50"
                    )}>
                      {tierColors.priority}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-slate-400">
                      <strong className="text-slate-300">{entries.length}</strong> {entries.length === 1 ? 'Smaz' : 'Smazs'}
                    </span>
                    <span className="text-slate-500 text-xs">
                      {tierColors.description}
                    </span>
                  </div>
                </div>
              </div>

              {/* Enhanced expand/collapse icon */}
              <div className={cn(
                "text-slate-400 transition-all duration-200 group-hover:text-slate-300",
                isExpanded && "rotate-0",
                !isExpanded && "rotate-0"
              )}>
                {isExpanded ? (
                  <ChevronDownIcon className="w-5 h-5 transition-transform duration-200" />
                ) : (
                  <ChevronRightIcon className="w-5 h-5 transition-transform duration-200" />
                )}
              </div>
            </button>

            {/* Tier content - collapsible */}
            {isExpanded && (
              <div className={cn(
                "border-t border-slate-700/50 p-4",
                tierColors.accent
              )}>
                {entries.length > 0 ? (
                  <div className="space-y-4">
                    {/* Mobile-optimized grid - 2 columns */}
                    <div className="grid grid-cols-2 gap-3">
                      {entries.map((entry, entryIndex) => {
                        const smaz = entry.smaz || { 
                          id: `tier-${tierLetter}-${entryIndex}`, 
                          name: entry.name,
                          slug: entry.name?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') 
                        };
                        
                        return (
                          <div key={smaz.id || entryIndex} className="space-y-2">
                            <SmazCard smaz={smaz} />
                            {entry.explanation && (
                              <div className="bg-slate-800/50 rounded p-2 border border-slate-700/50">
                                <p className="text-xs text-slate-300 leading-relaxed">
                                  {entry.explanation}
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Tier summary for mobile */}
                    <div className="pt-3 border-t border-slate-700/30">
                      <div className="flex flex-wrap gap-3 text-xs text-slate-400">
                        <span>
                          <strong className="text-slate-300">{entries.length}</strong> entries
                        </span>
                        {entries.some(e => e.explanation) && (
                          <span>
                            <strong className="text-slate-300">
                              {entries.filter(e => e.explanation).length}
                            </strong> with notes
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <div className="text-slate-500 text-4xl mb-2">🏆</div>
                    <div className="text-slate-400 text-sm">
                      No Smazs in this tier
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}

      {/* Enhanced mobile tier legend with better visual design */}
      <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50 backdrop-blur-sm">
        <h4 className="text-sm font-semibold text-white mb-4 font-display flex items-center gap-2">
          <div className="w-2 h-2 bg-amber-400 rounded-full" />
          Tier Rankings Guide
        </h4>
        <div className="grid grid-cols-1 gap-3 text-xs">
          <div className="flex items-center gap-4 p-2 rounded-lg bg-slate-900/30">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-tier-s-500 to-tier-s-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
              S
            </div>
            <div className="flex-1">
              <div className="text-slate-200 font-medium">S-Tier</div>
              <div className="text-slate-400">Exceptional - Meta defining</div>
            </div>
          </div>
          <div className="flex items-center gap-4 p-2 rounded-lg bg-slate-900/30">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-tier-a-500 to-tier-a-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
              A
            </div>
            <div className="flex-1">
              <div className="text-slate-200 font-medium">A-Tier</div>
              <div className="text-slate-400">Strong - Highly competitive</div>
            </div>
          </div>
          <div className="flex items-center gap-4 p-2 rounded-lg bg-slate-900/30">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-tier-b-500 to-tier-b-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
              B
            </div>
            <div className="flex-1">
              <div className="text-slate-200 font-medium">B-Tier</div>
              <div className="text-slate-400">Good - Solid performance</div>
            </div>
          </div>
          <div className="flex items-center gap-4 p-2 rounded-lg bg-slate-900/30">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-tier-c-500 to-tier-c-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
              C
            </div>
            <div className="flex-1">
              <div className="text-slate-200 font-medium">C-Tier</div>
              <div className="text-slate-400">Average - Situational utility</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick expand/collapse all */}
      <div className="flex gap-2">
        <button
          onClick={() => setExpandedTiers(new Set(tierList.tiers.map(t => t.tier)))}
          className="flex-1 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white rounded-lg text-sm font-medium transition-colors duration-200"
        >
          Expand All
        </button>
        <button
          onClick={() => setExpandedTiers(new Set())}
          className="flex-1 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white rounded-lg text-sm font-medium transition-colors duration-200"
        >
          Collapse All
        </button>
      </div>
    </div>
  );
};

export default TierListMobile;