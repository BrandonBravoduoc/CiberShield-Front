import React from "react";
import Image from "../atoms/Image";
import Button from "../atoms/Button";

const CartItemCard = ({ item, onRemove }) => {
  return (
    <div className="flex items-center bg-gray-800 rounded-lg p-4 gap-4 border border-gray-700">
      <Image
        src={item.imageUrl || "/placeholder.png"}
        alt={item.productName}
        className="w-20 h-20 object-contain"
      />

      <div className="flex-1">
        <h3 className="text-white font-semibold">{item.productName}</h3>
        <p className="text-gray-400 text-sm">
          ${item.price.toLocaleString("es-CL")}
        </p>
      </div>

      <Button
        className="bg-red-600 hover:bg-red-500"
        onClick={onRemove}
      >
        Eliminar
      </Button>
    </div>
  );
};

export default CartItemCard;
