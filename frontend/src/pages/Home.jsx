import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import API from "../services/api";

const API_BASE = "http://127.0.0.1:8000";

export default function Home() {
  const [trending, setTrending] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    API.get("/categories").then((res) => setCategories(res.data));
    API.get("/products?sort=latest&page=1").then((res) => setTrending(res.data.data || []));
  }, []);

  return (
    <div className="bg-slate-50">
      {/* Hero */}
      <section className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight"
            >
              Build your perfect shopping experience
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 text-lg text-slate-300"
            >
              Discover quality products at great prices. Fast delivery and secure checkout.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link
                to="/products"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium bg-white text-slate-900 rounded-lg hover:bg-slate-100 transition"
              >
                Shop now
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white border border-slate-500 rounded-lg hover:bg-slate-800 transition"
              >
                Create account
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-12">
            Why choose us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {[
              { title: "Fast delivery", desc: "Quick and reliable shipping to your doorstep." },
              { title: "Secure payments", desc: "Safe payment with trusted gateways." },
              { title: "Quality products", desc: "Premium and verified products only." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-12">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category_id=${cat.id}`}
                className="group bg-slate-50 rounded-xl p-6 text-center border border-slate-100 hover:border-slate-200 hover:shadow-md transition flex flex-col items-center"
              >
                {cat.image ? (
                  <img
                    src={`${API_BASE}/${cat.image}`}
                    alt={cat.name}
                    className="h-20 w-20 sm:h-24 sm:w-24 object-contain mb-3"
                  />
                ) : (
                  <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-slate-200 mb-3 flex items-center justify-center text-slate-400 text-2xl font-bold">
                    {cat.name?.charAt(0) || "?"}
                  </div>
                )}
                <span className="font-medium text-slate-800 group-hover:text-slate-600 transition">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending products */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Trending products
            </h2>
            <Link
              to="/products"
              className="text-slate-600 hover:text-slate-900 font-medium text-sm"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trending.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="group bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition"
              >
                <div className="aspect-square bg-slate-50 flex items-center justify-center overflow-hidden">
                  {product.image ? (
                    <img
                      src={product.image.startsWith("http") ? product.image : `${API_BASE}/${product.image}`}
                      alt={product.name}
                      className="w-full h-full object-contain p-4 group-hover:scale-105 transition duration-300"
                    />
                  ) : (
                    <span className="text-slate-300 text-4xl font-bold">{product.name?.charAt(0) || "?"}</span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-slate-900 truncate">{product.name}</h3>
                  <p className="text-sm text-slate-500 mt-0.5">{product.category?.name}</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">${product.price}</p>
                  <span className="inline-block mt-2 text-sm font-medium text-slate-600 group-hover:text-slate-900 transition">
                    View product →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-12">
            How it works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: "1", title: "Browse", desc: "Find products you love." },
              { step: "2", title: "Add to cart", desc: "Add items and go to checkout." },
              { step: "3", title: "Checkout", desc: "Pay securely and get your order." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-white font-semibold flex items-center justify-center mx-auto mb-3">
                  {item.step}
                </div>
                <h3 className="font-semibold text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-600 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
