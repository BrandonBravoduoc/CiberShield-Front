import { Routes, Route } from "react-router-dom";   
import Login from "./pages/auth/Login";
import HomePage from "./pages/Home";
import Register from "./pages/auth/Register";
import Profile from "./pages/user/Profile";

const App = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<HomePage />} /> 
        </Routes>
    );
};

export default App;
