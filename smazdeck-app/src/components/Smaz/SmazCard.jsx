import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';

const SmazCard = React.memo(({ smaz }) => {
  if (!smaz) {
    return null;
  }

  const { id, name, slug } = smaz;
  const imagePath = `/images/smazs/${slug || id}.png`;

  return (
    <Link
      to={`/smaz/${id}`}
      className="block transition-transform duration-200 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-lg"
      aria-label={`View ${name} profile`}
    >
      <Card className="h-full flex flex-col items-center text-center p-4 hover:border-amber-400 transition-colors duration-200">
        <div className="w-16 h-16 mb-3 rounded-full overflow-hidden bg-slate-700 flex items-center justify-center">
          <img
            src={imagePath}
            alt={`${name} portrait`}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to a placeholder if image fails to load
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div 
            className="w-full h-full bg-slate-600 items-center justify-center text-slate-400 text-xs hidden"
            aria-hidden="true"
          >
            No Image
          </div>
        </div>
        <h3 className="text-white font-medium text-sm leading-tight">
          {name}
        </h3>
      </Card>
    </Link>
  );
});

SmazCard.displayName = 'SmazCard';

export default SmazCard;