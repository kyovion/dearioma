import { NextResponse } from "next/server"
import db from "@/src/lib/prisma"
import { getCurrentUser } from "@/src/lib/getCurrentUser"

export async function PATCH(req: Request) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { productId, quantity } = await req.json()

    if (!productId || typeof quantity !== "number") {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 })
    }

    const cart = await db.cart.findUnique({
      where: { userId: user.id },
    })

    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 })
    }

    const item = await db.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    })

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 })
    }

    // ❌ kalau quantity jadi 0 → delete
    if (quantity <= 0) {
      await db.cartItem.delete({
        where: { id: item.id },
      })
    } else {
      await db.cartItem.update({
        where: { id: item.id },
        data: { quantity },
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}