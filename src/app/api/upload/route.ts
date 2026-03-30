import { NextRequest } from "next/server"
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file')

    if (!file) {
      return new Response(JSON.stringify({ error: 'No file uploaded' }), {
        status: 400,
      })
    }

    if (!file.type.startsWith('image/')) {
    return new Response(JSON.stringify({ error: 'File harus gambar' }), {
      status: 400 ,
    })
  }

    // convert file ke buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // upload ke Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: 'dearioma' }, (err, result) => {
          if (err) {
            // console.error("CLOUDINARY ERROR:", err)
            reject(err)
          } else {
            resolve(result)
          }
        })
        .end(buffer)
    })

    return Response.json({
      url: result.secure_url,
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    })
  }
}