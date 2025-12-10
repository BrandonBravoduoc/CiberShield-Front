import React from "react";
import Navbar from "../organisms/Navbar";
import Footer from "../layouts/Footer";

const CheckoutTemplate = ({
  summaryComponent,
  paymentComponent,
  subtotal,
  shippingCost,
  total,
}) => {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <Navbar />

      <main className="grow max-w-6xl mx-auto px-6 py-12 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          <div className="w-full">{summaryComponent}</div>

          <div className="w-full">{paymentComponent}</div>

        </div>

        <div className="mt-10 w-full border-t border-gray-800 pt-6 flex flex-col items-end text-lg">
          <p className="text-gray-300">Subtotal: ${subtotal.toLocaleString("es-CL")}</p>

          <p className="text-gray-300">
            Envío: ${shippingCost.toLocaleString("es-CL")}
          </p>

          <p className="text-2xl font-bold text-white mt-2">
            Total: ${total.toLocaleString("es-CL")}
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutTemplate;
