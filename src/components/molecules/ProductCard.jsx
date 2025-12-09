import React from 'react';
import Image from '../atoms/Image';
import Text from '../atoms/Text';
import Button from '../atoms/Button';

const ProductCard = ({ product, onAddToCart }) => {
  const { productName, price, imageUrl, tradeMarkName, categoryName } = product;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full border border-gray-100">
      <div className="h-48 w-full overflow-hidden bg-gray-50 flex items-center justify-center p-4">
        <Image
          src={imageUrl || "https://via.placeholder.com/300"}
          alt={productName}
          className="object-contain h-full w-full"
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-2">
          <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider">
            {tradeMarkName} • {categoryName}
          </span>
        </div>
        <Text variant="h3" className="text-lg font-semibold text-gray-800 mb-2 truncate">
          {productName}
        </Text>

        <Text variant="p" className="text-2xl font-bold text-gray-900 mt-auto">
          ${price?.toLocaleString('es-CL')}
        </Text>
        <div className="mt-4">
          <Button onClick={() => onAddToCart(product)}>
            Agregar al Carrito
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;