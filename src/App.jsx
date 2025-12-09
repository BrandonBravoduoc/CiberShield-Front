import { Routes, Route } from "react-router-dom";   
import Login from "./pages/auth/Login";
import HomePage from "./pages/Home";
import Register from "./pages/auth/Register";
import ProductDetail from "./pages/ProductDetail";

const App = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/" element={<HomePage />} />

        </Routes>
    );
};


//hola
export default App;
