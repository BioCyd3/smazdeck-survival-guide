import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm, placeholder }) => {
  return (
    <div className="my-4">
      <input
        type="text"
        placeholder={placeholder || 'Search...'}
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 bg-slate-700 text-slate-200 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
      />
    </div>
  );
};

export default SearchBar;
