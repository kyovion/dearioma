"use client"

import { useRouter } from "next/navigation"
import buttonStyles from '@/src/styles/buttonStyles.module.css'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    const res = await fetch("/api/auth/logout", {
      method: "POST"
    })

    if(res.ok){
      router.push("/user/login")
      router.refresh()
    }
    else{
        console.log("error")
    }
    return;


  }

  return (
    <button className="mr-2 border-2 cursor-pointer rounded bg-red-600" onClick={handleLogout}>
      Logout
    </button>
  )
}