import db from "@/src/lib/db";
import Link from "next/link"

async function handleSubmit(e: any) {
    e.preventDefault()
    
    alert("submit");

  }

export default async function Home() 
{
  const users = await db.user.findMany();
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store"
  })

  const products = await res.json()
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
      <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)] text-[#333333]" >Products</h1>
        {products.map((product: any) => (
          <li key={product.id} className="mb-2 text-[#333333]">
              {product.name +" | "+ product.price + " | "}
              {/* {product.price} */}
              <Link href={`/admin/products/${product.id}/edit`}>Edit</Link>
            </li>
          ))}
    </div>
  );
}