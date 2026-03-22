"use client";

import { useCart } from "@/context/CartContext";

export default function Cart() {
  const { items, removeFromCart, totalCartPrice } = useCart();

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Your Basket</h1>

      {items.length === 0 && (
        <p className="text-gray-600">Your basket is empty.</p>
      )}

      {items.map((item, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-lg shadow mb-4 flex justify-between items-center"
        >
          <div>
            <h3 className="text-xl font-semibold">{item.menuItem.name}</h3>
            <p className="text-gray-600">
              Quantity: {item.quantity}
            </p>
            <p className="text-gray-700">
              Price: ${item.totalPrice}
            </p>
          </div>

          <button
            onClick={() => removeFromCart(index)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="mt-8 text-2xl font-bold">
        Total: ${totalCartPrice}
      </div>
    </main>
  );
}