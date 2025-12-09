import React from "react";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";

const ProfileLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-950">

      {/* HEADER */}
      <Header />

      {/* CONTENIDO CENTRAL */}
      <main className="grow max-w-4xl mx-auto w-full px-4 py-12">
        {children}
      </main>

      {/* FOOTER */}
      <Footer />

    </div>
  );
};

export default ProfileLayout;
