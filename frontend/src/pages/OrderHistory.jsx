import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function OrderHistory() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders");
      setOrders(Array.isArray(res.data) ? res.data : res.data?.data || []);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login", { replace: true });
        return;
      }
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getPaymentStatus = (order) => {
    const s = (order.payment_status ?? order.status ?? "").toString().toLowerCase();
    if (s === "paid" || s === "completed" || s === "delivered") return { label: "Paid", className: "bg-green-100 text-green-800" };
    if (s === "pending") return { label: "Pending", className: "bg-amber-100 text-amber-800" };
    if (s === "cancelled" || s === "failed") return { label: s === "cancelled" ? "Cancelled" : "Failed", className: "bg-red-100 text-red-800" };
    return { label: "Pending", className: "bg-slate-100 text-slate-800" };
  };

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-slate-50 px-4">
        <h2 className="text-xl font-semibold text-slate-800 text-center">
          Sign in to view your orders
        </h2>
        <Link
          to="/login"
          className="mt-4 px-6 py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition"
        >
          Sign in
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-slate-50">
        <p className="text-slate-600">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
          Order history
        </h1>
        <p className="text-slate-600 text-sm mb-8">
          View and track your orders.
        </p>

        {orders.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-12 text-center">
            <p className="text-slate-600 mb-4">You haven't placed any orders yet.</p>
            <Link
              to="/products"
              className="inline-block px-6 py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition"
            >
              Start shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden"
              >
                {/* Order header */}
                <div className="px-4 sm:px-6 py-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-semibold text-slate-900">
                      Order #{order.id}
                    </span>
                    <span className="text-sm text-slate-500">
                      {formatDate(order.created_at)}
                    </span>
                    {(() => {
                      const { label, className } = getPaymentStatus(order);
                      return (
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${className}`}>
                          {label}
                        </span>
                      );
                    })()}
                  </div>
                  <span className="text-lg font-bold text-slate-900">
                    ${Number(order.total_amount ?? 0).toFixed(2)}
                  </span>
                </div>

                {/* Order items */}
                <div className="px-4 sm:px-6 py-4">
                  {order.items && order.items.length > 0 ? (
                    <ul className="space-y-2">
                      {order.items.map((item, idx) => (
                        <li
                          key={item.id || idx}
                          className="flex justify-between text-sm text-slate-600"
                        >
                          <span>
                            {item.product?.name ?? item.product_name ?? "Item"} × {item.quantity}
                          </span>
                          <span>
                            ${((item.price ?? 0) * (item.quantity ?? 0)).toFixed(2)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-slate-500">No items.</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
