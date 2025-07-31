import React from 'react';
import { useParams } from 'react-router-dom';
import { getSmazById } from '../lib/data-helpers';
import SmazSkillCard from '../components/Smaz/SmazSkillCard';
import Badge from '../components/ui/Badge';

const SmazDetailPage = () => {
  const { id } = useParams();
  const smaz = getSmazById(id);

  if (!smaz) {
    return <div>Smaz not found</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <img
          src={`/images/smazs/${smaz.id}.png`}
          alt={smaz.name}
          className="w-full rounded-lg shadow-lg"
        />
        <h1 className="text-4xl font-bold mt-4">{smaz.name}</h1>
        <div className="flex flex-wrap gap-2 mt-2">
          {smaz.element_type.map(type => (
            <Badge key={type} variant="primary">
              {type}
            </Badge>
          ))}
        </div>
      </div>
      <div className="md:col-span-2">
        <h2 className="text-2xl font-bold mb-4">Skills</h2>
        <div className="space-y-4">
          {smaz.skills.map(skill => (
            <SmazSkillCard key={skill.name} skill={skill} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SmazDetailPage;
