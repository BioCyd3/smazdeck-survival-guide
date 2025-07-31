import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

const SmazSkillCard = ({ skill }) => {
  if (!skill) {
    return null;
  }

  const { skill_name, description, ascension_effects = [] } = skill;

  return (
    <Card className="mb-4">
      <div className="space-y-3">
        {/* Skill Name */}
        <h3 className="text-lg font-semibold text-amber-400">
          {skill_name}
        </h3>
        
        {/* Skill Description */}
        <p className="text-slate-300 leading-relaxed">
          {description}
        </p>
        
        {/* Ascension Effects */}
        {ascension_effects.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-slate-400 uppercase tracking-wide">
              Ascension Effects
            </h4>
            <div className="flex flex-wrap gap-2">
              {ascension_effects.map((effect, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs"
                >
                  {effect}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default SmazSkillCard;