import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductService from '../services/product/ProductService'; 
import ProductDetailTemplate from '../components/templates/ProductDetailTemplate';

const ProductDetail = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await ProductService.getProductById(id);
        setProduct(response.data);
      } catch (err) {
        console.error("Error al cargar producto:", err);
        setError("No se pudo cargar la información del producto.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = (product) => {
    console.log("Agregando al carrito:", product);
    setCartCount(prev => prev + 1);
  };

  return (
    <ProductDetailTemplate
      product={product}
      loading={loading}
      error={error}
      onAddToCart={handleAddToCart}
      cartCount={cartCount}
    />
  );
};

export default ProductDetail;