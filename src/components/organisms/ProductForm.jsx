import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DynamicForm from "./DynamicForm";
import ProductService from "../../services/product/ProductService";
import SubCategoryService from "../../services/product/SubCategoryService";
import TradeMarkService from "../../services/product/TradeMarkService";
import CategoryService from "../../services/product/CategoryService";

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [tradeMarks, setTradeMarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serverErrors, setServerErrors] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [cats, subCats, marks] = await Promise.all([
          CategoryService.getAllCategories(),
          SubCategoryService.getAllSubCategories(),
          TradeMarkService.getAllTradeMarks(),
        ]);

        setCategories(cats.data || []);
        setSubCategories(subCats.data || []);
        setTradeMarks(marks.data || []);

        if (id) {
          const prod = await ProductService.getProductById(id);
          setProduct(prod.data);
          const catId = cats.data?.find(c => c.categoryName === prod.data.categoryName)?.id || "";
          setSelectedCategory(catId);
        }
      } catch (err) {
        console.error("Error cargando datos:", err);
        setServerErrors(["Error al cargar los datos"]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const getFilteredSubCategories = () => selectedCategory 
    ? subCategories.filter(sc => sc.category?.id == selectedCategory)
    : [];

  const fields = [
    { name: "productName", label: "Nombre del Producto", type: "text", placeholder: "Ej: Antivirus Premium" },
    { name: "stock", label: "Stock", type: "number", placeholder: "Ej: 100" },
    { name: "price", label: "Precio", type: "number", placeholder: "Ej: 49.99" },
    { name: "image", label: "Imagen del Producto", type: "file" },
    { name: "category", label: "Categoría", type: "select", options: categories.map((cat) => ({ value: cat.id, label: cat.categoryName || cat.name })) },
    { name: "subCategory", label: "Subcategoría", type: "select", disabled: !selectedCategory, options: getFilteredSubCategories().map((sc) => ({ value: sc.id, label: sc.subCategoryName || sc.name })) },
    { name: "tradeMark", label: "Marca", type: "select", options: tradeMarks.map((tm) => ({ value: tm.id, label: tm.tradeMarkName || tm.name })) },
  ];

  const initialValues = product ? {
    productName: product.productName || "",
    stock: product.stock || "",
    price: product.price || "",
    image: "",
    category: categories.find(c => c.categoryName === product.categoryName)?.id || "",
    subCategory: subCategories.find(sc => sc.subCategoryName === product.subCategoryName)?.id || "",
    tradeMark: tradeMarks.find(tm => tm.tradeMarkName === product.tradeMarkName)?.id || "",
  } : {};

  const handleSubmit = async (formData) => {
    try {
      setServerErrors(null);
      const form = new FormData();
      form.append("productName", formData.productName);
      form.append("stock", parseInt(formData.stock));
      form.append("price", parseFloat(formData.price));
      form.append("subCategoryId", formData.subCategory || "");
      form.append("tradeMarkId", formData.tradeMark || "");
      if (formData.image) form.append("image", formData.image);

      id ? await ProductService.updateProduct(id, form) : await ProductService.createProduct(form);
      navigate("/admin/products");
    } catch (err) {
      setServerErrors([err.response?.data?.message || "Error al guardar producto"]);
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
      <h2 className="text-2xl font-semibold mb-6">
        {id ? "Editar Producto" : "Nuevo Producto"}
      </h2>
      <DynamicForm
        fields={fields}
        initialValues={initialValues}
        buttonText={id ? "Actualizar" : "Crear"}
        onSubmit={handleSubmit}
        serverErrors={serverErrors}
        onFieldChange={(name) => name === "category" && setSelectedCategory(arguments[1])}
      />
    </div>
  );
};

export default ProductForm;
