import { cookies } from "next/headers"
import { verifyToken } from "@/src/lib/auth"

export async function requireAdmin() {

  const cookieStore = await cookies()

  const token = cookieStore.get("token")?.value

  if (!token) {
    throw new Error("Unauthorized")
  }

  const decoded: any = verifyToken(token)

  if (!decoded) {
    throw new Error("Unauthorized")
  }

  if (decoded.role !== "ADMIN") {
    throw new Error("Forbidden")
  }

  return decoded
}