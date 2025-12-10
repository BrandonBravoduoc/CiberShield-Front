import React from "react";
import { useAuth } from "../../context/AuthContext";

const Header = ({ onChangeView, currentView }) => {
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

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
        <div className="flex items-center gap-6">
          <button
            onClick={() =>
              onChangeView(currentView === "profile" ? "orders" : "profile")
            }
            className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
          >
            {currentView === "profile" ? "Historial" : "Ver Perfil"}
          </button>
          <button
            onClick={() => (window.location.href = "/")}
            className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
          >
            Regresar
          </button>
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="text-red-400 hover:text-red-200 text-sm font-medium transition-colors"
            >
              Cerrar sesión
            </button>
          )}

        </div>
      </div>
    </header>
  );
};

export default Header;
