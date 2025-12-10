import AdminTemplate from "../../components/templates/AdminTemplate";
import ProductForm from "../../components/organisms/ProductForm";

const ProductFormPage = () => {
  return (
    <AdminTemplate activeMenu="products">
      <div className="max-w-2xl mx-auto">
        <ProductForm />
      </div>
    </AdminTemplate>
  );
};

export default ProductFormPage;
