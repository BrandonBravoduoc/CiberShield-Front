import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Text from '../atoms/Text';
import Button from '../atoms/Button';
import SearchBar from '../molecules/SearchBar';
import { useAuth } from '../../context/AuthContext';  

const Navbar = ({ cartCount = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuth(); 

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          <div className="flex items-center shrink-0">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <Text variant="h1" className="text-white font-bold text-xl tracking-wider">
                CiberShield
              </Text>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Inicio
              </Link>
              <Link to="/productos" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Productos
              </Link>
              <Link to="/categorias" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Categorías
              </Link>
            </div>
          </div>

          <div className="hidden lg:block flex-1 max-w-md mx-4">
            <SearchBar />
          </div>
          <div className="hidden md:flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>

              {cartCount > 0 && (
                <span className="absolute top-0 right-0 px-2 py-1 text-xs font-bold text-white bg-red-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            <div className="w-24">
              {isAuthenticated ? (
                <Link to="/profile">
                  <Button className="px-2 py-1.5 text-sm w-36">
                    Perfil de usuario
                  </Button>
                </Link>
              ) : (
                <Link to="/login">
                  <Button>Ingresar</Button>
                </Link>
              )}
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-gray-800 p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
            >
              {!isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">

            <Link to="/" className="block px-3 py-2 text-gray-300 hover:text-white">Inicio</Link>
            <Link to="/productos" className="block px-3 py-2 text-gray-300 hover:text-white">Productos</Link>

            {isAuthenticated ? (
              <Link to="/perfil" className="block px-3 py-2 text-gray-300 hover:text-white">Perfil</Link>
            ) : (
              <Link to="/login" className="block px-3 py-2 text-gray-300 hover:text-white">Ingresar</Link>
            )}

            <div className="pt-4 pb-2 border-t border-gray-700">
              <SearchBar />
            </div>

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
