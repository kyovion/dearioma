import jwt from "jsonwebtoken"

const SECRET = process.env.JWT_SECRET || "Qw3rty!123"

export function signToken(payload: object) {
  return jwt.sign(payload, SECRET, {
    expiresIn: "1d"
  })
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET)
  } catch {
    return null
  }
}