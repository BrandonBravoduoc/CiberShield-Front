import React, { Children } from "react";

const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      {...props}
      className={`rounded-md px-3 py-1.5 text-sm font-semibold text-black 
        bg-white hover:bg-gray-200 
        focus-visible:outline-gray-400 focus-visible:outline-2
        ${className}`}
    >
      {children}
    </button>
  );
};


export default Button;
