import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DynamicForm from "../../components/organisms/DynamicForm";
import { loginData } from "./data/AuthData";
import authService from "../../services/auth/authService";
import AuthLayout from "../../components/layouts/AuthLayout";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [serverErrors, setServerErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (formData) => {
    try {
      const res = await authService.login(formData);

      if (res.token) {
        login(res.user, res.token);
        navigate("/");
      }
    } catch (error) {
      setServerErrors({
        general: error.response?.data?.error || "Error inesperado"
      });
    }
  };

  return (
    <AuthLayout
      title="Sign in to your account"
      subtitle="Ingresa tus credenciales para continuar"
    >
      <DynamicForm
        fields={loginData}
        buttonText="Sign in"
        onSubmit={handleLogin}
        serverErrors={serverErrors}
      />
      <p className="mt-10 text-center text-sm text-gray-400">
        ¿No tienes cuenta?{" "}
        <a href="/register" className="font-semibold text-indigo-400 hover:text-indigo-300">
          Crear una cuenta
        </a>
      </p>
    </AuthLayout>
  );
};

export default Login;
