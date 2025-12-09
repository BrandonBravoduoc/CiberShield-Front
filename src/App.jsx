import { Routes, Route } from "react-router-dom";
import AuthLayout from "./components/layouts/AuthLayout";
import Login from "./pages/auth/Login";
import Home from "./pages/Home"; 

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            
            <Route path="/login" element={<AuthLayout />}>
                 <Route index element={<Login />} />
            </Route>
        </Routes>
    );
};

export default App;