import { Routes, Route } from "react-router-dom";   
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
import CheckOut from "./pages/checkout/CheckOut";

const App = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/products" element={<Products />} />
            <Route path="/admin/products/new" element={<ProductForm />} />
            <Route path="/admin/products/edit/:id" element={<ProductForm />} />
            <Route path="/admin/orders" element={<Orders />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/" element={<HomePage />} />
        </Routes>
    );
};

export default App;
