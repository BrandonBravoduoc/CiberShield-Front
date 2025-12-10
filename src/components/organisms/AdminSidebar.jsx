import { Link } from "react-router-dom";

const AdminSidebar = ({ activeMenu }) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", path: "/admin" },
    { id: "products", label: "Productos", path: "/admin/products" },
    { id: "users", label: "Usuarios", path: "/admin/users" },
    { id: "orders", label: "Pedidos", path: "/admin/orders" },
  ];

  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-800 h-full fixed left-0 top-0 pt-20 overflow-y-auto">
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={`block px-4 py-3 rounded-lg transition ${
              activeMenu === item.id
                ? "bg-indigo-600 text-white font-semibold"
                : "text-gray-300 hover:bg-gray-800"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
