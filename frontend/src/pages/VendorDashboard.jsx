import { useEffect, useState } from "react";
import API from "../services/api";

export default function VendorDashboard() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        API.get("/vendor/products")
            .then(res => setProducts(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <h1>My Products</h1>
            {products.map(product => (
                <div key={product.id}>
                    <h3>{product.name}</h3>
                    <p>Status: {product.is_approved ? "Approved" : "Pending"}</p>
                </div>
            ))}
        </div>
    );
}