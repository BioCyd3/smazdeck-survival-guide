import React from 'react';

const Card = ({ children, className = '' }) => {
  return (
    <div
      className={`bg-slate-800 border border-slate-700 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
