import React from "react";
import Navbar from "../organisms/Navbar";
import Footer from "../layouts/Footer";
import Text from "../atoms/Text";
import Button from "../atoms/Button";
import CartItemCard from "../molecules/CartItem";

const CartTemplate = ({ cartItems, onRemove, onUpdateQty, onClearCart }) => {
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Navbar cartCount={cartItems.length} />

      <main className="grow max-w-6xl mx-auto px-4 py-10">
        <Text variant="h1" className="text-white text-3xl font-bold mb-8">
          Carrito de Compras
        </Text>

        {cartItems.length === 0 ? (
          <p className="text-gray-400 text-lg">Tu carrito está vacío.</p>
        ) : (
          <>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onRemove={() => onRemove(item.id)}
                />
              ))}
            </div>

            <div className="flex justify-between mt-10 border-t border-gray-700 pt-6">
              <Text className="text-white text-2xl font-bold">
                Total: ${total.toLocaleString("es-CL")}
              </Text>

              <Button className="w-40">Finalizar compra</Button>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CartTemplate;
