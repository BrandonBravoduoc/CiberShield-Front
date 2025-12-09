import React, { Children } from "react";

const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      {...props}
      className={`rounded-md px-3 py-1.5 text-sm font-semibold text-white 
        bg-indigo-500 hover:bg-indigo-400 
        focus-visible:outline-indigo-500 focus-visible:outline-2
        ${className}`}
    >
      {children}
    </button>
  );
};


export default Button;
