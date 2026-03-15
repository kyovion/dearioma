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
    <button className={buttonStyles.btnCursor} onClick={handleLogout}>
      Logout
    </button>
  )
}