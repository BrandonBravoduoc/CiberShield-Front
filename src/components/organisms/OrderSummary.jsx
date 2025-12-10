import React from "react";
import SummaryItem from "../molecules/SummaryItem";

const OrderSummary = ({ cartItems }) => {
  return (
    <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-xl">

      <h2 className="text-xl font-semibold mb-6 text-white">Productos incluidos</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-400">No hay productos en el carrito.</p>
      ) : (
        <ul className="space-y-4">
          {cartItems.map((item) => (
            <SummaryItem key={item.id} item={item} />
          ))}
        </ul>
      )}

    </div>
  );
};

export default OrderSummary;
