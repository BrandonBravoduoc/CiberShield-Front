import React from "react";
import Button from "../atoms/Button";

const CartSummary = ({ total, onCheckout }) => {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 h-max">
      <h3 className="text-xl font-bold text-white mb-4">Resumen</h3>

      <p className="text-gray-400 text-sm">Total a pagar</p>
      <p className="text-3xl font-bold text-white mb-6">
        ${total.toLocaleString("es-CL")}
      </p>

      <Button onClick={onCheckout} className="w-full">
        Finalizar compra
      </Button>
    </div>
  );
};

export default CartSummary;
