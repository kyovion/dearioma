"use client"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import buttonStyles from '@/src/styles/buttonStyles.module.css'

export default function CreateUser() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [address, setAddress] = useState("")
  const [phonenumber, setPhonenumber] = useState("")

  async function handleSubmit(e: any) {
    e.preventDefault()
    
    alert("submit");

    const res = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        email,
        password,
        address,
        phonenumber,
      })
    })
    
    router.push("/user")
  }

  return (
    <div className="bg-red">
      <form onSubmit={handleSubmit} className="bg-white">
      <div className="text-black">
      Username : 
      <input
        placeholder="Username"
        onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div className="text-black">
        Email: 
        <input
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
          />
      </div>
      <div className="text-black">
        Password:
        <input
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div className="text-black">
        Address:
        <input
          placeholder="Address"
          onChange={e => setAddress(e.target.value)}
          />
      </div>
      <div className="text-black">
        Phone Number:
        <input
          placeholder="Phone Number"
          onChange={e => setPhonenumber(e.target.value)}
          />
      </div>
      <button className={buttonStyles.btnCursor} type="submit">Register</button>
    </form>
    </div>
  )
}