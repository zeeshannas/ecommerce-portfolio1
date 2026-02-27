import { useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await API.post("/login", form);
      login({
        user: res.data.user,
        access_token: res.data.access_token,
      });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password.");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
          <h1 className="text-2xl font-bold text-slate-900 text-center">
            Sign in
          </h1>
          <p className="text-center text-slate-500 text-sm mt-1">
            Welcome back. Sign in to your account.
          </p>

          {error && (
            <div className="mt-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition"
            >
              Sign in
            </button>
          </form>

          <p className="text-center text-sm text-slate-600 mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="font-medium text-slate-900 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
