import { useState, useEffect } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const API_BASE = "http://127.0.0.1:8000";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories");
      setCategories(res.data);
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, category, sort, page]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await API.get("/products", {
        params: {
          search: search || undefined,
          category_id: category || undefined,
          sort: sort || undefined,
          page,
        },
      });
      const data = res.data;
      setProducts(data.data || []);
      setLastPage(data.last_page ?? 1);
      setTotal(data.total ?? 0);
      setPerPage(data.per_page ?? 10);
    } catch (error) {
      console.log("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        toast.error("Please sign in first");
        return;
      }
      await API.post("/cart/add", { product_id: id, quantity: 1 });
      toast.success("Added to cart");
    } catch (error) {
      toast.error("Please sign in to add to cart");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
          All products
        </h1>

        {/* Search & Filters */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
              />
            </div>
            <select
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
              value={category}
              className="px-4 py-2.5 border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900 min-w-[180px]"
            >
              <option value="">All categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <select
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1);
              }}
              value={sort}
              className="px-4 py-2.5 border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900 min-w-[180px]"
            >
              <option value="">Newest first</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
          {total > 0 && (
            <p className="text-sm text-slate-600">
              Showing {((page - 1) * perPage) + 1}–{Math.min(page * perPage, total)} of {total} products
            </p>
          )}
        </div>

        {/* Product grid */}
        {loading ? (
          <p className="text-slate-600 py-12 text-center">Loading products...</p>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md hover:border-slate-200 transition flex flex-col"
            >
              <Link to={`/products/${product.id}`} className="flex flex-col flex-1">
                <div className="aspect-square bg-slate-50 flex items-center justify-center overflow-hidden">
                  {product.image ? (
                    <img
                      src={product.image.startsWith("http") ? product.image : `${API_BASE}/${product.image}`}
                      alt={product.name}
                      className="w-full h-full object-contain p-4 group-hover:scale-105 transition duration-300"
                    />
                  ) : (
                    <span className="text-slate-300 text-4xl font-bold">
                      {product.name?.charAt(0) || "?"}
                    </span>
                  )}
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h2 className="font-semibold text-slate-900 line-clamp-2 group-hover:text-slate-700 transition">
                    {product.name}
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">{product.category?.name}</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">${product.price}</p>
                </div>
              </Link>
              <div className="p-4 pt-0">
                <button
                  onClick={(e) => addToCart(e, product.id)}
                  className="w-full py-2.5 text-sm font-medium bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition"
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
        )}

        {/* Pagination */}
        {lastPage > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mt-10">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="px-4 py-2 rounded-lg text-sm font-medium border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {Array.from({ length: lastPage }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  page === p
                    ? "bg-slate-900 text-white"
                    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(lastPage, p + 1))}
              disabled={page >= lastPage}
              className="px-4 py-2 rounded-lg text-sm font-medium border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
