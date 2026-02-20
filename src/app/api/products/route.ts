import db from "@/src/lib/db";
import { NextResponse } from "next/server"

export async function GET() {
  const products = await db.product.findMany()
  return NextResponse.json(products)
}

export async function POST(req: Request) 
{
    try{
        console.log("test 1");
        const body = await req.json()
        console.log("test "+ body);
        const product = await db.product.create({
            data: {
            name: body.name,
            price: body.price,
            category: body.name,
            stock: body.stock,
            image: body.image
            }
        })

        return NextResponse.json(product)
    }catch (error) {
        console.log("ERROR:", error)
    return Response.json({ error: "server error" }, { status: 500 })
  }
    
}