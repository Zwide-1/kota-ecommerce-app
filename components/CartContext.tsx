"use client"

import { createContext, useContext, useState, ReactNode } from "react"

export type Additive = { id: number; name: string; price: number }

export type CartItem = {
  id: number
  kotaName: string
  basePrice: number
  quantity: number
  additives: Additive[]
}

type CartContextType = {
  items: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  totalPrice: number
  itemCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  function addToCart(item: CartItem) {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) {
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        )
      }
      return [...prev, { ...item }]
    })
  }

  function removeFromCart(id: number) {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  function updateQuantity(id: number, quantity: number) {
    if (quantity < 1) return
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    )
  }

  function clearCart() {
    setItems([])
  }

  const totalPrice = items.reduce(
    (sum, i) =>
      sum + (i.basePrice + i.additives.reduce((s, a) => s + a.price, 0)) * i.quantity,
    0
  )

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalPrice, itemCount }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within CartProvider")
  return context
}