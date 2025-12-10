import React from "react";

const OrderHistory = ({ orders }) => {
  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
      <h2 className="text-white text-xl mb-4">Historial de Pedidos</h2>

      {orders.length === 0 ? (
        <p className="text-gray-400">No tienes pedidos registrados.</p>
      ) : (
        <ul className="text-gray-300 space-y-3">
          {orders.map((order) => (
            <li
              key={order.id}
              className="p-4 border border-gray-700 rounded-lg hover:bg-gray-800 transition"
            >
              <p><strong>ID Pedido:</strong> {order.id}</p>
              <p><strong>Estado:</strong> {order.status}</p>
              <p><strong>Total:</strong> ${order.total}</p>
              <p><strong>Fecha:</strong> {order.createdAt}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;
