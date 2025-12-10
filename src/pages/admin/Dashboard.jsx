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
        const [usersRes, productsRes, ordersRes] = await Promise.all([
          UserService.getAllUsers(),
          ProductService.getAllProducts(),
          OrderService.getAllOrders(),
        ]);

        const users = usersRes.data || [];
        const products = productsRes.data || [];
        const orders = ordersRes.data || [];

        const totalRevenue = orders.reduce((sum, order) => {
          const amount = parseFloat(order.total) || 0;
          return sum + amount;
        }, 0);

        setStats({
          totalUsers: users.length,
          totalProducts: products.length,
          totalOrders: orders.length,
          revenue: totalRevenue,
        });
      } catch (err) {
        console.error("Error cargando estadísticas:", err);
        setStats({
          totalUsers: 0,
          totalProducts: 0,
          totalOrders: 0,
          revenue: 0,
        });
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
