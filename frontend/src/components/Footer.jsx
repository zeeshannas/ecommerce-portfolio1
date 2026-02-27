import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="text-xl font-bold text-white">
              E-Shop
            </Link>
            <p className="mt-3 text-sm text-slate-400 max-w-sm">
              Your one-stop shop for quality products. Fast delivery, secure payments, and a smooth shopping experience.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Shop</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/products" className="hover:text-white transition">All Products</Link></li>
              <li><Link to="/cart" className="hover:text-white transition">Cart</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Account</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/login" className="hover:text-white transition">Sign in</Link></li>
              <li><Link to="/register" className="hover:text-white transition">Create account</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} E-Shop. All rights reserved.</p>
          <p className="text-sm text-slate-500">Contact: zeeshannasir5577@gmail.com</p>
        </div>
      </div>
    </footer>
  );
}
