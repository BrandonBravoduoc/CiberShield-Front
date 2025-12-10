import { useState, useEffect } from "react";
import AdminTemplate from "../../components/templates/AdminTemplate";
import DynamicTable from "../../components/organisms/DynamicTable";
import UserService from "../../services/user/UserService";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await UserService.getAllUsers();
      const userData = Array.isArray(response.data) ? response.data : response.data?.data || [];
      setUsers(userData);
    } catch (err) {
      console.error("Error cargando usuarios:", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { key: "id", label: "ID" },
    { key: "userName", label: "Usuario" },
    { key: "email", label: "Email" },
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
    if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      try {
        await UserService.deleteUser(id);
        fetchUsers();
      } catch (err) {
        console.error("Error eliminando usuario:", err);
      }
    }
  };

  if (loading) return <AdminTemplate activeMenu="users"><p>Cargando...</p></AdminTemplate>;

  return (
    <AdminTemplate activeMenu="users">
      <h1 className="text-3xl font-bold mb-6">Usuarios</h1>
      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
        <DynamicTable
          columns={columns}
          data={users}
          actions={actions}
          emptyMessage="No hay usuarios"
        />
      </div>
    </AdminTemplate>
  );
};

export default Users;
