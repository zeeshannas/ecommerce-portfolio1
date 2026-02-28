import { useEffect, useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";

export default function AdminCarts() {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const fetchCarts = async () => {
    try {
      const res = await API.get("/admin/carts");
      const data = res.data?.data ?? res.data;
      setCarts(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error("Failed to load carts");
      setCarts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarts();
  }, []);

  if (loading) return <p className="text-slate-600">Loading carts...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Carts</h1>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-100">
              <tr>
                <th className="px-4 py-3 font-medium">Cart ID</th>
                <th className="px-4 py-3 font-medium">User ID</th>
                <th className="px-4 py-3 font-medium">Items</th>
                <th className="px-4 py-3 font-medium">View</th>
              </tr>
            </thead>
            <tbody>
              {carts.map((cart) => {
                const itemCount = (cart.items || []).reduce((s, i) => s + (i.quantity || 0), 0);
                const total = (cart.items || []).reduce((s, i) => s + (i.product?.price ?? i.price ?? 0) * (i.quantity ?? 0), 0);
                return (
                  <tr key={cart.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="px-4 py-3 font-medium text-slate-900">#{cart.id}</td>
                    <td className="px-4 py-3 text-slate-700">{cart.user_id ?? cart.user?.id ?? "—"}</td>
                    <td className="px-4 py-3 text-slate-600">{itemCount} items — ${total.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => setSelected(selected?.id === cart.id ? null : cart)} className="text-slate-600 hover:text-slate-900">
                        {selected?.id === cart.id ? "Hide" : "Details"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {carts.length === 0 && <p className="p-6 text-slate-500 text-center">No carts found.</p>}
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-xl shadow-lg max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-bold text-slate-900 mb-4">Cart #{selected.id}</h2>
            <p className="text-sm text-slate-600 mb-4">User ID: {selected.user_id ?? selected.user?.id ?? "—"}</p>
            <h3 className="font-medium text-slate-900 mb-2">Items</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              {(selected.items || []).map((item, i) => (
                <li key={item.id || i} className="flex justify-between">
                  <span>{item.product?.name ?? item.product_name ?? "Item"} × {item.quantity}</span>
                  <span>${((item.product?.price ?? item.price ?? 0) * (item.quantity ?? 0)).toFixed(2)}</span>
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
