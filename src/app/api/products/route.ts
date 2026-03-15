// import { verifyToken } from "@/src/lib/auth";
import db from "@/src/lib/db";
import { requireAdmin } from "@/src/lib/requireAdmin";
// import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  const products = await db.product.findMany()
  return NextResponse.json(products)
}

// export async function POST(req: Request) 
export async function POST(req: NextRequest) 
{

    await requireAdmin()

    try{
        const body = await req.json()
        const product = await db.product.create({
            data: {
            name: body.name,
            price: body.price,
            category: body.name,
            description: body.description,
            stock: body.stock,
            image: body.image
            }
        })

        return NextResponse.json(product)
    }catch (error) {
        console.log("ERROR:", error)
    return NextResponse.json({ error: "server error" }, { status: 500 })
  }
    
}