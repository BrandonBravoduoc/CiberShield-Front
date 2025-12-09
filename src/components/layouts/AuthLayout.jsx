import React from "react";  
import { Outlet } from "react-router-dom";

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
          alt="Your Company"
          className="mx-auto h-10 w-auto"
        />

        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-white">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-2 text-center text-sm text-gray-400">
            {subtitle}
          </p>
        )}
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
