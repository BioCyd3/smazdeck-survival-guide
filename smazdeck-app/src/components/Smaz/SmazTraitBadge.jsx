import React from 'react';

const SmazTraitBadge = ({ trait }) => {
  return (
    <div className="smaz-trait-badge">
      <span>{trait.name}</span>
      {/* Additional trait details */}
    </div>
  );
};

export default SmazTraitBadge;
