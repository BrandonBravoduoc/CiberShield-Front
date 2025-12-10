import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartTemplate from "../components/templates/CartTemplate";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <CartTemplate
      cartItems={cartItems}
      onRemove={removeFromCart}
      onUpdateQty={(id, qty) => updateQuantity(id, qty)}
      onClearCart={clearCart}
      onCheckout={handleCheckout}
    />
  );
};

export default CartPage;