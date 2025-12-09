import React, { useEffect, useState } from 'react';
import ProductService from '../services/product/ProductService';
import HomeTemplate from '../components/templates/HomeTemplate';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartCount, setCartCount] = useState(0); // Estado para el contador del carrito

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await ProductService.getAllProducts();
        setProducts(response.data);
      } catch (err) {
        console.error("Error al cargar productos:", err);
        setError("Hubo un problema al cargar los productos. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    console.log("Producto agregado:", product);
    setCartCount(prev => prev + 1); // Simulación simple de agregar al carrito
    // Aquí podrías guardar en localStorage o Context
  };

  return (
    <HomeTemplate 
      products={products} 
      loading={loading} 
      error={error}
      onAddToCart={handleAddToCart}
      cartCount={cartCount} // Pasamos el dato a la plantilla
    />
  );
};

export default Home;