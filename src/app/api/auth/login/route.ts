import { NextRequest, NextResponse } from "next/server"
import { signToken } from "@/src/lib/auth"
import db from "@/src/lib/db";

export async function POST(req: NextRequest) {

  const { email, password } = await req.json()

  const result = await db.user.findUnique({
    where: {
        email: email,
    },
  });

  if(result === null)
  {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
  }

  if (email !== result.email || password !== result.password) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
  }

  const token = signToken({
    id: result.id,
    email: result.email,
    role: result.role
  })

  const res = NextResponse.json({
    message: "Login success",
    role: result.role
  })

  res.cookies.set("token", token, {
    httpOnly: true,
    path: "/"
  })

  return res
}