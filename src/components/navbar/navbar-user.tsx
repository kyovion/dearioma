import LogoutButton from "@/src/components/LogoutButton"
import CartCount from "@/src/components/navbar/navbar-user-client"
import { getCurrentUser } from "@/src/lib/getCurrentUser"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function Navbar() {

  const user = await getCurrentUser()
  const id=user?user.id:0;

  return (
    <>
      {user && (<div><h1> Welcome {user.email}</h1></div>)}
      <div className="mb-5 flex">
        <div className="mr-2 border-2"><Link href={"/user/"}>Home</Link></div>
        <div className="mr-2 border-2"><Link href={"/user/products"}>Product</Link></div>
        {user && (<div className="mr-2 border-2"><Link href={`/user/${id}/profile`}>Profile</Link></div>)}
        {user && (<div className="mr-2 border-2"><Link href={`/user/cart`}>Cart </Link></div>)}
        {!user && (<div className="mr-2 border-2"><Link href={"/user/register"}>Register</Link></div>)}
        {!user && (<div className="mr-2 border-2"><Link href={"/user/login"}>Login</Link></div>)}
        {user && <LogoutButton />}
        {user && (<CartCount/>)}
      </div>
    </>
  )
}