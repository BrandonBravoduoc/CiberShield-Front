import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-gray-900 border-b border-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-indigo-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">C</span>
          </div>

          <h1 className="text-xl text-white font-semibold tracking-wide">
            CiberShield
          </h1>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
        >
          Regresar
        </button>

      </div>
    </header>
  );
};

export default Header;
