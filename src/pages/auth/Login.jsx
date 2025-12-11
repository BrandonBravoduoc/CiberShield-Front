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
      title="Bienvenido de vuelta"
      subtitle="Inicia sesión para continuar"
    >
      <DynamicForm
        fields={loginData}
        buttonText="Iniciar sesión"
        onSubmit={handleLogin}
        serverErrors={serverErrors}
      />

      <div className="pt-4 border-t border-gray-700">
        <p className="text-center text-gray-400 text-sm">
          ¿No tienes cuenta?{" "}
          <a 
            href="/register" 
            className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Crear una cuenta
          </a>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;
