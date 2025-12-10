import React from "react";

const SummaryItem = ({ item }) => {
  const productName =
    item.name ||
    item.product ||
    item.nombre ||
    item.nameProducto ||
    item.productName ||
    "Producto sin nombre";

  return (
    <li className="flex items-center justify-between py-4 px-2 border-b border-gray-800 last:border-b-0">

      <img
        src={item.imageUrl || "/default-product.png"}
        alt={productName}
        className="w-16 h-16 object-cover rounded-lg border border-gray-700 mr-4"
      />

      <span className="text-base font-medium text-white w-1/3 truncate pl-2">
        {productName}
      </span>

      <span className="text-base font-medium text-gray-300 w-20 text-center">
        x{item.quantity}
      </span>

      <span className="text-base font-semibold w-28 text-right text-indigo-400">
        ${(item.price * item.quantity).toLocaleString("es-CL")}
      </span>

    </li>
  );
};

export default SummaryItem;
