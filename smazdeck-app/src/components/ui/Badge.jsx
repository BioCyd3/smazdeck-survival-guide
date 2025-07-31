import React from 'react';

const Badge = ({ children, className = '', variant = 'primary' }) => {
  const baseStyles =
    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold transition-colors duration-200';

  const variants = {
    primary: 'bg-amber-400 text-slate-900 hover:bg-amber-300',
    secondary: 'bg-slate-700 text-slate-200 hover:bg-slate-600',
    tier: 'bg-violet-600 text-white hover:bg-violet-500',
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
