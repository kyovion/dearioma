import db from "@/src/lib/db";

export async function GET( req: Request, context: { params: Promise<{ id: string }> }) 
{
  const { id } = await context.params

  const product = await db.product.findUnique({
    where: { id }
  })

  return Response.json(product)
}

export async function PUT( req: Request, context: { params: Promise<{ id: string }> }) 
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
      image: body.image,
    }
  })

  return Response.json(updated)
}