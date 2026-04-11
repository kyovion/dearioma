"use client"

import { useCart } from "@/src/hooks/useCart"

export default function NavbarClient() {
  const { data: cart } = useCart()

  const totalItems =
    cart?.items?.reduce(
      (acc: number, item: any) => acc + item.quantity,
      0
    ) || 0

  return (
    <div>
      🛒 Cart: {totalItems}
    </div>
  )
}