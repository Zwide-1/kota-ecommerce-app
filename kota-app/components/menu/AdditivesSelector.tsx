"use client";

import { Additive } from "@/types/menu";

interface AdditivesSelectorProps {
  additives: Additive[];
  selected: Additive[];
  onToggle: (additive: Additive) => void;
}

export default function AdditivesSelector({ additives, selected, onToggle }: AdditivesSelectorProps) {
  return (
    <div className="mt-3">
      <p className="text-sm font-semibold text-gray-700 mb-2">Add extras:</p>
      <div className="space-y-1.5">
        {additives.map((additive) => {
          const isSelected = selected.some((a) => a.id === additive.id);
          const soldOut = additive.stock_quantity <= 0;
          return (
            <label
              key={additive.id}
              className={`flex items-center justify-between text-sm rounded-md px-3 py-2 border cursor-pointer transition-colors ${
                soldOut
                  ? "opacity-50 cursor-not-allowed bg-gray-50"
                  : isSelected
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <span className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isSelected}
                  disabled={soldOut}
                  onChange={() => onToggle(additive)}
                  className="accent-orange-500"
                />
                <span>{additive.name}</span>
                {soldOut && (
                  <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full">
                    Sold Out
                  </span>
                )}
              </span>
              <span className="font-medium text-gray-600">+R{additive.price.toFixed(2)}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
