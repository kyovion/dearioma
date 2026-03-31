import { NextRequest } from "next/server"
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'
import { getCurrentUser } from "@/src/lib/getCurrentUser";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(req: NextRequest) {

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
    const formData = await req.formData()
    const file = formData.get('file')

    if (!(file instanceof File)) {
      return new Response(JSON.stringify({ error: 'No file uploaded' }), {
        status: 400,
      })
    }

    if (!file.type.startsWith('image/')) {
      return new Response(JSON.stringify({ error: 'File must image' }), {
        status: 400 ,
      })
    }

    if (file.size > 1 * 1024 * 1024) {
      return Response.json({ error: 'File too large, max 1MB' }, { 
        status: 400,
       })
    }

    // convert file ke buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // upload ke Cloudinary
    const folder = process.env.CLOUDINARY_FOLDER
    const result: UploadApiResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: folder }, (err, result) => {
          if (err) 
          {
            // console.error("CLOUDINARY ERROR:", err)
            reject(err)
          } 
          else if (!result) 
          {
            reject(new Error('Upload failed: result undefined'))
          } 
          else 
          {
            resolve(result)
          }
        })
        .end(buffer)
    })

    return Response.json({
      url: result.secure_url,
      publicId: result.public_id
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'An unknown error occurred'
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
    })
  }
}