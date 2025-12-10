import { useState, useEffect } from "react";
import AdminTemplate from "../../components/templates/AdminTemplate";
import DynamicTable from "../../components/organisms/DynamicTable";
import OrderService from "../../services/order/OrderService";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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
    { key: "id", label: "ID Pedido" },
    { key: "total", label: "Monto" },
    { key: "createdAt", label: "Fecha" },
  ];

  const actions = [
    {
      id: "delete",
      label: "Eliminar",
      variant: "danger",
      handler: (row) => handleDelete(row.id),
    },
  ];

  const handleDelete = async (id) => {
    if (confirm("¿Estás seguro de que deseas eliminar este pedido?")) {
      try {
        await OrderService.deleteOrder(id);
        fetchOrders();
      } catch (err) {
        console.error("Error eliminando pedido:", err);
      }
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
    </AdminTemplate>
  );
};

export default Orders;
