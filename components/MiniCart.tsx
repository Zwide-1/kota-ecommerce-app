"use client";

import { useCart, CartItem } from "../context/CartContext"; // make sure CartItem type exists
import { Additive } from "../types/menu";

export default function MiniCart() {
  const { cart, removeFromCart, itemCount, totalPrice } = useCart();

  if (cart.length === 0) {
    return <p className="text-gray-500 py-4 text-center">Your basket is empty.</p>;
  }

  return (
    <div className="p-4 border rounded shadow bg-white w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Your Basket ({itemCount})</h2>

      <hr className="mb-4" />

      {cart.map((item: CartItem) => (
        <div key={item.kotaId} className="mb-4 border-b pb-2">
          <p className="font-semibold">{item.kotaName}</p>
          <p>Base Price: R{item.basePrice.toFixed(2)}</p>
          {item.additives.length > 0 && (
            <p className="text-sm text-gray-600">
              Additives: {item.additives.map((a: Additive) => a.name).join(", ")}
            </p>
          )}
          <p>Quantity: {item.quantity}</p>
          <p>
            Total: R
            {(
              (item.basePrice +
                item.additives.reduce((sum: number, a: Additive) => sum + a.price, 0)) *
              item.quantity
            ).toFixed(2)}
          </p>

          <button
            onClick={() => removeFromCart(item.kotaId)}
            className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Remove
          </button>
        </div>
      ))}

      <hr className="mt-4 mb-2" />

      <p className="font-bold text-lg">Grand Total: R{totalPrice.toFixed(2)}</p>
    </div>
  );
}