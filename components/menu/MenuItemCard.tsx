"use client";

import { useState } from "react";
import { MenuItem, Additive } from "@/types/menu";
import AddToCartButton from "../AddToCartButton";

interface MenuItemCardProps {
  item: MenuItem;
  allAdditives: Additive[];
}

export default function MenuItemCard({ item, allAdditives }: MenuItemCardProps) {
  const [selectedAdditives, setSelectedAdditives] = useState<Additive[]>([]);

  const toggleAdditive = (a: Additive, checked: boolean) => {
    if (checked) setSelectedAdditives(prev => [...prev, a]);
    else setSelectedAdditives(prev => prev.filter(x => x.id !== a.id));
  };

  // Only show additives applicable to this item if needed
  const itemAdditives = allAdditives.filter(a => a.item_id === item.id); // assuming you store item_id in additives

  return (
    <div className="p-4 border rounded shadow bg-white">
      <h2 className="text-xl font-semibold">{item.name}</h2>
      <p>Base Price: R{item.price}</p>

      {/* Additives checkboxes */}
      {itemAdditives.map(a => (
        <label key={a.id} className="block">
          <input
            type="checkbox"
            checked={selectedAdditives.some(x => x.id === a.id)}
            onChange={e => toggleAdditive(a, e.target.checked)}
          />
          {a.name} (+R{a.price})
        </label>
      ))}

      {/* Add to Cart button */}
      <div className="mt-4">
        <AddToCartButton
          kotaId={item.id}
          kotaName={item.name}
          basePrice={item.price}
          selectedAdditives={selectedAdditives}
          quantity={1}
        />
      </div>
    </div>
  );
}