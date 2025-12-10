import AdminSidebar from "../organisms/AdminSidebar";
import Navbar from "../organisms/Navbar";

const AdminTemplate = ({ children, activeMenu }) => {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <AdminSidebar activeMenu={activeMenu} />
      <main className="ml-64 pt-20 p-6">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminTemplate;
