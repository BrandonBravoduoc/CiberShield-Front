import React from "react";
import Navbar from "../organisms/Navbar";
import Footer from "../layouts/Footer";
import Text from "../atoms/Text";
import Button from "../atoms/Button";
import TableHeader from "../molecules/TableHeader";
import TableBody from "../molecules/TableBody";

const CartTemplate = ({ cartItems, onRemove, onUpdateQty, onCheckout }) => {
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const columns = [
    { key: "image", label: "Imagen" },
    { key: "product", label: "Producto" },
    { key: "price", label: "Precio" },
    { key: "quantity", label: "Cantidad" },
    { key: "subtotal", label: "Subtotal" },
  ];

  const actions = [
    {
      id: "remove",
      label: "",
      variant: "danger",
      handler: (row) => onRemove(row.id),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Navbar cartCount={cartItems.length} />

      <main className="grow flex justify-center px-6 py-14">
        <div className="w-[95%] bg-white rounded-2xl shadow-2xl p-10 border border-gray-200">

          <Text variant="h1" className="text-gray-900 text-4xl font-extrabold mb-10">
            Carrito de Compras
          </Text>

          <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-300">
            <table className="min-w-full text-lg">
              <TableHeader columns={columns} actions={actions} />

              <TableBody
                columns={columns}
                data={cartItems}
                actions={actions}
                emptyMessage="Tu carrito está vacío."
                onUpdateQty={onUpdateQty}
              />
            </table>
          </div>

          <div className="flex justify-between items-center mt-12 border-t pt-8">
            <Text className="text-3xl font-bold text-gray-900">
              Total: ${total.toLocaleString("es-CL")}
            </Text>

            <Button
              className={`w-52 h-12 text-lg ${cartItems.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={onCheckout}
              disabled={cartItems.length === 0}
            >
              Finalizar compra
            </Button>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CartTemplate;