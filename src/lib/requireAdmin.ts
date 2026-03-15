import { cookies } from "next/headers"
import { verifyToken } from "@/src/lib/auth"
import { getCurrentUser } from "./getCurrentUser"

export async function requireAdmin() {

  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  if (user.role !== "ADMMIN") {
    throw new Error("Forbidden")
  }

  return user
}