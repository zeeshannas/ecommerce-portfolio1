import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VendorDashboard from "./pages/VendorDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Cart from "./pages/Cart";
import OrderSuccess from "./pages/OrderSuccess";
import OrderHistory from "./pages/OrderHistory";
import Layout from "./components/Layout";
import { AuthProvider } from "./context/AuthContext";
import AdminSidebar from "./components/AdminSidebar";


function App() {
  return (
    <>
      <AuthProvider>
        {/* Page content changes */}
        <Routes>
          <Route path="/" element={
            <Layout>
              <Home />
            </Layout>
          } />
          <Route path="/products" element={<Layout><Products /></Layout>} />
          <Route path="/products/:id" element={<Layout><ProductDetail /></Layout>} />
          <Route path="/login" element={<Layout><Login /></Layout>} />
          <Route path="/register" element={<Layout><Register /></Layout>} />
          {/* Admin routes (use AdminSidebar for all admin pages) */}

          <Route
            path="/vendor"
            element={<Layout>
              <ProtectedRoute role="vendor">
                <VendorDashboard />
              </ProtectedRoute>
            </Layout>
            }
          />

          <Route path="/cart" element={<Layout><Cart /> </Layout>} />
          <Route path="/orders" element={<Layout><OrderHistory /></Layout>} />
          <Route path="/order-success" element={<Layout><OrderSuccess /></Layout>} />
          <Route
            path="/admin/*"
            element={
              <Layout>
                <ProtectedRoute role="admin">
                  <AdminSidebar />
                </ProtectedRoute>
              </Layout>
            }
          />

        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;