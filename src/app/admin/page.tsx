import db from "@/src/lib/db";

async function getAllProducts()
{
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store"
  })

  const products = await res.json()
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)] text-[#333333]" >Products</h1>
      {products.map((product: any) => (
          <li key={product.id} className="mb-2 text-[#333333]">
            {product.name}
            {product.price}
          </li>
        ))}
    </div>
  );
}

export default async function Home() 
{
  const users = await db.user.findMany();
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
      <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)] text-[#333333]">
        ADMIN
      </h1>
      <ol className="list-decimal list-inside font-[family-name:var(--font-geist-sans)] text-black">
        {users.map((user) => (
          <li key={user.id} className="mb-2">
            {user.email}
          </li>
        ))}
      </ol>
      { getAllProducts() }
    </div>
  );
}