import { NextRequest } from "next/server"
import { v2 as cloudinary } from 'cloudinary'
import { getCurrentUser } from "@/src/lib/getCurrentUser";
import db from "@/src/lib/db";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {

  const user = await getCurrentUser()

  if (!user) {
    return Response.json(
      { message: "Unauthorized" },
      { status: 401 }
    )
  }

  if (user.role !== "ADMIN") {
    return Response.json(
      { message: "Forbidden" },
      { status: 403 }
    )
  }

  try {

    const { id } = await context.params
    console.log(`isi publicId ${id}`)

    const product = await db.product.findUnique({
      //old code
      // where: { id: params.id }
      where: { id }
    })
    
    const publicId = product?.publicId
    console.log(`isi publicId ${publicId}`)
    if (!publicId) {
      return new Response(
        JSON.stringify({ error: 'publicId empty' }),
        { status: 400 }
      )
    }

    const result = await cloudinary.uploader.destroy(publicId)

    return new Response(JSON.stringify({ result }), { status: 200 })

  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Unknown error'

    return new Response(JSON.stringify({ error: message }), {
      status: 500,
    })
  }
}