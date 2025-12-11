import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DynamicForm from "../../components/organisms/DynamicForm";
import { loginData } from "./data/AuthData";
import authService from "../../services/auth/AuthService";
import AuthLayout from "../../components/layouts/AuthLayout";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [serverErrors, setServerErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (formData) => {
    try {
      setServerErrors({});

      const data = await authService.login(formData); 
      if (data.token) {
        const normalizedUser = {
          ...data.user,
          username: data.user.userName
        };

        login(normalizedUser, data.token);
        navigate("/");
      }

    } catch (error) {
      console.error("Login error:", error);

      setServerErrors({
        general: error.response?.data?.error || "Credenciales inválidas"
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
