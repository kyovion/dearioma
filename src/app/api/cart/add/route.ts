import { NextResponse } from "next/server"
import db from "@/src/lib/db"
import { getCurrentUser } from "@/src/lib/getCurrentUser" // sesuaikan path kamu

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { productId, quantity } = body

    if (!productId || !quantity) {
      return NextResponse.json(
        { error: "productId and quantity required" },
        { status: 400 }
      )
    }

    // 🔍 1. Cek product
    const product = await db.product.findUnique({
      where: { id: productId }
    })

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    if (product.stock < quantity) {
      return NextResponse.json(
        { error: "Stock not enough" },
        { status: 400 }
      )
    }

    // 🛒 2. Ambil / buat cart
    let cart = await db.cart.findUnique({
      where: { userId: user.id }
    })

    if (!cart) {
      cart = await db.cart.create({
        data: {
          userId: user.id
        }
      })
    }

    // 🔁 3. Cek apakah item sudah ada di cart
    const existingItem = await db.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId
        }
      }
    })

    // ➕ 4. Kalau sudah ada → update quantity
    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity

      if (product.stock < newQuantity) {
        return NextResponse.json(
          { error: "Stock not enough" },
          { status: 400 }
        )
      }

      await db.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: newQuantity
        }
      })
    } else {
      // ➕ 5. Kalau belum ada → create
      await db.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity
        }
      })
    }

    return NextResponse.json({ message: "Added to cart" })

  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}