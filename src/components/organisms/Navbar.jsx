import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Text from '../atoms/Text';
import SearchBar from '../molecules/SearchBar';

const Navbar = ({ cartCount = 0 }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50 py-3 shadow-md">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-14">
          
          {/* 1. SECCIÓN IZQUIERDA: Logo + Categorías */}
          <div className="flex items-center gap-6 flex-shrink-0">
            {/* Logo con tu color original */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="h-9 w-9 bg-indigo-500 rounded-lg flex items-center justify-center shadow-lg group-hover:bg-indigo-400 transition-colors">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <Text variant="h1" className="text-white font-bold text-2xl tracking-tight hidden sm:block">
                CiberShield
              </Text>
            </Link>

            {/* Botón Categorías (Mismo estilo, color índigo) */}
            <button className="hidden md:flex items-center gap-2 text-gray-200 hover:text-indigo-400 transition-colors font-semibold text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                Categorías
            </button>
          </div>

          {/* 2. SECCIÓN CENTRAL: Buscador Blanco */}
          <div className="hidden md:block flex-1 max-w-3xl">
             <SearchBar />
          </div>

          {/* 3. SECCIÓN DERECHA: Acciones */}
          <div className="flex items-center gap-6 flex-shrink-0">
            
            {/* Login / Mi Cuenta */}
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

            {/* Carrito */}
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

            {/* Menú Móvil */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-300 hover:text-white"
            >
               <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
               </svg>
            </button>
          </div>
        </div>

        {/* 4. BUSCADOR EN MÓVIL (Fila extra) */}
        <div className="md:hidden mt-4 pb-2">
            <SearchBar />
        </div>
      </div>

      {/* Menú Desplegable Móvil */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700 absolute w-full left-0 shadow-xl">
          <div className="px-4 py-4 space-y-4">
            <Link to="/categorias" className="flex items-center gap-3 text-gray-300 hover:text-indigo-400 font-medium p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                Ver Categorías
            </Link>
            <Link to="/login" className="flex items-center gap-3 text-gray-300 hover:text-indigo-400 font-medium p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                Iniciar Sesión
            </Link>
            <Link to="/admin/products/new" className="flex items-center gap-3 text-indigo-400 hover:text-indigo-300 font-medium p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
                <span>+</span> Crear Producto
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;