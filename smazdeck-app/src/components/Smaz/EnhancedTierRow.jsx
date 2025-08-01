import React, { useState, useRef } from 'react';
import { cn } from '../../lib/utils';
import Accordion from '../ui/Accordion';
import SmazCard from './SmazCard';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

const EnhancedTierRow = ({ tier, onReorder, isDragMode = false }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const dragCounter = useRef(0);

  if (!tier) {
    return null;
  }

  const { tier: tierLetter, tier_name, entries = [] } = tier;

  // Enhanced tier-specific colors with improved gradients, glows, and visual hierarchy
  const getTierColors = (tierLetter) => {
    const tierUpper = tierLetter.toUpperCase();
    switch (tierUpper) {
      case 'S':
        return {
          bg: 'bg-gradient-tier-s backdrop-blur-sm',
          border: 'border-tier-s-500/70',
          text: 'text-tier-s-300',
          glow: 'shadow-glow-tier-s',
          badge: 'bg-gradient-to-br from-tier-s-500 to-tier-s-600 border-tier-s-400 text-white shadow-lg',
          accent: 'from-tier-s-500/40 via-tier-s-600/20 to-tier-s-800/10',
          hover: 'hover:shadow-glow-tier-s hover:border-tier-s-400 hover:shadow-xl',
          dragOver: 'ring-4 ring-tier-s-400/50 border-tier-s-400 shadow-2xl shadow-tier-s-500/30 scale-[1.02]',
          priority: 'S-TIER',
          description: 'Meta-defining excellence',
        };
      case 'A':
        return {
          bg: 'bg-gradient-tier-a backdrop-blur-sm',
          border: 'border-tier-a-500/70',
          text: 'text-tier-a-300',
          glow: 'shadow-glow-tier-a',
          badge: 'bg-gradient-to-br from-tier-a-500 to-tier-a-600 border-tier-a-400 text-white shadow-lg',
          accent: 'from-tier-a-500/40 via-tier-a-600/20 to-tier-a-800/10',
          hover: 'hover:shadow-glow-tier-a hover:border-tier-a-400 hover:shadow-xl',
          dragOver: 'ring-4 ring-tier-a-400/50 border-tier-a-400 shadow-2xl shadow-tier-a-500/30 scale-[1.02]',
          priority: 'A-TIER',
          description: 'Highly competitive',
        };
      case 'B':
        return {
          bg: 'bg-gradient-tier-b backdrop-blur-sm',
          border: 'border-tier-b-500/70',
          text: 'text-tier-b-300',
          glow: 'shadow-glow-tier-b',
          badge: 'bg-gradient-to-br from-tier-b-500 to-tier-b-600 border-tier-b-400 text-white shadow-lg',
          accent: 'from-tier-b-500/40 via-tier-b-600/20 to-tier-b-800/10',
          hover: 'hover:shadow-glow-tier-b hover:border-tier-b-400 hover:shadow-xl',
          dragOver: 'ring-4 ring-tier-b-400/50 border-tier-b-400 shadow-2xl shadow-tier-b-500/30 scale-[1.02]',
          priority: 'B-TIER',
          description: 'Solid performance',
        };
      case 'C':
        return {
          bg: 'bg-gradient-tier-c backdrop-blur-sm',
          border: 'border-tier-c-500/70',
          text: 'text-tier-c-300',
          glow: 'shadow-glow-tier-c',
          badge: 'bg-gradient-to-br from-tier-c-500 to-tier-c-600 border-tier-c-400 text-white shadow-lg',
          accent: 'from-tier-c-500/40 via-tier-c-600/20 to-tier-c-800/10',
          hover: 'hover:shadow-glow-tier-c hover:border-tier-c-400 hover:shadow-xl',
          dragOver: 'ring-4 ring-tier-c-400/50 border-tier-c-400 shadow-2xl shadow-tier-c-500/30 scale-[1.02]',
          priority: 'C-TIER',
          description: 'Situational utility',
        };
      default:
        return {
          bg: 'bg-slate-900/30 backdrop-blur-sm',
          border: 'border-slate-500/70',
          text: 'text-slate-300',
          glow: 'shadow-lg',
          badge: 'bg-gradient-to-br from-slate-600 to-slate-700 border-slate-500 text-slate-100 shadow-lg',
          accent: 'from-slate-600/40 via-slate-700/20 to-slate-800/10',
          hover: 'hover:shadow-xl hover:border-slate-400',
          dragOver: 'ring-4 ring-slate-400/50 border-slate-400 shadow-2xl shadow-slate-500/30 scale-[1.02]',
          priority: `${tierLetter.toUpperCase()}-TIER`,
          description: 'Unranked tier',
        };
    }
  };

  const tierColors = getTierColors(tierLetter);

  // Enhanced drag and drop handlers with improved visual feedback
  const handleDragStart = (e, entry, index) => {
    if (!isDragMode) return;
    
    setDraggedItem({ entry, index, tier: tierLetter });
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.outerHTML);
    
    // Enhanced drag start visual feedback
    e.target.style.opacity = '0.6';
    e.target.style.transform = 'scale(1.05) rotate(2deg)';
    e.target.style.transition = 'all 0.2s ease-out';
    e.target.style.zIndex = '50';
    e.target.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.3)';
  };

  const handleDragEnd = (e) => {
    if (!isDragMode) return;
    
    // Smooth return to normal state
    e.target.style.opacity = '1';
    e.target.style.transform = 'scale(1) rotate(0deg)';
    e.target.style.transition = 'all 0.3s ease-out';
    e.target.style.zIndex = 'auto';
    e.target.style.boxShadow = '';
    
    setDraggedItem(null);
    setIsDragOver(false);
    dragCounter.current = 0;
  };

  const handleDragOver = (e) => {
    if (!isDragMode || !draggedItem) return;
    
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e) => {
    if (!isDragMode || !draggedItem) return;
    
    e.preventDefault();
    dragCounter.current++;
    
    // Only show drag over state if dragging to a different tier
    if (draggedItem.tier !== tierLetter) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e) => {
    if (!isDragMode || !draggedItem) return;
    
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e) => {
    if (!isDragMode || !draggedItem || !onReorder) return;
    
    e.preventDefault();
    setIsDragOver(false);
    dragCounter.current = 0;

    // Only allow reordering if dropping on a different tier
    if (draggedItem.tier !== tierLetter) {
      onReorder(draggedItem, tierLetter);
      
      // Add success feedback animation
      const dropZone = e.currentTarget;
      dropZone.style.animation = 'pulse 0.3s ease-out';
      setTimeout(() => {
        dropZone.style.animation = '';
      }, 300);
    }
  };

  // Create the enhanced title with improved tier styling, hierarchy, and information
  const tierTitle = (
    <div className="flex items-center justify-between w-full group">
      <div className="flex items-center gap-4">
        {/* Enhanced tier badge with better visual hierarchy */}
        <div className={cn(
          "relative inline-flex items-center justify-center w-14 h-14 rounded-xl font-bold text-xl border-2 transition-all duration-300",
          tierColors.badge,
          tierColors.glow,
          "group-hover:scale-105"
        )}>
          <div className={cn(
            "absolute inset-0 rounded-xl bg-gradient-to-br opacity-60",
            tierColors.accent
          )} />
          <span className="relative z-10 drop-shadow-sm">{tierLetter.toUpperCase()}</span>
          
          {/* Tier priority indicator */}
          <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-white/20 border border-white/30" />
        </div>
        
        {/* Enhanced tier information */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <span className="text-white font-semibold text-lg font-display">
              {tier_name}
            </span>
            <span className={cn(
              "px-2 py-0.5 rounded-full text-xs font-medium border",
              tierColors.text,
              "bg-slate-800/50 border-slate-600/50"
            )}>
              {tierColors.priority}
            </span>
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            <span className="text-slate-400">
              <strong className="text-slate-300">{entries.length}</strong> {entries.length === 1 ? 'Smaz' : 'Smazs'}
            </span>
            <span className="text-slate-500 text-xs">
              {tierColors.description}
            </span>
          </div>
        </div>
      </div>

      {/* Enhanced drag mode indicator */}
      {isDragMode && (
        <div className="flex items-center gap-3 text-slate-400 text-sm animate-pulse">
          <div className="flex flex-col items-center gap-1">
            <span className="font-medium">Drop Zone</span>
            <div className="flex items-center gap-1">
              <div className="flex flex-col gap-0.5">
                <ChevronUpIcon className="w-3 h-3" />
                <ChevronDownIcon className="w-3 h-3" />
              </div>
              <span className="text-xs">Drag here</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div 
      className={cn(
        "mb-6 rounded-xl border-2 transition-all duration-300 backdrop-blur-sm relative overflow-hidden",
        tierColors.border,
        tierColors.bg,
        tierColors.hover,
        isDragOver && isDragMode && tierColors.dragOver,
        "animate-slide-up"
      )}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Enhanced drag over overlay */}
      {isDragOver && isDragMode && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className={cn(
            "absolute inset-0 rounded-xl bg-gradient-to-br opacity-20 animate-pulse",
            tierColors.accent
          )} />
          <div className="absolute inset-4 border-2 border-dashed rounded-lg border-white/30 flex items-center justify-center">
            <div className="text-white font-medium text-lg bg-slate-900/80 px-4 py-2 rounded-lg backdrop-blur-sm">
              Drop to move to {tierColors.priority}
            </div>
          </div>
        </div>
      )}
      <Accordion 
        title={tierTitle} 
        startOpen={tierLetter.toUpperCase() === 'S'}
        className="rounded-xl"
      >
        <div className="space-y-6 p-2">
          {/* Enhanced Smaz Grid with responsive design */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
            {entries.map((entry, index) => {
              // Handle both processed entries (with smaz object) and unprocessed entries
              const smaz = entry.smaz || { 
                id: `tier-${tierLetter}-${index}`, 
                name: entry.name,
                slug: entry.name?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') 
              };
              
              return (
                <div 
                  key={smaz.id || index} 
                  className={cn(
                    "space-y-3 transition-all duration-200",
                    isDragMode && "cursor-move hover:scale-105"
                  )}
                  draggable={isDragMode}
                  onDragStart={(e) => handleDragStart(e, entry, index)}
                  onDragEnd={handleDragEnd}
                >
                  <div className={cn(
                    "relative",
                    isDragMode && "hover:shadow-lg hover:shadow-amber-400/20"
                  )}>
                    <SmazCard smaz={smaz} />
                    
                    {/* Enhanced drag indicator overlay */}
                    {isDragMode && (
                      <div className="absolute inset-0 rounded-lg border-2 border-dashed border-amber-400/60 bg-gradient-to-br from-amber-400/10 to-amber-600/5 opacity-0 hover:opacity-100 transition-all duration-200 flex items-center justify-center group-hover:shadow-lg">
                        <div className="text-amber-300 text-xs font-medium bg-slate-900/90 px-3 py-1.5 rounded-lg backdrop-blur-sm border border-amber-400/30 shadow-lg">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                            Drag to move
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Enhanced explanation with better typography */}
                  {entry.explanation && (
                    <div className="bg-slate-800/30 rounded-lg p-3 border border-slate-700/50">
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {entry.explanation}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Enhanced empty state */}
          {entries.length === 0 && (
            <div className="text-center py-12">
              <div className="text-slate-500 text-6xl mb-4">🏆</div>
              <div className="text-slate-400 text-lg font-medium mb-2">
                No Smazs in {tierLetter.toUpperCase()}-Tier
              </div>
              <p className="text-slate-500 text-sm">
                {isDragMode ? 'Drag Smazs here to add them to this tier' : 'This tier is currently empty'}
              </p>
            </div>
          )}

          {/* Tier statistics */}
          {entries.length > 0 && (
            <div className="mt-6 pt-4 border-t border-slate-700/50">
              <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                <span>
                  <strong className="text-slate-300">{entries.length}</strong> total entries
                </span>
                {entries.some(e => e.explanation) && (
                  <span>
                    <strong className="text-slate-300">
                      {entries.filter(e => e.explanation).length}
                    </strong> with explanations
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </Accordion>
    </div>
  );
};

export default EnhancedTierRow;