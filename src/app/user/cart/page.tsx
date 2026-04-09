"use client"

import { useCart } from "@/src/hooks/useCart"

export default function CartPage() {
  const { data: cart, isLoading } = useCart()

  if (isLoading) return <p>Loading...</p>

  return (
    <div>
        My Cart    
        {cart?.items?.map((item: any) => (
        <div key={item.id}>
            {item.product.name} | {item.quantity}
        </div>
        ))}
    </div>
  )
}