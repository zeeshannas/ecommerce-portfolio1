import { useEffect, useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";

const API_BASE = "http://127.0.0.1:8000";

export default function AdminPendingProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPending = async () => {
    try {
      const res = await API.get("/admin/pending-products");
      setProducts(Array.isArray(res.data) ? res.data : res.data?.data ?? []);
    } catch (err) {
      toast.error("Failed to load pending products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const approve = async (id) => {
    try {
      await API.put(`/products/${id}/approve`);
      toast.success("Product approved");
      fetchPending();
    } catch (err) {
      toast.error("Failed to approve");
    }
  };

  if (loading) return <p className="text-slate-600">Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Pending Products</h1>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-100">
              <tr>
                <th className="px-4 py-3 font-medium">Image</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Vendor</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium w-24">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                  <td className="px-4 py-3">
                    {p.image ? (
                      <img src={p.image.startsWith("http") ? p.image : `${API_BASE}/${p.image}`} alt="" className="w-10 h-10 object-contain rounded" />
                    ) : (
                      <span className="text-slate-300">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-900">{p.name}</td>
                  <td className="px-4 py-3 text-slate-600">{p.vendor?.name ?? "—"}</td>
                  <td className="px-4 py-3 text-slate-900">${Number(p.price ?? 0).toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => approve(p.id)} className="px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded hover:bg-green-700">
                      Approve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {products.length === 0 && <p className="p-6 text-slate-500 text-center">No pending products.</p>}
      </div>
    </div>
  );
}
