import { useState } from "react";
import DynamicForm from "../../components/organisms/DynamicForm";
import { loginData } from "./data/AuthData";
import authService from "../../services/auth/authService";

const Login = () => {
  const [serverErrors, setServerErrors] = useState({});

  const handleLogin = async (formData) => {
    try {
      const res = await authService.login(formData);
      console.log("Login exitoso:", res);
      setServerErrors({});
    } catch (error) {
      setServerErrors(error.response?.data || { general: "Error inesperado" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
          alt="Your Company"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-white">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

        {/* 🚀 DynamicForm reemplaza el form original */}
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

      </div>
    </div>
  );
};

export default Login;
