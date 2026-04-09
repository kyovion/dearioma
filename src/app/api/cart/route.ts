import { NextResponse } from "next/server"
import db from "@/src/lib/db"
import { getCurrentUser } from "@/src/lib/getCurrentUser" // sesuaikan path kamu

export async function GET() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const cart = await db.cart.findUnique({
      where: { userId: user.id },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    })

    return NextResponse.json(cart)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}