import React from "react";

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M13 7H7v6h6V7z" />
                <path
                  fillRule="evenodd"
                  d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2V2a1 1 0 112 0v1h1a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2h1a2 2 0 01-2 2h-1v1a1 1 0 11-2 0v-1h-2v1a1 1 0 11-2 0v-1H7a2 2 0 01-2-2v-1H4a1 1 0 110-2h1V9H4a1 1 0 110-2h1V5a2 2 0 012-2h1V2zM9 5a1 1 0 00-1 1v8a1 1 0 001 1h2a1 1 0 001-1V6a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
              CiberShield
            </h1>
            <h2 className="text-xl font-semibold text-white mb-2">{title}</h2>
            {subtitle && (
              <p className="text-gray-400 text-sm">{subtitle}</p>
            )}
          </div>

          <div className="space-y-6">
            {children}
          </div>
        </div>

        <p className="text-center text-gray-500 text-xs mt-6">
          © 2025 CiberShield. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
