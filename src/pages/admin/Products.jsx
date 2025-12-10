import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminTemplate from "../../components/templates/AdminTemplate";
import DynamicTable from "../../components/organisms/DynamicTable";
import Button from "../../components/atoms/Button";
import ProductService from "../../services/product/ProductService";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await ProductService.getAllProducts();
      setProducts(response.data || []);
    } catch (err) {
      console.error("Error cargando productos:", err);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { key: "id", label: "ID" },
    { key: "productName", label: "Producto" },
    { key: "categoryName", label: "Categoría" },
    { key: "subCategoryName", label: "Subcategoría" },
    { key: "tradeMarkName", label: "Marca" },
    { key: "price", label: "Precio" },
  ];

  const actions = [
    {
      id: "edit",
      label: "Editar",
      handler: (row) => navigate(`/admin/products/edit/${row.id}`),
    },
    {
      id: "delete",
      label: "Eliminar",
      variant: "danger",
      handler: (row) => handleDelete(row.id),
    },
  ];

  const handleDelete = async (id) => {
    if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      try {
        await ProductService.deleteProduct(id);
        fetchProducts();
      } catch (err) {
        console.error("Error eliminando producto:", err);
      }
    }
  };

  if (loading) return <AdminTemplate activeMenu="products"><p>Cargando...</p></AdminTemplate>;

  return (
    <AdminTemplate activeMenu="products">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Productos</h1>
        <Button onClick={() => navigate("/admin/products/new")}>
          + Nuevo Producto
        </Button>
      </div>
      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
        <DynamicTable
          columns={columns}
          data={products}
          actions={actions}
          emptyMessage="No hay productos"
        />
      </div>
    </AdminTemplate>
  );
};

export default Products;
