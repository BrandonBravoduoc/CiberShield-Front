import DynamicForm from "../../components/organisms/DynamicForm";
import { loginData } from "./data/AuthData";
import AuthLayout from "../../components/layouts/AuthLayout";
import { useState } from "react";
import authService from "../../services/auth/authService";

const Login = () => {
  const [serverErrors, setServerErrors] = useState({});

  const handleLogin = async (formData) => {
    try {
      const res = await authService.login(formData);
      console.log("Login exitoso:", res.data);
      setServerErrors({});
      
    } catch (error) {
      if (error.response && error.response.data) {
        setServerErrors(error.response.data);
      } else {
        setServerErrors({ general: "Error inesperado" });
      }
    }
  };

  return (
    <AuthLayout 
      title="Iniciar Sesión"
      subtitle="Accede con tu cuenta para continuar"
    >
      <DynamicForm
        fields={loginData}
        buttonText="Entrar"
        onSubmit={handleLogin}
        serverErrors={serverErrors}
      />
    </AuthLayout>
  );
};

export default Login;
