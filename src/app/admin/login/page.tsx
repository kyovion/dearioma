"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import buttonStyles from '@/src/styles/buttonStyles.module.css'

export default function LoginPage() {

  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e:any) => {
    e.preventDefault()

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
    const data = await res.json()
    if(res.ok){
      if(data.role === "ADMIN")
      {
        router.push("/admin")
      }
      else
      {
        router.push("/user")
      }
    }
    else{
      alert("Akun yang anda masukkan salahaaa")
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <h1>Admin Login</h1>
      <div>
        <label htmlFor="">Email : </label>
        <input
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="">Password : </label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />
      </div>
      <div>
        <button className={buttonStyles.btnCursor} type="submit">
          Login
        </button>
      </div>
    </form>
  )
}