import React, { useState } from 'react';

const Tooltip = ({ text, children, position = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full mb-2',
    bottom: 'top-full mt-2',
    left: 'right-full mr-2 top-1/2 -translate-y-1/2',
    right: 'left-full ml-2 top-1/2 -translate-y-1/2',
  };

  const handleMouseEnter = () => setIsVisible(true);
  const handleMouseLeave = () => setIsVisible(false);
  const handleFocus = () => setIsVisible(true);
  const handleBlur = () => setIsVisible(false);

  return (
    <div
      className="relative inline-block group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <div
        title={text} // Fallback for basic tooltip functionality
        tabIndex={0}
        role="button"
        aria-describedby={isVisible ? 'tooltip' : undefined}
        className="cursor-help focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-800 rounded"
      >
        {children}
      </div>
      <div
        id="tooltip"
        role="tooltip"
        className={`absolute ${positionClasses[position]} w-max max-w-xs px-3 py-2 bg-slate-900 text-white text-sm rounded-lg shadow-lg border border-slate-700 z-50 transition-opacity duration-200 pointer-events-none ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden={!isVisible}
      >
        {text}
        {/* Arrow */}
        <div
          className={`absolute w-2 h-2 bg-slate-900 border-slate-700 transform rotate-45 ${
            position === 'top'
              ? 'top-full -mt-1 left-1/2 -translate-x-1/2 border-r border-b'
              : position === 'bottom'
                ? 'bottom-full -mb-1 left-1/2 -translate-x-1/2 border-l border-t'
                : position === 'left'
                  ? 'left-full -ml-1 top-1/2 -translate-y-1/2 border-t border-r'
                  : 'right-full -mr-1 top-1/2 -translate-y-1/2 border-b border-l'
          }`}
        />
      </div>
    </div>
  );
};

export default Tooltip;
