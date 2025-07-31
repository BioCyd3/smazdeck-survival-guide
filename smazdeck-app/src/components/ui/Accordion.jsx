import React, { useState, useId } from 'react';

const Accordion = ({ title, children, startOpen = false }) => {
  const [isOpen, setIsOpen] = useState(startOpen);
  const contentId = useId();
  const buttonId = useId();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle();
    }
  };

  return (
    <div className="border border-slate-600 rounded-lg">
      <button
        id={buttonId}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className="w-full flex justify-between items-center p-4 bg-slate-700 hover:bg-slate-600 focus:bg-slate-600 rounded-t-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-inset transition-colors duration-200"
        aria-expanded={isOpen}
        aria-controls={contentId}
        type="button"
      >
        <h3 className="text-lg font-semibold text-white text-left">{title}</h3>
        <span
          className={`transform transition-transform duration-200 flex-shrink-0 ml-2 ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          <svg
            className="w-6 h-6 text-slate-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </span>
      </button>
      <div
        id={contentId}
        role="region"
        aria-labelledby={buttonId}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4 bg-slate-800 rounded-b-lg border-t border-slate-600">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
