import { useState, useEffect } from "react";
import AdminTemplate from "../../components/templates/AdminTemplate";
import DynamicTable from "../../components/organisms/DynamicTable";
import OrderService from "../../services/order/OrderService";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);

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
