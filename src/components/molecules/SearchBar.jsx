import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const SearchBar = () => {
  const [term, setTerm] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const currentSearch = searchParams.get('search') || '';
    setTerm(currentSearch);
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (term.trim()) {
      navigate(`/?search=${encodeURIComponent(term)}`);
    } else {
      navigate('/');
    }
  };
  const handleClear = () => {
    setTerm('');
    navigate('/');
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
      <div className="absolute right-0 top-0 h-full flex items-center pr-2">
        {term && (
          <button
            type="button"
            onClick={handleClear}
            className="p-1 text-gray-400 hover:text-gray-600 rounded-full mr-1 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </button>
        )}
        <button
          type="submit"
          className="px-2 text-gray-500 hover:text-indigo-600 transition-colors border-l border-gray-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;