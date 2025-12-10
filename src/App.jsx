import { Routes, Route } from "react-router-dom";   
import Login from "./pages/auth/Login";
import HomePage from "./pages/Home";
import Register from "./pages/auth/Register";
import ProductDetail from "./pages/ProductDetail";
import Profile from "./pages/user/Profile";
import Cart from "./pages/Cart";

const App = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/" element={<HomePage />} />
        </Routes>
    );
};


//hola
export default App;
