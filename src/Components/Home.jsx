import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import "../CssFiles/Home.css"; // Optional for custom styles
import { FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa"; // Importing icons

const Home = () => {
  const [cart, setCart] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for sidebar toggle
  const navigate = useNavigate();
  const [showProfile, setshowProfile] = useState(false); //profile dropdown
  const products = [
    { id: 1, name: "luggage trolley Bag", price: 4000, image: "/images/handbag.jfif" },
    { id: 2, name: "Apple Watch Ultra 2", price: 30000, image: "/images/apple-watch.jfif" },
    { id: 3, name: "Body Spray", price: 500, image: "/images/bodyspray.jfif" },
    { id: 4, name: "Bike Helmet", price: 2500, image: "/images/helmet.jfif" },
    { id: 5, name: "Men Jeans", price: 1800, image: "/images/jeans.jfif" },
    { id: 6, name: "Men T-shirt", price: 800, image: "/images/tshirt.jfif" },
    { id: 7, name: "Bike Hand Gloves", price: 400, image: "/images/hand-gloves.jfif" },
    { id: 8, name: "Nike Shoe", price: 3000, image: "/images/shoe.jfif" },
    { id: 9, name: "Sunglass", price: 1500, image: "/images/sunglass.jfif" },
    { id: 10, name: "Cap", price: 300, image: "/images/cap.jfif" }
  ];

  useEffect(() => {
    const user = localStorage.getItem("username");
    if (user) {
      const savedCart = JSON.parse(localStorage.getItem("cart")) || {};
      setCart(savedCart[user] || []);
    }
  }, []);

  const addToCart = (product) => {
    const user = localStorage.getItem("username");
    if (!user) {
      alert("Please log in first to add items to the cart.");
      return;
    }

    const updatedCart = JSON.parse(localStorage.getItem("cart")) || {};
    if (!updatedCart[user]) {
      updatedCart[user] = [];
    }

    const existingProduct = updatedCart[user].find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      updatedCart[user].push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart[user]);
    alert(`${product.name} added to cart!`);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    alert("All cart items will be removed");
    localStorage.removeItem("cart");
    setCart([]);
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/");
  };

  const handleGoToCart = () => {
    navigate("/cart");
  };

  const updateQuantity = (id, amount) => {
    const user = localStorage.getItem("username");
    const updatedCart = JSON.parse(localStorage.getItem("cart")) || {};
    if (!updatedCart[user]) return;

    const existingProduct = updatedCart[user].find(item => item.id === id);
    if (existingProduct) {
      const newQuantity = existingProduct.quantity + amount;
      if (newQuantity <= 0) {
        updatedCart[user] = updatedCart[user].filter(item => item.id !== id);
      } else {
        existingProduct.quantity = newQuantity;
      }
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCart(updatedCart[user]);
    }
  };

  return (
    <div className="home">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="close-icon" onClick={() => setSidebarOpen(false)}>
          <FaTimes />
        </div>
        <ul className="sidebar-menu">
          <li onClick={() => navigate("/home")}>Home</li>
          <li onClick={() => navigate("/categories")}>Categories</li>
          <li onClick={() => navigate("/order-history")}>Order History</li>
          <li onClick={handleGoToCart}>Cart</li>
          <li onClick={() => navigate(localStorage.getItem("username") ? "/profile" : "/login")}>
            Profile
          </li>
        </ul>
      </div>

      {/* Header */}
      <header className="header">
        <div className="hamburger-icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <FaBars />
        </div>
        <div className="logo-container" onClick={() => navigate("/home")}>
          <h1 className="logo-text">ShopOneGo</h1>
        </div>
        <div className="header-right">
          <FaShoppingCart className="icon cart-icon" onClick={handleGoToCart} />
          <FaUser
            className="icon profile-icon"
            onClick={() => setshowProfile(true)}
          />
          {showProfile &&(
            <div className="profile-dropdown">
              <div className="close-profile-dropdown"
              onClick={()=>setshowProfile(false)}
              >&times;</div>

               <p>Welcome, {localStorage.getItem("username")}</p>
               {localStorage.getItem("username") ? (
            <button onClick={handleLogout} className="logout-button">Logout</button>
          ) : (
            <button onClick={handleLogin} className="login-button">Login</button>
          )}
            </div>

          )
          }
          
        </div>
      </header>

      {/* Product List */}
      <div className="product-list">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={{
              ...product,
              quantity: cart.find(item => item.id === product.id)?.quantity || 0,
            }}
            addToCart={addToCart}
            updateQuantity={updateQuantity}
          />
        ))}
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 ShopOneGo. All rights reserved.</p>
        <p>Address: 123 Street, City, Country</p>
      </footer>
    </div>
  );
};

export default Home;
