import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import CartTemplate from "../components/templates/CartTemplate";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
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