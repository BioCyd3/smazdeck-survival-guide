import React from 'react';
import Accordion from '../ui/Accordion';
import SmazCard from './SmazCard';

const TierRow = ({ tier }) => {
  if (!tier) {
    return null;
  }

  const { tier: tierLetter, tier_name, entries = [] } = tier;

  // Define tier-specific colors
  const getTierColors = (tierLetter) => {
    switch (tierLetter.toUpperCase()) {
      case 'S':
        return {
          bg: 'bg-red-900/20',
          border: 'border-red-500',
          text: 'text-red-400',
        };
      case 'A':
        return {
          bg: 'bg-violet-900/20',
          border: 'border-violet-500',
          text: 'text-violet-400',
        };
      case 'B':
        return {
          bg: 'bg-blue-900/20',
          border: 'border-blue-500',
          text: 'text-blue-400',
        };
      case 'C':
        return {
          bg: 'bg-green-900/20',
          border: 'border-green-500',
          text: 'text-green-400',
        };
      default:
        return {
          bg: 'bg-slate-900/20',
          border: 'border-slate-500',
          text: 'text-slate-400',
        };
    }
  };

  const tierColors = getTierColors(tierLetter);
  
  // Create the title with tier styling
  const tierTitle = (
    <div className="flex items-center gap-3">
      <span 
        className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-lg ${tierColors.bg} ${tierColors.border} ${tierColors.text} border-2`}
      >
        {tierLetter.toUpperCase()}
      </span>
      <span className="text-white">
        {tier_name} ({entries.length} {entries.length === 1 ? 'Smaz' : 'Smazs'})
      </span>
    </div>
  );

  return (
    <div className={`mb-4 rounded-lg ${tierColors.border} border-2 ${tierColors.bg}`}>
      <Accordion title={tierTitle} startOpen={tierLetter.toUpperCase() === 'S'}>
        <div className="space-y-4">
          {/* Smaz Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {entries.map((entry, index) => {
              // Handle both processed entries (with smaz object) and unprocessed entries
              const smaz = entry.smaz || { 
                id: `tier-${tierLetter}-${index}`, 
                name: entry.name,
                slug: entry.name?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') 
              };
              
              return (
                <div key={smaz.id || index} className="space-y-2">
                  <SmazCard smaz={smaz} />
                  {entry.explanation && (
                    <p className="text-xs text-slate-400 text-center px-2 leading-relaxed">
                      {entry.explanation}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Empty state */}
          {entries.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              No Smazs in this tier
            </div>
          )}
        </div>
      </Accordion>
    </div>
  );
};

export default TierRow;