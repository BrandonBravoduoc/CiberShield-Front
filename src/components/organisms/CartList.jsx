import React from "react";
import CartItemCard from "../molecules/CartItem";
const CartList = ({ items, onUpdateQty, onRemove }) => {
  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => (
        <CartItemCard
          key={item.id}
          item={item}
          onUpdateQty={onUpdateQty}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

export default CartList;
