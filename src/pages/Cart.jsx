import React from "react";
import { useCart } from "../context/CartContext";
import CartTemplate from "../components/templates/CartTemplate";

const CartPage = () => {
  const { cartItems, addToCart, removeFromCart, clearCart } = useCart();

  return (
    <CartTemplate
      cartItems={cartItems}
      onRemove={removeFromCart}
      onUpdateQty={(id, qty) => addToCart({ id, quantity: qty })}
      onClearCart={clearCart}
    />
  );
};

export default CartPage;
