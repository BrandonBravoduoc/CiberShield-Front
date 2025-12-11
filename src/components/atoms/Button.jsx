import React from "react";

const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      {...props}
      className={`rounded-lg px-4 py-2.5 text-sm font-semibold 
        bg-gradient-to-r from-blue-500 to-cyan-500 text-white
        hover:from-blue-600 hover:to-cyan-600
        focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-800
        transition duration-200 transform hover:scale-105
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
