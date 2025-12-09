import { Routes, Route } from "react-router-dom";
import AuthLayout from "./components/layouts/AuthLayout";
import Login from "./pages/auth/Login";

const App = () => {
    return (
        <Routes>
            <Route path="/login" element={<AuthLayout/>} />
             <Route index element={<Login/>} />
        </Routes>
    );
};

export default App;
