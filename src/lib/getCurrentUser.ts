import { cookies } from "next/headers"
import { verifyToken } from "@/src/lib/auth"

export async function getCurrentUser() {

  const cookieStore = await cookies()

  const token = cookieStore.get("token")?.value

  if (!token) {
    return null
  }

  const decoded: any = verifyToken(token)

  if (!decoded) {
    return null
  }

  return decoded
}