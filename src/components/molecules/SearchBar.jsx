import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const SearchBar = () => {
  const [term, setTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?search=${encodeURIComponent(term)}`);
  };

  return (
    <form onSubmit={handleSearch} className="relative">
        <input 
            type="text"
            className="bg-gray-800 text-white rounded-lg pl-3 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-64"
            placeholder="Buscar..."
            value={term}
            onChange={(e) => setTerm(e.target.value)}
        />
        <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </button>
    </form>
  );
};

export default SearchBar;