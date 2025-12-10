import React from 'react';
import { Link } from 'react-router-dom'; // Importamos Link
import Image from '../atoms/Image';
import Text from '../atoms/Text';
import Button from '../atoms/Button';

const ProductCard = ({ product, onAddToCart }) => {
  const { id, productName, price, imageUrl, tradeMarkName, categoryName } = product;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full border border-gray-100 group">
      <Link to={`/product/${id}`} className="block h-48 w-full overflow-hidden bg-gray-50 items-center justify-center p-4">
        <Image 
          src={imageUrl || "https://placehold.co/300x300?text=Imagen"}
          alt={productName} 
          className="object-contain h-full w-full group-hover:scale-105 transition-transform duration-300" 
        />
      </Link>

      <div className="p-5 flex flex-col grow">
        <div className="mb-2">
            <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider">
                {tradeMarkName} • {categoryName}
            </span>
        </div>  
        <Link to={`/product/${id}`}>
            <Text variant="h3" className="text-lg font-semibold text-gray-800 mb-2 truncate hover:text-indigo-600 transition-colors">
            {productName}
            </Text>
        </Link>
        
        <Text variant="p" className="text-2xl font-bold text-gray-900 mt-auto">
          ${price?.toLocaleString('es-CL')}
        </Text>

        <div className="mt-4">
          <Button 
            onClick={() => onAddToCart(product)}
            className="!bg-gray-900 hover:!bg-gray-800 !text-white !focus-visible:outline-gray-900"
          >
            Agregar al Carrito
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;