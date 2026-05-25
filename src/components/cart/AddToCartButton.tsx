"use client"

import { useAddToCart } from "@/src/hooks/useAddToCart"
import buttonStyles from '@/src/styles/buttonStyles.module.css'

export default function AddToCartButton({ productId }: { productId: string }) {
  const { mutate, isPending } = useAddToCart()

  const handleAdd = () => {
    mutate({
      productId,
      quantity: 1,
    })
  }

  return (
    <button className="mr-2 border-2 cursor-pointer rounded bg-yellow-400" onClick={handleAdd} disabled={isPending}>
      {isPending ? "Adding..." : "Add to Cart"}
    </button>
  )
}