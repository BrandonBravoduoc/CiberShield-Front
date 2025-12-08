import { Routes, Route } from "react-router-dom";


import Login from "./pages/Login/LoginPage";
import Home from "./pages/Home/HomePage"; 

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<h1 className="text-white text-center mt-20">404 Not Found</h1>} />
        </Routes>
    );
};

export default App;
