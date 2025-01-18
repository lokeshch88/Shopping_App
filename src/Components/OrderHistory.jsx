import React, { useEffect, useState } from "react";
import "../CssFiles/OrderHistory.css";
import { Link } from "react-router-dom";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);

    const savedOrders = JSON.parse(localStorage.getItem("orders")) || {};
    if (storedUsername && savedOrders[storedUsername]) {
      const userOrders = savedOrders[storedUsername];

      // Sort orders by date, latest first
      userOrders.sort((a, b) => new Date(b.date) - new Date(a.date));

      setOrders(userOrders);
    }
  }, []);

  return (
    <div className="order-history">
      <div className="order-history-header">
        <h2>Order History</h2>
        <Link to="/home">
          <button className="home-button">&lt; Home</button>
        </Link>
      </div>
      {orders.length === 0 ? (
        <p className="no-orders">No orders placed yet.</p>
      ) : (
        <div className="orders">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div>
                  <strong>Order ID:</strong> {order.id}
                </div>
                <div>
                  <strong>Date:</strong> {order.date}
                </div>
              </div>
              <div className="order-items">
                {order.items.map((item) => (
                  <div key={item.id} className="order-item">
                    <p className="item-name">{item.name}</p>
                    <p>Price: ₹{item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
