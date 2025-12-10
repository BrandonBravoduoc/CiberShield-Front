import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCart } from "../../context/CartContext";

import CheckoutTemplate from "../../components/templates/CheckoutTemplate";
import OrderSummary from "../../components/organisms/OrderSummary";
import PaymentSection from "../../components/organisms/PaymentSection";

import PaymentMethodService from "../../services/order/PaymentMethodService";
import ShippingMethodService from "../../services/order/ShippingMethodService";
import OrderService from "../../services/order/OrderService";

const cardFields = [
  { name: "cardHolder", label: "Nombre del titular", type: "text", placeholder: "Ej: Brandon Bravo" },
  { name: "cardNumber", label: "Número de tarjeta", type: "text", placeholder: "1234 5678 9012 3456" },
  { name: "expiration", label: "Fecha de expiración", type: "text", placeholder: "MM/AA" },
  { name: "cvv", label: "CVV", type: "password", placeholder: "***" },
];

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();

  const [paymentMethods, setPaymentMethods] = useState([]);
  const [shippingMethods, setShippingMethods] = useState([]);

  const [selectedMethod, setSelectedMethod] = useState("");
  const [selectedShipping, setSelectedShipping] = useState("");

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shippingCost = selectedShipping
    ? Number(
        shippingMethods.find((s) => s.id === Number(selectedShipping))
          ?.shippingCost || 0
      )
    : 0;

  const total = subtotal + shippingCost;

  useEffect(() => {
    const loadData = async () => {
      try {
        const [paymentRes, shippingRes] = await Promise.all([
          PaymentMethodService.getAllPaymentMethods(),
          ShippingMethodService.getAllShippingMethods(),
        ]);

        setPaymentMethods(paymentRes.data);
        setShippingMethods(shippingRes.data);
      } catch (err) {
        console.error("Error cargando métodos de pago/envío", err);
      }
    };

    loadData();
  }, []);

  const handleCancelOrder = () => {
    clearCart();
    navigate("/cart");
  };

  const handleConfirmOrder = async (form) => {
    if (!selectedMethod) return alert("Selecciona un método de pago.");
    if (!selectedShipping) return alert("Selecciona un método de envío.");

    const cleanForm = {};
    Object.keys(form).forEach((key) => {
      if (typeof form[key] !== "object") cleanForm[key] = form[key];
    });

    
   const dto = {
    total,
    paymentMethodId: Number(selectedMethod),
    shippingMethodId: Number(selectedShipping),
    cardInfo: cleanForm,
    items: cartItems.map((i) => ({
      productId: i.id,
      quantity: i.quantity,
      unitPrice: i.price,
    })),
  };

    try {
      const res = await OrderService.createOrder(dto);
      alert("Pedido realizado con éxito. ID Pedido: " + res.data.id);
      clearCart();
      navigate("/");
    } catch (err) {
      console.error("Error creando pedido:", err.response?.data || err);
      alert("Ocurrió un error al procesar el pedido.");
    }
  };

  return (
    <CheckoutTemplate
      subtotal={subtotal}
      shippingCost={shippingCost}
      total={total}
      summaryComponent={<OrderSummary cartItems={cartItems} />}
      paymentComponent={
        <PaymentSection
          paymentMethods={paymentMethods}
          shippingMethods={shippingMethods}
          selectedMethod={selectedMethod}
          selectedShipping={selectedShipping}
          onSelectMethod={setSelectedMethod}
          onSelectShipping={setSelectedShipping}
          onConfirm={handleConfirmOrder}
          onCancel={handleCancelOrder}
          cardFields={cardFields}
        />
      }
    />
  );
};

export default Checkout;
