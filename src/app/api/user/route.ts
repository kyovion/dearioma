import db from "@/src/lib/db";
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  const products = await db.user.findMany()
  return NextResponse.json(products)
}

// export async function POST(req: Request) 
export async function POST(req: NextRequest) 
{
    try{
        const body = await req.json()
        const product = await db.user.create({
            data: {
            username: body.username,
            email: body.email,
            password: body.password,
            address: body.address,
            phonenumber: body.phonenumber,
            // role: "ADMIN"
            }
        })

        return NextResponse.json(product)
    }catch (error) {
        console.log("ERROR:", error)
    return NextResponse.json({ error: "server error" }, { status: 500 })
  }
    
}