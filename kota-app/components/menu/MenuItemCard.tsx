"use client";

import { useState } from "react";
import { MenuItem, Additive } from "@/types/menu";
import { useCart } from "@/context/CartContext";
import AdditivesSelector from "./AdditivesSelector";
import PriceDisplay from "./PriceDisplay";

interface MenuItemCardProps {
  item: MenuItem;
  additives: Additive[];
}

export default function MenuItemCard({ item, additives }: MenuItemCardProps) {
  const [selectedAdditives, setSelectedAdditives] = useState<Additive[]>([]);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const soldOut = item.stock_quantity <= 0;
  const additivesTotal = selectedAdditives.reduce((sum, a) => sum + a.price, 0);

  const handleToggle = (additive: Additive) => {
    setSelectedAdditives((prev) =>
      prev.some((a) => a.id === additive.id)
        ? prev.filter((a) => a.id !== additive.id)
        : [...prev, additive]
    );
  };

  const handleAdd = () => {
    addToCart(item, selectedAdditives);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
    setSelectedAdditives([]);
  };

  return (
    <div
      className={`relative rounded-xl border bg-white p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 ${
        soldOut ? "opacity-60" : ""
      }`}
    >
      {soldOut && (
        <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
          Sold Out
        </div>
      )}

      {item.image_url ? (
        <img
          src={item.image_url}
          alt={item.name}
          className="w-full h-40 object-cover rounded-lg mb-3"
        />
      ) : (
        <div className="w-full h-40 bg-gradient-to-br from-orange-100 to-amber-50 rounded-lg mb-3 flex items-center justify-center">
          <span className="text-4xl">🍞</span>
        </div>
      )}

      <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
      {item.description && <p className="text-sm text-gray-500 mt-1">{item.description}</p>}
      <p className="text-xs text-gray-400 mt-1">{item.stock_quantity} in stock</p>

      {!soldOut && <AdditivesSelector additives={additives} selected={selectedAdditives} onToggle={handleToggle} />}
      
      <PriceDisplay basePrice={item.base_price} additivesTotal={soldOut ? 0 : additivesTotal} />

      {!soldOut && (
        <button
          onClick={handleAdd}
          className={`mt-4 w-full py-2.5 rounded-lg font-semibold text-sm transition-colors ${
            added
              ? "bg-green-500 text-white"
              : "bg-orange-500 text-white hover:bg-orange-600"
          }`}
        >
          {added ? "✓ Added to Basket!" : "Add to Basket"}
        </button>
      )}
    </div>
  );
}
