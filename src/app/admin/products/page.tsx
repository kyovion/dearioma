import ProductList from "./ProductList";

export default async function Home() 
{
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store"
  })

  const products = await res.json()
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
      <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)] text-[#333333]" >Products</h1>
        {products.map((p: any) => (
          <ProductList key={p.id} product={p} />
          ))}
    </div>
  );
}