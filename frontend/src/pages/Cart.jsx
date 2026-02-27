import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import StripeCheckout from "./StripeCheckout";

const API_BASE = "http://127.0.0.1:8000";

export default function Cart() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [payNow, setPayNow] = useState(false);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      setCart(null);
      return;
    }
    const token = localStorage.getItem("access_token");
    if (!token) {
      setLoading(false);
      setCart(null);
      return;
    }
    fetchCart();
  }, [user]);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await API.get("/cart");
      const data = res.data?.data ?? res.data;
      const items = Array.isArray(data?.items) ? data.items : [];
      setCart({ ...data, items });
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        navigate("/login", { replace: true });
        return;
      }
      setCart({ items: [] });
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (id) => {
    await API.delete(`/cart/item/${id}`);
    fetchCart();
  };

  const total =
    cart?.items?.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    ) || 0;

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-slate-50 px-4">
        <h2 className="text-xl font-semibold text-slate-800 text-center">
          Sign in to view your cart
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
        <p className="text-slate-600">Loading cart...</p>
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-slate-50 px-4">
        <h2 className="text-xl font-semibold text-slate-800 text-center">
          Your cart is empty
        </h2>
        <Link
          to="/products"
          className="mt-4 px-6 py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8">
          Shopping cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex gap-4 items-center"
              >
                <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-slate-50 overflow-hidden flex items-center justify-center">
                  {item.product?.image ? (
                    <img
                      src={
                        item.product.image.startsWith("http")
                          ? item.product.image
                          : `${API_BASE}/${item.product.image}`
                      }
                      alt={item.product.name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-slate-300 text-xl font-bold">
                      {item.product?.name?.charAt(0) || "?"}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-900 truncate">
                    {item.product.name}
                  </h3>
                  <p className="text-sm text-slate-500">
                    ${item.product.price} × {item.quantity}
                  </p>
                  <p className="text-slate-700 font-medium mt-0.5">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="flex-shrink-0 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Order summary
              </h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Items ({cart.items.length})</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                <span className="font-semibold text-slate-900">Total</span>
                <span className="text-xl font-bold text-slate-900">
                  ${total.toFixed(2)}
                </span>
              </div>

              {payNow ? (
                <div className="mt-6">
                  <StripeCheckout amount={total} />
                </div>
              ) : (
                <button
                  onClick={async () => {
                    try {
                      // Create pending order + order items in backend
                      await API.post("/checkout");
                      setPayNow(true);
                    } catch (err) {
                      console.error("Checkout error", err.response || err);
                    }
                  }}
                  className="mt-6 w-full py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition"
                >
                  Checkout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
