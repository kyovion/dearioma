import { NextRequest, NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import path from "path"

export async function POST(req: NextRequest) {

  try {
    const formData = await req.formData()

    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // generate nama file unik
    const fileName = Date.now() + "-" + file.name

    const filePath = path.join(
      process.cwd(),
      "public/uploads",
      fileName
    )

    await writeFile(filePath, buffer)

    return NextResponse.json({
      message: "Upload success",
      url: `/uploads/${fileName}`
    })

  } catch (error) {
    return NextResponse.json(
      { message: "Upload failed" },
      { status: 500 }
    )
  }
}