import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import "../CssFiles/Cart.css";

import { Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);

    const savedCart = localStorage.getItem("cart");
    const parsedCart = savedCart ? JSON.parse(savedCart) : {};

    if (storedUsername && parsedCart[storedUsername]) {
      setCartItems(parsedCart[storedUsername]);
    } else {
      setCartItems([]);
    }
  }, []);

  const updateQuantity = (id, amount) => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || {};
    if (!username || !savedCart[username]) return;

    const updatedItems = [...cartItems];
    const itemIndex = updatedItems.findIndex((item) => item.id === id);

    if (itemIndex !== -1) {
      const newQuantity = updatedItems[itemIndex].quantity + amount;
      if (newQuantity <= 0) {
        updatedItems.splice(itemIndex, 1);
      } else {
        updatedItems[itemIndex].quantity = newQuantity;
      }
      setCartItems(updatedItems);

      savedCart[username] = updatedItems;
      localStorage.setItem("cart", JSON.stringify(savedCart));
    }
  };

  const handleProceedToPay = () => {
    const totalAmountPass = totalAmount.toFixed(2);
    navigate("/payment", { state: { totalAmountPass } });
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h2>Your Cart</h2>
        <Link to="/home">
          <button className="back-button">&lt; Home</button>
        </Link>
      </div>
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty. Browse products to add items!</p>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-items">
            {cartItems.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                updateQuantity={updateQuantity}
              />
            ))}
          </div>
          <div className="cart-summary">
            <h3>Cart Summary</h3>
            <div className="summary-details">
              <p>
                <strong>Total Items:</strong> {cartItems.length}
              </p>
              <p>
                <strong>Total Quantity:</strong>{" "}
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </p>
              <p>
                <strong>Total Amount:</strong> ₹{totalAmount.toFixed(2)}
              </p>
            </div>
            <button onClick={handleProceedToPay} className="proceed-button">
              Proceed to Pay
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
