import React from "react";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";

const ProfileLayout = ({ children, onChangeView, currentView }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-950">

      <Header onChangeView={onChangeView} currentView={currentView} />

      <main className="grow max-w-4xl mx-auto w-full px-4 py-12">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default ProfileLayout;
