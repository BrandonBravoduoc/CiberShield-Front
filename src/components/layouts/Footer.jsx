import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10 text-center">

        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} CiberShield. Todos los derechos reservados.
        </p>

        <p className="text-gray-600 text-xs mt-2">
          Desarrollado por Brandon Bravo
        </p>

      </div>
    </footer>
  );
};

export default Footer;
