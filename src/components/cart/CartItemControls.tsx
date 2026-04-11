"use client"

import { useUpdateCart } from "@/src/hooks/useUpdateCart"
import { useRemoveFromCart } from "@/src/hooks/useRemoveFromCart"
import buttonStyles from '@/src/styles/buttonStyles.module.css'
import toast from "react-hot-toast"

type Props = {
  productId: string
  quantity: number
  stock: number // 🔥 tambahkan ini
}

export default function CartItemControls({
  productId,
  quantity,
  stock,
}: Props) {
  const updateCart = useUpdateCart()
  const removeItem = useRemoveFromCart()

  const isMax = quantity >= stock
  const isMin = quantity <= 1

  return (
    <div style={{ display: "flex", gap: "8px" }}>
      Jumlah = 
      {/* ➖ */}
      <button className={buttonStyles.btnCursor}
        disabled={isMin || updateCart.isPending}
        onClick={() =>
          updateCart.mutate({
            productId,
            quantity: quantity - 1,
          })
        }
      >
        -
      </button>

      <span>{quantity}</span>

      {/* ➕ */}
      <button className={buttonStyles.btnCursor}
        disabled={isMax || updateCart.isPending}
        onClick={() =>
          updateCart.mutate({
            productId,
            quantity: quantity + 1,
          })
        }
      >
        +
      </button>

      {/* ❌ */}
      <button className={buttonStyles.btnCursor}
        disabled={removeItem.isPending}
        onClick={() =>
          removeItem.mutate({ productId })
        }
      >
        Remove
      </button>
    </div>
  )
}