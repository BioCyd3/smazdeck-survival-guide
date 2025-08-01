import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { ProgressiveDisclosure } from '../ui/ProgressiveDisclosure';
import { useResponsive } from '../../hooks/useResponsive';

const SmazSkillCard = ({ skill, variant = 'default' }) => {
  const { isMobile } = useResponsive();
  
  if (!skill) {
    return null;
  }

  const { skill_name, description, ascension_effects = [] } = skill;

  // Mobile-first progressive disclosure for complex skills
  if (isMobile && ascension_effects.length > 0) {
    return (
      <ProgressiveDisclosure
        title={skill_name}
        description={description.length > 100 ? `${description.substring(0, 100)}...` : description}
        className="mb-4"
        variant="filled"
        size="sm"
        icon={
          <div className="w-6 h-6 bg-amber-500/20 rounded-full flex items-center justify-center">
            <span className="text-amber-400 text-xs">⚡</span>
          </div>
        }
        badge={ascension_effects.length > 0 ? `${ascension_effects.length} effects` : null}
      >
        {/* Full Description */}
        {description.length > 100 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-slate-400 mb-2">Full Description</h4>
            <p className="text-slate-300 leading-relaxed text-sm">
              {description}
            </p>
          </div>
        )}
        
        {/* Ascension Effects */}
        {ascension_effects.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-400 uppercase tracking-wide">
              Ascension Effects
            </h4>
            <div className="space-y-2">
              {ascension_effects.map((effect, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center text-xs text-slate-400">
                    {index + 1}
                  </div>
                  <Badge
                    variant="secondary"
                    className="text-xs flex-1"
                  >
                    {effect}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </ProgressiveDisclosure>
    );
  }

  // Desktop layout - traditional card
  return (
    <Card className="mb-4" variant={variant}>
      <div className="space-y-3">
        {/* Skill Name */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-amber-500/20 rounded-full flex items-center justify-center">
            <span className="text-amber-400 text-sm">⚡</span>
          </div>
          <h3 className="text-lg font-semibold text-amber-400">
            {skill_name}
          </h3>
          {ascension_effects.length > 0 && (
            <Badge variant="outline" className="text-xs">
              {ascension_effects.length} effects
            </Badge>
          )}
        </div>
        
        {/* Skill Description */}
        <p className="text-slate-300 leading-relaxed">
          {description}
        </p>
        
        {/* Ascension Effects */}
        {ascension_effects.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-400 uppercase tracking-wide">
              Ascension Effects
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ascension_effects.map((effect, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center text-xs text-slate-400 flex-shrink-0">
                    {index + 1}
                  </div>
                  <Badge
                    variant="secondary"
                    className="text-xs flex-1"
                  >
                    {effect}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default SmazSkillCard;