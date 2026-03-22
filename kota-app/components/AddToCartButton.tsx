"use client"

import { useCart } from "./CartContext"

export default function AddToCartButton({ item }: any) {

  const { addToCart } = useCart()

  return (
    <button
      onClick={() => addToCart(item)}
      className="bg-green-600 text-white px-4 py-2 rounded"
    >
      Add To Basket
    </button>
  )
}