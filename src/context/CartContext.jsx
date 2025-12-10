import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => item.id === product.id);
      const quantityToAdd = product.quantity || 1;
      
      if (itemExists) {
        const newQuantity = itemExists.quantity + quantityToAdd;
        const maxStock = product.stock || 0;
        
        if (newQuantity > maxStock) {
          console.warn(`No hay suficiente stock. Stock disponible: ${maxStock}, solicitado: ${newQuantity}`);
          return prevItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: maxStock }
              : item
          );
        }
        
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: newQuantity }
            : item
        );
      } else {
        const maxStock = product.stock || 0;
        
        if (quantityToAdd > maxStock) {
          console.warn(`No hay suficiente stock. Stock disponible: ${maxStock}, solicitado: ${quantityToAdd}`);
          return [...prevItems, { ...product, quantity: maxStock }];
        }
        
        return [...prevItems, { ...product, quantity: quantityToAdd }];
      }
    });
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const maxStock = item.stock || 0;
          const quantity = Math.min(newQuantity, maxStock);
          
          if (newQuantity > maxStock) {
            console.warn(`No hay suficiente stock. Stock disponible: ${maxStock}, solicitado: ${newQuantity}`);
          }
          
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };
  const cartTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartTotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};