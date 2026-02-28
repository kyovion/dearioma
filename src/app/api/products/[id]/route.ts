import db from "@/src/lib/db";
import { NextRequest, NextResponse } from "next/server";

//old code need change to https://nextjs.org/docs/app/guides/upgrading/version-15#params--searchparams
// export async function GET( req: Request, {params}: { params: { id: string } }) 
export async function GET( req: NextRequest, context: { params: Promise<{ id: string }> }) 
{
  const { id } = await context.params

  const product = await db.product.findUnique({
    //old code
    // where: { id: params.id }
    where: { id }
  })

  return NextResponse.json(product)
}

export async function PUT( req: NextRequest, context: { params: Promise<{ id: string }> }) 
{
  const { id } = await context.params
  const body = await req.json()

  const updated = await db.product.update({
    where: { id },
    data: {
      name: body.name,
      price: body.price,
      stock: body.stock,
      category: body.category,
      description: body.description,
      image: body.image,
    }
  })

  return NextResponse.json(updated)
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) 
{
  const { id } = await context.params

  await db.product.delete({
    where: { id }
  })

  return NextResponse.json({ message: "Deleted" })
}