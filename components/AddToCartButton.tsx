"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { Additive } from "@/types/menu";
import {useCart } from "@/context/CartContext"
// If you don't have a Button UI component, we will use native <button>
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
  kotaId: string;
  kotaName: string;
  basePrice: number;
  selectedAdditives?: Additive[];
  quantity?: number;
  onAdded?: () => void;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
  fullWidth?: boolean;
}

/**
 * AddToCartButton – accepts a menu item + selected additives and adds to cart.
 * Shows a brief "Added!" confirmation before reverting.
 */
export default function AddToCartButton({
  kotaId,
  kotaName,
  basePrice,
  selectedAdditives = [],
  quantity = 1,
  onAdded,
  className,
  size = "default",
  fullWidth = false,
}: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart({
      kotaId,
      kotaName,
      basePrice,
      additives: selectedAdditives,
      quantity,
    });
    setAdded(true);
    onAdded?.();
    setTimeout(() => setAdded(false), 1500);
  };

  const itemTotal =
    (basePrice + selectedAdditives.reduce((s, a) => s + a.price, 0)) * quantity;

  return (
    <button
      onClick={handleAdd}
      disabled={added}
      className={`px-4 py-2 rounded bg-blue-600 text-white ${
        added ? "bg-green-600" : ""
      } ${fullWidth ? "w-full" : ""} ${className || ""}`}
    >
      {added ? (
        <>
          <Check className="h-4 w-4 inline-block mr-1" />
          Added!
        </>
      ) : (
        <>
          <ShoppingCart className="h-4 w-4 inline-block mr-1" />
          Add to Basket — R{itemTotal.toFixed(2)}
        </>
      )}
    </button>
  );
}