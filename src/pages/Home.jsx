import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductService from '../services/product/ProductService';
import HomeTemplate from '../components/templates/HomeTemplate';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') || '';
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        const response = await ProductService.getAllProducts();
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.warn("Formato de respuesta inesperado:", response.data);
          setProducts([]);
        }
      } catch (err) {
        console.error("Error al cargar productos:", err);
        setError("Hubo un problema al cargar el catálogo. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);
  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;

    const lowerSearch = searchTerm.toLowerCase();

    return products.filter((product) => {
      const name = product.productName?.toLowerCase() || '';
      const brand = product.tradeMarkName?.toLowerCase() || '';
      const category = product.categoryName?.toLowerCase() || '';
      const subCategory = product.subCategoryName?.toLowerCase() || ''
      return (
        name.includes(lowerSearch) ||
        brand.includes(lowerSearch) ||
        category.includes(lowerSearch) ||
        subCategory.includes(lowerSearch)
      );
    });
  }, [searchTerm, products]);
  const handleAddToCart = (product) => {
    console.log(`Agregado al carrito: ${product.productName}`);
    setCartCount(prev => prev + 1);
  };
  return (
    <HomeTemplate
      products={filteredProducts}
      loading={loading}
      error={error}
      onAddToCart={handleAddToCart}
      cartCount={cartCount}
    />
  );
};

export default Home;