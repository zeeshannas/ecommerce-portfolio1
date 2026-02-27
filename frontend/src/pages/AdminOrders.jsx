import { useEffect, useState } from "react";
import API from "../services/api";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await API.get("/admin/orders");
    setOrders(res.data.data);
  };

  return (
    <div>
      <h1>Paid Orders</h1>

      {orders.map(order => (
        <div key={order.id} style={{border:"1px solid #ccc", margin:"10px", padding:"10px"}}>
          <h3>Order ID: {order.id}</h3>
          <p>User: {order.user.name}</p>
          <p>Status: {order.status}</p>
          <p>Total: ${order.total_amount}</p>
        </div>
      ))}
    </div>
  );
}

