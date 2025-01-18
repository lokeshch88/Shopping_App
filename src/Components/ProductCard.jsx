import React from "react";
import "../CssFiles/ProductsCards.css"; // Optional for custom styles

const ProductCard = ({ product, addToCart, updateQuantity }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">₹{product.price}</p>
      {product.quantity > 0 && (
        <p className="product-quantity">In Cart: {product.quantity}</p>
      )}
      {product.quantity > 0 ? (
        <div>
          <button onClick={() => updateQuantity(product.id, -1)}>-</button>
          <button onClick={() => updateQuantity(product.id, 1)}>+</button>
        </div>
      ) : (
        <button className="add-to-cart" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default ProductCard;
