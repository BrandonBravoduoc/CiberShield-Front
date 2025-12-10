import { useState, useEffect } from "react";
import AdminTemplate from "../../components/templates/AdminTemplate";
import StatCard from "../../components/molecules/StatCard";
import ProductService from "../../services/product/ProductService";
import OrderService from "../../services/order/OrderService";
import UserService from "../../services/user/UserService";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [users, products, orders] = await Promise.all([
          UserService.getAllUsers(),
          ProductService.getAllProducts(),
          OrderService.getAllOrders(),
        ]);

        const userData = Array.isArray(users.data) ? users.data : users.data?.data || [];
        setStats({
          totalUsers: userData.length || 0,
          totalProducts: products.data?.length || 0,
          totalOrders: orders.data?.length || 0,
          revenue: orders.data?.reduce((sum, order) => sum + (order.total || 0), 0) || 0,
        });
      } catch (err) {
        console.error("Error cargando estadísticas:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <AdminTemplate activeMenu="dashboard"><p>Cargando...</p></AdminTemplate>;

  return (
    <AdminTemplate activeMenu="dashboard">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Usuarios" value={stats.totalUsers} color="indigo" />
        <StatCard label="Productos" value={stats.totalProducts} color="green" />
        <StatCard label="Pedidos" value={stats.totalOrders} color="blue" />
        <StatCard label="Ingresos" value={`$${stats.revenue.toFixed(2)}`} color="red" />
      </div>
    </AdminTemplate>
  );
};

export default Dashboard;
