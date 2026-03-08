import { NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/src/lib/auth"

export function proxy(req: NextRequest) {

  const { pathname } = req.nextUrl

  // izinkan akses halaman login
  if (pathname.startsWith("/admin/login") ||
    pathname.startsWith("/user/login") ||
    pathname.startsWith("/user/register")) {
    return NextResponse.next()
  }
  
  const token = req.cookies.get("token")?.value

  if (!token) {
    return NextResponse.redirect(new URL("/user/login", req.url))
  }

  const decoded = verifyToken(token)

  if (!decoded) {
    return NextResponse.redirect(new URL("/user/login", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*",
    "/user/:path*"
  ]
}