import { Link } from "react-router-dom";

export default function OrderSuccess() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-slate-50 px-4">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 sm:p-12 text-center max-w-md">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">
          Order placed successfully
        </h1>
        <p className="mt-2 text-slate-600">
          Thank you for shopping with us. We'll get your order to you soon.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <Link
            to="/orders"
            className="inline-block px-6 py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition"
          >
            View orders
          </Link>
          <Link
            to="/products"
            className="inline-block px-6 py-3 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
