import React from 'react';
import ProductCard from '../molecules/ProductCard';
import Text from '../atoms/Text';

const ProductList = ({ products, onAddToCart }) => {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-20">
        <Text className="text-gray-500 text-xl">No hay productos disponibles por el momento.</Text>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default ProductList;