import React from "react";
import DynamicForm from "../organisms/DynamicForm";

const PaymentSection = ({
  paymentMethods = [],
  shippingMethods = [],
  selectedMethod,
  selectedShipping,
  onSelectMethod,
  onSelectShipping,
  onConfirm,
  onCancel,
  cardFields,
}) => {
  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-lg space-y-6 w-full">

      <h2 className="text-white text-2xl font-semibold">
        Método de Envío y Pago
      </h2>

      <div className="space-y-4">
        <div>
          <label className="text-gray-300 text-sm mb-2 block">
            Método de envío:
          </label>

          <select
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg 
                       focus:outline-none focus:border-indigo-500"
            value={selectedShipping}
            onChange={(e) => onSelectShipping(e.target.value)}
          >
            <option value="">Seleccione un método de envío</option>

            {shippingMethods.map((method) => (
              <option key={method.id} value={method.id}>
                {method.methodName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-gray-300 text-sm mb-2 block">
            Método de pago:
          </label>

          <select
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg 
                       focus:outline-none focus:border-indigo-500"
            value={selectedMethod}
            onChange={(e) => onSelectMethod(e.target.value)}
          >
            <option value="">Seleccione un método de pago</option>

            {paymentMethods.map((method) => (
              <option key={method.id} value={method.id}>
                {method.paymentName}
              </option>
            ))}
          </select>
        </div>

      </div>

      {selectedMethod && (
        <div className="mt-6 space-y-4">
          <h3 className="text-white text-lg font-semibold">Datos de la tarjeta</h3>

          <DynamicForm
            fields={cardFields}
            buttonText="Confirmar pago"
            onSubmit={onConfirm}
            onCancel={onCancel}
          />
        </div>
      )}
    </div>
  );
};

export default PaymentSection;
