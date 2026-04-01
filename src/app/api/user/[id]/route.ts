import db from "@/src/lib/db";
import { NextRequest, NextResponse } from "next/server";

//old code need change to https://nextjs.org/docs/app/guides/upgrading/version-15#params--searchparams
// export async function GET( req: Request, {params}: { params: { id: string } }) 
export async function GET( req: NextRequest, context: { params: Promise<{ id: string }> }) 
{
  const { id } = await context.params

  const product = await db.user.findUnique({
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

  const updated = await db.user.update({
    where: { id },
    data: {
      username: body.username,
      email: body.email,
      password: body.password,
      address: body.address,
      phoneNumber: body.phonenumber,
    }
  })

  return NextResponse.json(updated)
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) 
{
  const { id } = await context.params

  await db.user.delete({
    where: { id }
  })

  return NextResponse.json({ message: "Deleted" })
}