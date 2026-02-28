import { useEffect, useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/admin/orders");
      const data = res.data?.data ?? res.data;
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error("Failed to load orders");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const formatDate = (d) => (d ? new Date(d).toLocaleString() : "—");
  const statusClass = (s) => {
    const x = (s || "").toLowerCase();
    if (x === "paid") return "bg-green-100 text-green-800";
    if (x === "pending") return "bg-amber-100 text-amber-800";
    return "bg-slate-100 text-slate-800";
  };

  if (loading) return <p className="text-slate-600">Loading orders...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Orders</h1>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-100">
              <tr>
                <th className="px-4 py-3 font-medium">ID</th>
                <th className="px-4 py-3 font-medium">User</th>
                <th className="px-4 py-3 font-medium">Total</th>
                <th className="px-4 py-3 font-medium">Payment</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">View</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                  <td className="px-4 py-3 font-medium text-slate-900">#{order.id}</td>
                  <td className="px-4 py-3 text-slate-700">{order.user?.name ?? order.user_id ?? "—"}</td>
                  <td className="px-4 py-3 text-slate-900">${Number(order.total_amount ?? 0).toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusClass(order.payment_status || order.status)}`}>
                      {order.payment_status || order.status || "Pending"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{formatDate(order.created_at)}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => setSelected(selected?.id === order.id ? null : order)} className="text-slate-600 hover:text-slate-900">
                      {selected?.id === order.id ? "Hide" : "Details"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {orders.length === 0 && <p className="p-6 text-slate-500 text-center">No orders found.</p>}
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-xl shadow-lg max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-bold text-slate-900 mb-4">Order #{selected.id}</h2>
            <p className="text-sm text-slate-600">User: {selected.user?.name ?? selected.user_id}</p>
            <p className="text-sm text-slate-600">Total: ${Number(selected.total_amount ?? 0).toFixed(2)}</p>
            <p className="text-sm text-slate-600">Payment: {selected.payment_status || selected.status || "Pending"}</p>
            <p className="text-sm text-slate-600 mb-4">Date: {formatDate(selected.created_at)}</p>
            <h3 className="font-medium text-slate-900 mb-2">Items</h3>
            <ul className="space-y-1 text-sm text-slate-600">
              {(selected.items || []).map((item, i) => (
                <li key={item.id || i}>
                  {item.product?.name ?? item.product_name ?? "Item"} × {item.quantity} — ${((item.price ?? 0) * (item.quantity ?? 0)).toFixed(2)}
                </li>
              ))}
            </ul>
            <button onClick={() => setSelected(null)} className="mt-4 px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
