import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [term, setTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (term.trim()) {
      navigate(`/?search=${encodeURIComponent(term)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full">
      <input
        type="text"
        className="w-full bg-white text-gray-900 rounded-lg pl-4 pr-12 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500 shadow-sm"
        placeholder="Busca productos, marcas y más..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <button
        type="submit"
        className="absolute right-0 top-0 h-full px-4 text-gray-500 hover:text-indigo-600 transition-colors flex items-center justify-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </form>
  );
};

export default SearchBar;