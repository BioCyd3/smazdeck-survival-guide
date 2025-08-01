import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import ProgressBar from '../ui/ProgressBar';
import LoadingSpinner from '../ui/LoadingSpinner';
import { ResponsiveImage } from '../ui/ResponsiveImage';
import { ProgressiveDisclosure } from '../ui/ProgressiveDisclosure';
import { useResponsive } from '../../hooks/useResponsive';

const SmazCard = React.memo(({ smaz, showStats = false, compact = false }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  if (!smaz) {
    return null;
  }

  const { id, name, slug, skills = [] } = smaz;
  const imagePath = `/images/smazs/${slug || id}.png`;
  
  // Calculate stats from skills for visualization
  const getStatValue = (statType) => {
    // This is a simplified stat calculation - in a real app you'd have proper stat data
    const skillCount = skills.length;
    const baseValue = Math.min(skillCount * 20, 100);
    
    switch (statType) {
      case 'attack':
        return Math.min(baseValue + (skills.some(s => s.skill_name?.toLowerCase().includes('damage')) ? 20 : 0), 100);
      case 'defense':
        return Math.min(baseValue + (skills.some(s => s.description?.toLowerCase().includes('defense')) ? 20 : 0), 100);
      case 'hp':
        return Math.min(baseValue + (skills.some(s => s.description?.toLowerCase().includes('hp')) ? 20 : 0), 100);
      default:
        return baseValue;
    }
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  const skillsCount = skills.length;
  const hasRageSkill = skills.some(skill => 
    skill.skill_name?.toLowerCase().includes('rage') || 
    skill.description?.toLowerCase().includes('rage')
  );

  return (
    <Link
      to={`/smaz/${id}`}
      className="block group"
      aria-label={`View ${name} profile`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card 
        className={`h-full transition-all duration-300 ease-out group-hover:scale-[1.02] group-hover:shadow-xl group-hover:shadow-amber-500/20 group-hover:border-amber-400/50 group-focus-visible:scale-[1.02] group-focus-visible:shadow-xl group-focus-visible:shadow-amber-500/20 group-focus-visible:border-amber-400 ${
          compact ? 'p-3' : 'p-4'
        }`}
        variant="default"
      >
        <div className="flex flex-col items-center text-center h-full">
          {/* Image Section with Loading States */}
          <div className={`relative mb-3 rounded-full overflow-hidden bg-slate-700 flex items-center justify-center ${
            compact ? 'w-12 h-12' : 'w-16 h-16'
          }`}>
            {imageLoading && !imageError && (
              <div className="absolute inset-0 flex items-center justify-center">
                <LoadingSpinner size="sm" />
              </div>
            )}
            
            {!imageError && (
              <img
                src={imagePath}
                alt={`${name} portrait`}
                className={`w-full h-full object-cover transition-opacity duration-200 ${
                  imageLoading ? 'opacity-0' : 'opacity-100'
                }`}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            )}
            
            {imageError && (
              <div className="w-full h-full bg-slate-600 flex items-center justify-center text-slate-400 text-xs">
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                  />
                </svg>
              </div>
            )}

            {/* Skill Count Badge */}
            {skillsCount > 0 && (
              <div className="absolute -top-1 -right-1 bg-amber-500 text-slate-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {skillsCount}
              </div>
            )}

            {/* Rage Skill Indicator */}
            {hasRageSkill && (
              <div className="absolute -bottom-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                ⚡
              </div>
            )}
          </div>

          {/* Name */}
          <h3 className={`text-white font-medium leading-tight mb-2 ${
            compact ? 'text-xs' : 'text-sm'
          }`}>
            {name}
          </h3>

          {/* Stats Section - Shows on hover or when showStats is true */}
          {(showStats || isHovered) && !compact && (
            <div className={`w-full space-y-1 transition-all duration-300 ${
              isHovered ? 'opacity-100 translate-y-0' : showStats ? 'opacity-100' : 'opacity-0 translate-y-2'
            }`}>
              <ProgressBar
                value={getStatValue('attack')}
                max={100}
                size="sm"
                variant="attack"
                label="ATK"
              />
              <ProgressBar
                value={getStatValue('defense')}
                max={100}
                size="sm"
                variant="defense"
                label="DEF"
              />
              <ProgressBar
                value={getStatValue('hp')}
                max={100}
                size="sm"
                variant="hp"
                label="HP"
              />
            </div>
          )}

          {/* Quick Info - Shows on hover */}
          {isHovered && !compact && (
            <div className="w-full mt-2 pt-2 border-t border-slate-600 transition-all duration-300 opacity-100">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Skills</span>
                <span className="text-amber-400 font-medium">{skillsCount}</span>
              </div>
              {hasRageSkill && (
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>Type</span>
                  <span className="text-red-400 font-medium">Rage</span>
                </div>
              )}
            </div>
          )}

          {/* Compact mode info */}
          {compact && (
            <div className="text-xs text-slate-400 mt-1">
              {skillsCount} skill{skillsCount !== 1 ? 's' : ''}
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
});

SmazCard.displayName = 'SmazCard';

export default SmazCard;