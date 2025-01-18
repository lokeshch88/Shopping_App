import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../CssFiles/Payment.css";

const Payment = () => {
  const [cartItems, setCartItems] = useState([]);
  const [username, setUsername] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get totalAmount from location state
    if (location.state?.totalAmountPass) {
      setTotalAmount(location.state.totalAmountPass);
    }

    // Retrieve username and cart items
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);

    const savedCart = localStorage.getItem("cart");
    const parsedCart = savedCart ? JSON.parse(savedCart) : {};

    if (storedUsername && parsedCart[storedUsername]) {
      setCartItems(parsedCart[storedUsername]);
    }
  }, [location.state]);

  const handleConfirmPayment = () => {
    if (!selectedPaymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    if (!cartItems.length) {
      alert("No items in cart to place an order.");
      return;
    }

    const confirmOrder = window.confirm(
      `You have selected ${selectedPaymentMethod}. Confirm payment of ₹${totalAmount}?`
    );

    if (!confirmOrder) return;

    // Retrieve existing orders
    const orders = JSON.parse(localStorage.getItem("orders")) || {};

    // Add the current cart items to orders
    if (!orders[username]) {
      orders[username] = [];
    }
    orders[username].push({
      id: new Date().toISOString(), // Unique order ID
      items: cartItems,
      totalAmount,
      paymentMethod: selectedPaymentMethod,
      date: new Date().toLocaleString(), // Order date
    });

    // Save updated orders in localStorage
    localStorage.setItem("orders", JSON.stringify(orders));

    // Clear the cart
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (username && savedCart) {
      savedCart[username] = [];
      localStorage.setItem("cart", JSON.stringify(savedCart));
    }

    alert("Payment successful! Order confirmed.");
    navigate("/order-history");
  };

  return (
    <div className="payment-page">
      <h2>Payment Options</h2>
      <div className="payment-options">
        <label>
          <input
            type="radio"
            name="payment"
            value="Credit Card"
            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
          />
          Credit Card
        </label>
        <label>
          <input
            type="radio"
            name="payment"
            value="Debit Card"
            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
          />
          Debit Card
        </label>
        <label>
          <input
            type="radio"
            name="payment"
            value="UPI"
            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
          />
          UPI
        </label>
        <label>
          <input
            type="radio"
            name="payment"
            value="Net Banking"
            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
          />
          Net Banking
        </label>
      </div>
      <div className="payment-summary">
        <p>
          <strong>Total Amount:</strong> ₹{totalAmount}
        </p>
        {selectedPaymentMethod && (
          <p>
            <strong>Selected Payment Method:</strong> {selectedPaymentMethod}
          </p>
        )}
      </div>
      <button onClick={handleConfirmPayment} className="confirm-button">
        Confirm Payment
      </button>
    </div>
  );
};

export default Payment;
