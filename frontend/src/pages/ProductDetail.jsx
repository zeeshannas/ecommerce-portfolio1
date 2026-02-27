import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

const API_BASE = "http://127.0.0.1:8000";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    API.get(`/products/${id}`).then((res) => setProduct(res.data));
  }, [id]);

  const addToCart = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        toast.error("Please sign in to add to cart");
        return;
      }
      await API.post("/cart/add", { product_id: id, quantity: 1 });
      toast.success("Added to cart");
    } catch (error) {
      toast.error("Please sign in to add to cart");
    }
  };

  if (!product) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <div className="animate-pulse flex flex-col gap-4 w-full max-w-md">
          <div className="h-64 bg-slate-200 rounded-xl" />
          <div className="h-6 bg-slate-200 rounded w-3/4" />
          <div className="h-4 bg-slate-200 rounded w-1/2" />
        </div>
      </div>
    );
  }

  const imageUrl = product.image
    ? product.image.startsWith("http")
      ? product.image
      : `${API_BASE}/${product.image}`
    : null;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="text-sm text-slate-500 mb-6">
          <Link to="/" className="hover:text-slate-700">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-slate-700">Products</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-900">{product.name}</span>
        </nav>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-8">
            {/* Image */}
            <div className="aspect-square bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={product.name}
                  className="w-full h-full object-contain p-6"
                />
              ) : (
                <span className="text-slate-300 text-6xl font-bold">
                  {product.name?.charAt(0) || "?"}
                </span>
              )}
            </div>

            {/* Details */}
            <div className="flex flex-col">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                {product.name}
              </h1>
              {product.category && (
                <p className="mt-2 text-slate-500">{product.category.name}</p>
              )}
              <p className="mt-4 text-3xl font-bold text-slate-900">
                ${product.price}
              </p>
              {product.description && (
                <p className="mt-4 text-slate-600 leading-relaxed">
                  {product.description}
                </p>
              )}
              {product.vendor && (
                <p className="mt-4 text-sm text-slate-500">
                  Sold by <span className="font-medium text-slate-700">{product.vendor.name}</span>
                </p>
              )}
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={addToCart}
                  className="px-6 py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition"
                >
                  Add to cart
                </button>
                <Link
                  to="/cart"
                  className="px-6 py-3 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition"
                >
                  View cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
