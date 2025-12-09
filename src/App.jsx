import { Routes, Route } from "react-router-dom";
import AuthLayout from "./components/layouts/AuthLayout";
import Login from "./pages/auth/Login";
import HomePage from "./pages/HomePage";
import Register from "./pages/auth/Register";

const App = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<HomePage />} /> 
        </Routes>
    );
};

export default App;
