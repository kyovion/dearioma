"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
// import buttonStyles from '../../../../../styles/buttonStyles.module.css'
import buttonStyles from '@/src/styles/buttonStyles.module.css'

export default function UserUpdatePage() {
  const { id } = useParams()
  const router = useRouter()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [address, setAddress] = useState("")
  const [phonenumber, setPhonenumber] = useState("")

  const [loading, setLoading] = useState(true)

  // ⭐ GET detail produk (prefill form)
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/user/${id}`)
      const data = await res.json()

        setUsername(data.username || "")
        setEmail(data.email || "")
        setPassword(data.password || "")
        setAddress(data.address || "")
        setPhonenumber(data.phonenumber || "")

      setLoading(false)
    }

    if (id) fetchUser()
  }, [id])

  // ⭐ handler submit update
  const handleSubmit = async (e: any) => {
    e.preventDefault()

    await fetch(`/api/user/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        email,
        password,
        address,
        phonenumber
      })
    })

    router.push(`/user/${id}/profile`)
  }

  if (loading) return <p>Loading...</p>

  return (
    <div>
      <h1>Edit Profile</h1>

      <form onSubmit={handleSubmit} className="bg-white">
      <div className="text-black">
      Nama : 
      <input
        name="username"
        value={username}
        placeholder="username"
        onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div className="text-black">
        Email: 
        <input
          name="email"
          value={email}
          placeholder="email"
          onChange={e => setEmail(e.target.value)}
          />
      </div>
      <div className="text-black">
        Password:
        <input
          name="password"
          value={password}
          placeholder="password"
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div className="text-black">
        Address:
        <input
          name="address"
          value={address}
          placeholder="address"
          onChange={e => setAddress(e.target.value)}
          />
      </div>
      <div className="text-black">
        Phone Number:
        <input
          name="phonenumber"
          value={phonenumber}
          placeholder=" Phone Number"
          onChange={e => setPhonenumber(e.target.value)}
          />
      </div>
      <button className={buttonStyles.btnCursor} type="submit">Update Profile</button>
    </form>
    </div>
  )
}