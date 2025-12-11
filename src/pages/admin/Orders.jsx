import { useState, useEffect } from "react";
import AdminTemplate from "../../components/templates/AdminTemplate";
import DynamicTable from "../../components/organisms/DynamicTable";
import OrderService from "../../services/order/OrderService";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await OrderService.getAllOrders();
      setOrders(response.data || []);
    } catch (err) {
      console.error("Error cargando pedidos:", err);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { key: "orderNumber", label: "Número Pedido" },
    { key: "orderDate", label: "Fecha" },
    { key: "total", label: "Total" },
    { 
      key: "user.email", 
      label: "Correo Usuario",
      render: (row) => row.user?.email || "N/A"
    },
    { 
      key: "status.name", 
      label: "Estado",
      render: (row) => row.status?.name || "PENDIENTE"
    },
  ];

  const actions = [
    {
      id: "details",
      label: "Ver Detalles",
      variant: "info",
      handler: (row) => {
        setSelectedOrder(row);
        setShowDetailsModal(true);
      },
    },
    {
      id: "status",
      label: "Cambiar Estado",
      variant: "primary",
      handler: (row) => {
        setSelectedOrder(row);
        setShowStatusModal(true);
      },
    },
  ];

  const handleStatusChange = async (newStatus) => {
    if (!selectedOrder) return;
    
    try {
      await OrderService.patchOrderStatus(selectedOrder.id, { name: newStatus });
      setShowStatusModal(false);
      setSelectedOrder(null);
      fetchOrders();
    } catch (err) {
      console.error("Error actualizando estado:", err);
      alert("Error al actualizar el estado del pedido.");
    }
  };

  if (loading) return <AdminTemplate activeMenu="orders"><p>Cargando...</p></AdminTemplate>;

  return (
    <AdminTemplate activeMenu="orders">
      <h1 className="text-3xl font-bold mb-6">Pedidos</h1>
      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
        <DynamicTable
          columns={columns}
          data={orders}
          actions={actions}
          emptyMessage="No hay pedidos"
        />
      </div>

      {showDetailsModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 w-full max-w-2xl h-auto max-h-[85vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-4">Detalles del Pedido</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-6 text-gray-300">
              <div>
                <p className="text-gray-400 text-sm">Número de Pedido</p>
                <p className="font-semibold">{selectedOrder.orderNumber}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Fecha</p>
                <p className="font-semibold">{selectedOrder.orderDate}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total</p>
                <p className="font-semibold text-lg text-green-400">${selectedOrder.total?.toLocaleString?.("es-CL") || selectedOrder.total}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Estado</p>
                <p className="font-semibold">{selectedOrder.status?.name || "PENDIENTE"}</p>
              </div>
            </div>

            <h3 className="text-lg font-bold text-white mb-3">Productos</h3>
            <div className="bg-gray-800 rounded p-4 mb-6">
              {selectedOrder.details && selectedOrder.details.length > 0 ? (
                <div className="space-y-3">
                  {selectedOrder.details.map((item, idx) => (
                    <div key={idx} className="border-b border-gray-700 pb-3 last:border-b-0">
                      <p className="text-white font-semibold">{item.product?.productName}</p>
                      <div className="grid grid-cols-3 gap-4 text-sm text-gray-300 mt-2">
                        <div>
                          <p className="text-gray-400">Cantidad</p>
                          <p>{item.quantity}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Precio Unitario</p>
                          <p>${item.unitPrice?.toLocaleString?.("es-CL") || item.unitPrice}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Subtotal</p>
                          <p className="text-green-400">${item.subtotal?.toLocaleString?.("es-CL") || item.subtotal}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">No hay productos en este pedido</p>
              )}
            </div>

            <button
              onClick={() => setShowDetailsModal(false)}
              className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded transition"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {showStatusModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 w-96">
            <h2 className="text-2xl font-bold text-white mb-4">Cambiar Estado del Pedido</h2>
            <p className="text-gray-300 mb-6">Pedido: {selectedOrder?.orderNumber}</p>
            
            <div className="space-y-3 mb-6">
              <button
                onClick={() => handleStatusChange("ENTREGADO")}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition"
              >
                Marcar como Entregado
              </button>
              <button
                onClick={() => handleStatusChange("CANCELADO")}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition"
              >
                Marcar como Cancelado
              </button>
            </div>

            <button
              onClick={() => setShowStatusModal(false)}
              className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded transition"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </AdminTemplate>
  );
};

export default Orders;
