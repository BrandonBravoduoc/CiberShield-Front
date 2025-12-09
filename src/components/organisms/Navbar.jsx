import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Text from '../atoms/Text';
import SearchBar from '../molecules/SearchBar';
import CategoryDropdown from '../molecules/CategoryDropdown';

import { useAuth } from '../../context/AuthContext'; //

const Navbar = ({ cartCount = 0 }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50 py-3 shadow-md">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-14">
          <div className="flex items-center gap-8 flex-shrink-0">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="h-9 w-9 bg-indigo-500 rounded-lg flex items-center justify-center shadow-lg group-hover:bg-indigo-400 transition-colors">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <Text variant="h1" className="text-white font-bold text-2xl tracking-tight hidden sm:block">
                CiberShield
              </Text>
            </Link>
            <div className="hidden md:block">
              <CategoryDropdown />
            </div>
          </div>
          <div className="hidden md:block flex-1 max-w-3xl">
            <SearchBar />
          </div>
          <div className="flex items-center gap-6 flex-shrink-0">
            {user ? (
              <div className="hidden lg:flex items-center gap-3 group relative">
                <Link to="/profile" className="text-right leading-tight">
                  <div className="text-xs text-gray-400 group-hover:text-indigo-300">Hola, {user.username || "Usuario"}</div>
                  <div className="text-sm font-bold text-white">Mi Cuenta</div>
                </Link>
                <Link to="/profile" className="h-10 w-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg border-2 border-gray-800 group-hover:border-indigo-400 transition-all">
                  {user.username ? user.username.charAt(0).toUpperCase() :
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  }
                </Link>
                <button onClick={logout} className="text-gray-500 hover:text-red-400 ml-2" title="Cerrar Sesión">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            ) : (
              <Link to="/login" className="hidden lg:flex items-center gap-2 text-gray-200 hover:text-indigo-400 transition-colors group">
                <div className="text-right leading-tight">
                  <div className="text-xs text-gray-400 group-hover:text-indigo-300">Bienvenido</div>
                  <div className="text-sm font-bold">Iniciar Sesión</div>
                </div>
                <div className="bg-gray-800 p-1.5 rounded-full group-hover:bg-gray-700 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              </Link>
            )}
            <button className="relative flex items-center gap-2 text-gray-200 hover:text-indigo-400 transition-colors group">
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 inline-flex items-center justify-center w-5 h-5 text-xs font-bold leading-none text-white bg-indigo-600 rounded-full border-2 border-gray-900">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden xl:block font-semibold text-sm">Tu Carrito</span>
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-gray-300 hover:text-white">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        <div className="md:hidden mt-4 pb-2">
          <SearchBar />
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700 absolute w-full left-0 shadow-xl z-40">
          <div className="px-4 py-4 space-y-4">
            {user ? (
              <div className="border-b border-gray-700 pb-4 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                    {user.username?.charAt(0) || "U"}
                  </div>
                  <div>
                    <div className="text-white font-bold">Hola, {user.username}</div>
                    <Link to="/profile" className="text-xs text-indigo-400">Ver mi perfil</Link>
                  </div>
                </div>
                <button onClick={logout} className="text-red-400 text-sm font-medium hover:text-red-300 w-full text-left">
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <Link to="/login" className="block text-gray-200 font-medium p-2 bg-gray-700 rounded text-center">
                Iniciar Sesión
              </Link>
            )}
            <Link to="/admin/products/new" className="block text-indigo-400 font-medium">+ Crear Producto</Link>
            <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2 mt-4">Categorías</div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;