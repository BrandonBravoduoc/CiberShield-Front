import React, { Children } from "react";

const Button = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-indigo-500 focus-visible:outline-2"
    >
      {children}
    </button>
  );
};

export default Button;
