import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Forms from "../../components/templates/Forms";
import loginData from "./data/LoginData";

const Login = () => {
    const [form, setForm] = useState({ correo: "", contrasena: "" });
    const navigate = useNavigate();

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Enviando:", form);
    };

    const formDataWithHandlers = loginData.map((item, index) => {
        if (item.type === "inputs") {
            return {
                ...item,
                inputs: item.inputs.map((input) => ({
                    ...input,
                    value: form[input.name] || "",
                    onChange: handleChange,
                })),
            };
        }

        if (item.type === "button") {
            return {
                ...item,
                onClick: handleSubmit,
                key: index,
            };
        }

        return { ...item, key: index };
    });

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-900">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md space-y-10 rounded-2xl bg-white/10 p-10 backdrop-blur-xl shadow-2xl"
            >
                <Forms content={formDataWithHandlers} />
            </form>
        </main>
    );
};

export default Login;
