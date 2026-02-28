"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import buttonStyles from '@/src/styles/buttonStyles.module.css'

export default function UserProfilePage() {
  const { id } = useParams()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [phonenumber, setPhonenumber] = useState("")

  const [loading, setLoading] = useState(true)

  const router = useRouter()
  const handleDelete = async () => {
      const confirmDelete = confirm("Yakin hapus akun anda?")

      if (!confirmDelete) return

      await fetch(`/api/user/${id}`, {
      method: "DELETE"
      })

      router.push(`/admin`)
  }

  const handleUpdate = async () => {
      router.push(`/user/${id}/update`)
  }

  // ⭐ GET detail produk (prefill form)
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/user/${id}`)
      const data = await res.json()

        setUsername(data.username || "")
        setEmail(data.email || "")
        setAddress(data.address || "")
        setPhonenumber(data.phonenumber || "")

      setLoading(false)
    }

    if (id) fetchProduct()
  }, [id])

  if (loading) return <p>Loading...</p>

  return (
    <div>
      <h1>My Profile</h1>
     
      <div className="text-black">
        <div>
          Nama : {username}
        </div>
        <div>
          Email : {email}
        </div>
        <div>
          Adress : {address}
        </div>
        <div>
          Phone Number : {phonenumber}
        </div>
        <div className="w-1/8 border-2">
          <button className={buttonStyles.btnCursor} onClick={() => handleUpdate()}>Update Profile</button>
        </div>
        <div className="w-1/8 border-2">
          <button className={buttonStyles.btnCursor} onClick={() => handleDelete()}>Delete Profile</button>
        </div>
      </div>

    </div>
  )
}