"use client"

import { useCart } from "@/src/hooks/useCart"
import CartItemControls from "@/src/components/cart/CartItemControls"

export default function CartPage() {
  const { data: cart } = useCart()

  return (
    <div>
      {cart?.items?.map((item: any) => (
        <div key={item.id}>
          <p>Nama Barang = {item.product.name}</p>

          <CartItemControls
            productId={item.productId}
            quantity={item.quantity}
            stock={item.product.stock} // 🔥 ini penting
          />
        </div>
      ))}
    </div>
  )
}