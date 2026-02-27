import { useEffect, useState } from "react";
import API from "../services/api";

export default function AdminPanel() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchPending();
  }, []);

  const fetchPending = () => {
    API.get("/admin/pending-products")
      .then(res => setProducts(res.data));
  };

  const approveProduct = async (id) => {
    await API.put(`/products/${id}/approve`);
    fetchPending();
  };

  return (
    <div>
      <h1>Pending Products</h1>
      {products.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>Vendor: {product.vendor.name}</p>
          <button onClick={() => approveProduct(product.id)}>
            Approve
          </button>
        </div>
      ))}
    </div>
  );
}