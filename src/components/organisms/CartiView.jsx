import { useCart } from "../../context/CartContext";
import Button from "../atoms/Button";
import Image from "../atoms/Image";
import Text from "../atoms/Text";
import OrderService from "../../services/order/OrderService";

const CartView = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    const orderDto = {
      items: cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        shippingMethodId: 1 // por ahora fijo
      }))
    };

    try {
      const res = await OrderService.createOrder(orderDto);
      console.log("ORDEN CREADA:", res.data);

      clearCart();
      alert("Compra realizada con éxito!");

    } catch (err) {
      console.error(err);
      alert("Error al procesar la orden");
    }
  };

  return (
    <div className="space-y-6">
      <Text variant="h1" className="text-3xl font-bold text-gray-900">
        Tu carrito
      </Text>

      {cart.length === 0 && (
        <p className="text-gray-600">No hay productos en el carrito</p>
      )}

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 bg-white shadow-sm p-4 rounded-lg"
          >
            <Image
              src={item.imageUrl}
              alt={item.productName}
              className="w-20 h-20 object-cover rounded-md"
            />

            <div className="flex-1">
              <p className="font-semibold">{item.productName}</p>
              <p className="text-sm text-gray-600">
                ${item.price.toLocaleString()}
              </p>

              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.id, Number(e.target.value))
                }
                className="mt-2 w-20 border rounded px-2 py-1"
              />
            </div>

            <Button
              className="bg-red-500 hover:bg-red-400"
              onClick={() => removeFromCart(item.id)}
            >
              Eliminar
            </Button>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="pt-4 border-t">
          <Text className="text-xl font-bold">
            Total: ${total.toLocaleString()}
          </Text>

          <Button className="mt-4 w-full" onClick={handleCheckout}>
            Finalizar compra
          </Button>
        </div>
      )}
    </div>
  );
};

export default CartView;
