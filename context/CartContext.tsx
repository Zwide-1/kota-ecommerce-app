"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { CartItem, MenuItem, Additive } from "@/types/menu";

interface CartContextType {
  items: CartItem[];
  addToCart: (menuItem: MenuItem, additives: Additive[]) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  totalCartPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (menuItem: MenuItem, additives: Additive[]) => {
    const additivesTotal = additives.reduce((sum, a) => sum + a.price, 0);
    const totalPrice = menuItem.base_price + additivesTotal;
    setItems((prev) => [...prev, { menuItem, selectedAdditives: additives, totalPrice, quantity: 1 }]);
  };

  const removeFromCart = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => setItems([]);

  const totalCartPrice = items.reduce((sum, item) => sum + item.totalPrice * item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, totalCartPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
