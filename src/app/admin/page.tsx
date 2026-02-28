import db from "@/src/lib/db";
import buttonStyles from '@/src/styles/buttonStyles.module.css'
import Link from "next/link";

export default async function Home() 
{
  const admins = await db.user.findMany({where: { role: "ADMIN" },});
  const users = await db.user.findMany({where: { role: "USER" },});

  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store"
  })

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
      <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)] text-[#333333]">
        ADMIN
      </h1>
      <ol className="list-decimal list-inside font-[family-name:var(--font-geist-sans)] text-black">
        {admins.map((admin) => (
          <li key={admin.id} className="mb-2">
            {admin.email}
          </li>
        ))}
      </ol>
      <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)] text-[#333333]">
        USER
      </h1>
      <ol className="list-decimal list-inside font-[family-name:var(--font-geist-sans)] text-black">
        {users.map((user) => (
          <li key={user.id} className="mb-2">
            {user.email}
            <> | </>
            <Link href={`/user/${user.id}/profile`}>Show Profile</Link>
          </li>
        ))}
      </ol>
    </div>
  );
}