import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DynamicForm from "../../components/organisms/DynamicForm";
import { registerData } from "./data/AuthData";
import authService from "../../services/auth/authService";
import AuthLayout from "../../components/layouts/AuthLayout";

const Register = () => {
  const [serverErrors, setServerErrors] = useState({});
  const navigate = useNavigate();

  const handleRegister = async (formData) => {
    try {
      console.log("FORM DATA A ENVIAR:", formData);

      const res = await authService.register(formData);

      console.log("REGISTRO EXITOSO:", res);

      navigate("/login");

    } catch (error) {
      console.log("ERROR COMPLETO DEL BACKEND:", error.response);

      const backendError =
        error.response?.data?.error ||       // Tu backend lo envía así
        error.response?.data?.message ||     // Otras posibles respuestas
        JSON.stringify(error.response?.data) ||
        "Error inesperado";

      setServerErrors({
        general: backendError,
      });
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Ingresa tu información para registrarte"
    >
      <DynamicForm
        fields={registerData}
        buttonText="Registrarse"
        onSubmit={handleRegister}
        serverErrors={serverErrors}
      />

      <p className="mt-10 text-center text-sm text-gray-400">
        ¿Ya tienes cuenta?{" "}
        <a
          href="/login"
          className="font-semibold text-indigo-400 hover:text-indigo-300"
        >
          Iniciar sesión
        </a>
      </p>
    </AuthLayout>
  );
};

export default Register;
