"use client"

import { createContext, useContext, useState } from "react"

type CartItem = {
  id: number
  name: string
  price: number
  quantity: number
  additives?: string[]
}

type CartContextType = {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {

  const [cart, setCart] = useState<CartItem[]>([])

  function addToCart(item: CartItem) {

    setCart((prev) => {
      const existing = prev.find((p) => p.id === item.id)

      if (existing) {
        return prev.map((p) =>
          p.id === item.id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        )
      }

      return [...prev, { ...item, quantity: 1 }]
    })
  }

  function removeFromCart(id: number) {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  function clearCart() {
    setCart([])
  }

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error("useCart must be used within CartProvider")
  }

  return context
}