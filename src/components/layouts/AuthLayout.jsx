import React from "react";  
import { Outlet } from "react-router-dom";

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 px-4">
      
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 flex flex-col gap-4">
        
        {title && (
          <h1 className="text-2xl font-bold text-center text-gray-800">
            {title}
          </h1>
        )}

        {subtitle && (
          <p className="text-center text-gray-500 -mt-2 mb-4">
            {subtitle}
          </p>
        )}

        {children}
      </div>
    </div>
  );
};

export default AuthLayout;