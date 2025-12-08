import DynamicForm from "../../components/organisms/DynamicForm";
import { loginData } from "./data/authData";
import AuthLayout from "../../components/layouts/AuthLayout";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [serverErrors, setServerErrors] = useState({});

  const handleLogin = async (formData) => {
    try {
      const res = await axios.post("/api/auth/login", formData);
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
