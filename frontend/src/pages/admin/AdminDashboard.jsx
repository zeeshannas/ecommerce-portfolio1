import { useEffect, useState } from "react";
import API from "../../services/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, productsRes, ordersRes] = await Promise.allSettled([
          API.get("/admin/users").then((r) => r.data),
          API.get("/products").then((r) => r.data),
          API.get("/admin/orders").then((r) => r.data),
        ]);

        const usersList = usersRes.status === "fulfilled" ? (Array.isArray(usersRes.value) ? usersRes.value : usersRes.value?.data ?? []) : [];
        const productsList = productsRes.status === "fulfilled" ? (Array.isArray(productsRes.value) ? productsRes.value : productsRes.value?.data ?? []) : [];
        const ordersList = ordersRes.status === "fulfilled" ? (Array.isArray(ordersRes.value) ? ordersRes.value : ordersRes.value?.data ?? []) : [];

        const users = Array.isArray(usersList) ? usersList.length : 0;
        const products = Array.isArray(productsList) ? productsList.length : 0;
        const orders = Array.isArray(ordersList) ? ordersList.length : 0;
        const revenue = Array.isArray(ordersList) ? ordersList.reduce((sum, o) => sum + Number(o.total_amount ?? 0), 0) : 0;

        setStats({ users, products, orders, revenue });
      } catch (_) {}
      setLoading(false);
    };
    fetchStats();
  }, []);

  if (loading) {
    return <p className="text-slate-600">Loading dashboard...</p>;
  }

  const cards = [
    { label: "Total Users", value: stats.users, color: "bg-blue-500" },
    { label: "Total Products", value: stats.products, color: "bg-emerald-500" },
    { label: "Total Orders", value: stats.orders, color: "bg-amber-500" },
    { label: "Total Revenue", value: `$${stats.revenue.toFixed(2)}`, color: "bg-slate-700" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
            <p className="text-sm font-medium text-slate-500">{card.label}</p>
            <p className={`mt-2 text-2xl font-bold text-slate-900`}>{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
