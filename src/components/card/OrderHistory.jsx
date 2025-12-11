import React, { useState } from "react";

const OrderHistory = ({ orders }) => {
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const getStatusColor = (status) => {
    if (typeof status === "string") {
      return status.toUpperCase() === "ENTREGADO" ? "text-green-400" : 
             status.toUpperCase() === "CANCELADO" ? "text-red-400" : 
             "text-yellow-400";
    }
    if (typeof status === "object" && status?.name) {
      return status.name.toUpperCase() === "ENTREGADO" ? "text-green-400" : 
             status.name.toUpperCase() === "CANCELADO" ? "text-red-400" : 
             "text-yellow-400";
    }
    return "text-yellow-400";
  };

  const getStatusText = (status) => {
    if (typeof status === "string") return status;
    if (typeof status === "object" && status?.name) return status.name;
    return "Desconocido";
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-xl p-8">
        <h2 className="text-white text-2xl font-bold mb-6">Historial de Pedidos</h2>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">No tienes pedidos registrados aún.</p>
            <p className="text-gray-500 text-sm">Cuando realices tu primer compra, aparecerá aquí.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border border-gray-700 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)}
                  className="w-full p-5 hover:bg-gray-800/50 transition text-left"
                >
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-center">
                    <div>
                      <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Número Pedido</p>
                      <p className="text-white font-medium">{order.orderNumber || `#${order.id}`}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Fecha</p>
                      <p className="text-white font-medium">
                        {order.orderDate ? new Date(order.orderDate).toLocaleDateString("es-CL") : "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Total</p>
                      <p className="text-white font-medium">
                        ${parseFloat(order.total || 0).toLocaleString("es-CL")}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Estado</p>
                      <p className={`font-semibold ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-sm">
                        {expandedOrderId === order.id ? "▼ Ocultar" : "▶ Ver detalles"}
                      </p>
                    </div>
                  </div>
                </button>

                {expandedOrderId === order.id && order.details && order.details.length > 0 && (
                  <div className="bg-gray-800/50 border-t border-gray-700 p-5">
                    <h4 className="text-white font-semibold mb-4">Productos de la orden:</h4>
                    <div className="space-y-3">
                      {order.details.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-4 pb-3 border-b border-gray-700 last:border-b-0">
                          <div className="flex-1">
                            <p className="text-white font-medium">{item.product?.productName || "Producto desconocido"}</p>
                            <p className="text-gray-400 text-sm">Cantidad: {item.quantity} x ${parseFloat(item.unitPrice || 0).toLocaleString("es-CL")}</p>
                            <p className="text-green-400 text-sm">Subtotal: ${parseFloat(item.subtotal || 0).toLocaleString("es-CL")}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
