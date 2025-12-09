import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom'; 
import ProductService from '../services/product/ProductService';
import HomeTemplate from '../components/templates/HomeTemplate';

const Home = () => {
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') || ''; 

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        console.log("1. Iniciando petición a la API..."); 
        
        const response = await ProductService.getAllProducts();
        
        console.log("2. Respuesta completa de la API:", response);
        console.log("3. Datos (response.data):", response.data); 

        if (Array.isArray(response.data)) {
            setProducts(response.data);
        } else {
            console.error("4. ERROR: Los datos no son un array. Son:", typeof response.data);
            setError("Formato de datos incorrecto recibido del servidor.");
        }

      } catch (err) {
        console.error("ERROR FATAL en fetch:", err);
        setError("No se pudieron cargar los productos.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []); 

  const filteredProducts = useMemo(() => {
    console.log("5. Buscando:", searchTerm); 
    console.log("6. Productos disponibles para filtrar:", products);

    if (!searchTerm) return products;

    return products.filter((product) => {
        if (!product.productName) {
            console.warn("Producto sin nombre detectado:", product);
            return false;
        }
        return product.productName.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [searchTerm, products]);

  console.log("7. Productos filtrados resultantes:", filteredProducts); 

  return (
    <HomeTemplate 
      products={filteredProducts} 
      loading={loading} 
      error={error}
      onAddToCart={() => {}}
      cartCount={0}
    />
  );
};

export default Home;