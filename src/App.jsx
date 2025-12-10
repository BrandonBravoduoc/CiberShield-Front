import { Routes, Route, Navigate } from "react-router-dom";   
import Login from "./pages/auth/Login";
import HomePage from "./pages/Home";
import Register from "./pages/auth/Register";
import ProductDetail from "./pages/ProductDetail";
import Profile from "./pages/user/Profile";
import Cart from "./pages/Cart";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import ProductForm from "./pages/admin/ProductForm";
import Orders from "./pages/admin/Orders";
import Users from "./pages/admin/Users";
import Checkout from "./pages/checkout/Checkout";
import { isAdmin } from "./utils/JwtUtil";

const ProtectedAdminRoute = ({ element }) => {
  return isAdmin() ? element : <Navigate to="/login" replace />;
};

const App = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/admin" element={<ProtectedAdminRoute element={<Dashboard />} />} />
            <Route path="/admin/products" element={<ProtectedAdminRoute element={<Products />} />} />
            <Route path="/admin/products/new" element={<ProtectedAdminRoute element={<ProductForm />} />} />
            <Route path="/admin/products/edit/:id" element={<ProtectedAdminRoute element={<ProductForm />} />} />
            <Route path="/admin/orders" element={<ProtectedAdminRoute element={<Orders />} />} />
            <Route path="/admin/users" element={<ProtectedAdminRoute element={<Users />} />} />
            <Route path="/" element={<HomePage />} />
        </Routes>
    );
};

export default App;
