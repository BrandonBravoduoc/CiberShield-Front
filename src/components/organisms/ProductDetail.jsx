import React from 'react';
import Image from '../atoms/Image';
import Text from '../atoms/Text';
import Button from '../atoms/Button';

const ProductDetailInfo = ({ product, onAddToCart }) => {
  if (!product) return null;
  const { productName, price, description, imageUrl, stock, tradeMarkName, categoryName } = product;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 p-6 md:p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex items-center justify-center bg-gray-50 rounded-lg p-4 h-96">
          <Image
            src={imageUrl || "https://via.placeholder.com/600"}
            alt={productName}
            className="object-contain max-h-full max-w-full"
          />
        </div>
        <div className="flex flex-col justify-center space-y-4">
          <div>
            <span className="text-sm font-bold text-indigo-500 uppercase tracking-wider">
              {tradeMarkName} • {categoryName}
            </span>
            <Text variant="h1" className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
              {productName}
            </Text>
          </div>  
          <div className="border-t border-b border-gray-200 py-4 my-4">
            <div className="flex items-center justify-between">
              <Text className="text-3xl font-bold text-gray-900">
                ${price?.toLocaleString('es-CL')}
              </Text>
              <div className={`px-3 py-1 rounded-full text-sm font-bold ${stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {stock > 0 ? `En Stock: ${stock}` : 'Agotado'}
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button
              onClick={() => onAddToCart(product)}
              disabled={stock <= 0}
              className="w-full md:w-auto py-3 px-8 text-lg"
            >
              {stock > 0 ? 'Añadir al Carrito' : 'Sin Stock'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailInfo;