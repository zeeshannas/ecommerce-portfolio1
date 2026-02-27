import { Routes, Route, Link } from "react-router-dom";
import AdminPanel from "../pages/AdminPanel";
import AdminOrders from "../pages/AdminOrders";

export default function AdminSidebar() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-gray-700">
          Admin Panel
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link to="/admin" className="block px-4 py-2 rounded hover:bg-gray-700">
            Pending Products
          </Link>
          <Link to="/admin/orders" className="block px-4 py-2 rounded hover:bg-gray-700">
            Paid Orders
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Routes>
          <Route path="/" element={<AdminPanel />} />
          <Route path="orders" element={<AdminOrders />} />
        </Routes>
      </div>
    </div>
  );
}