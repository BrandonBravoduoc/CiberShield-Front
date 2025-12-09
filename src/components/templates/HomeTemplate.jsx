import React from 'react';
import Navbar from '../organisms/Navbar';
import Footer from '../layouts/Footer';
import ProductList from '../organisms/ProductList';
import Text from '../atoms/Text';

const HomeTemplate = ({ products, loading, error, onAddToCart, cartCount }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar cartCount={cartCount} />
      <main className="grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div className="mb-8 text-center md:text-left">
          <Text variant="h1" className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Nuestros Productos
          </Text>
          <Text variant="p" className="mt-2 text-lg text-gray-600">
            Hardware de alto rendimiento para tu seguridad y gaming.
          </Text>
        </div>

        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <Text>{error}</Text>
          </div>
        )}

        {!loading && !error && (
          <ProductList products={products} onAddToCart={onAddToCart} />
        )}

      </main>
      <Footer />
    </div>
  );
};

export default HomeTemplate;
