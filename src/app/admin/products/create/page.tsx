"use client"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import buttonStyles from '@/src/styles/buttonStyles.module.css'

export default function CreateProduct() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)
  const [stock, setStock] = useState(1)
  const [category, setCategory] = useState("")
  const [image, setImage] = useState("")

  async function handleSubmit(e: any) {
    e.preventDefault()
    
    alert("submit");

    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        price,
        stock,
        category,
        image
      })
    })
    
    router.push("/admin/products")
  }

  return (
    <div className="bg-red">
      <form onSubmit={handleSubmit} className="bg-white">
      <div className="text-black">
      Nama : 
      <input
        placeholder="name"
        onChange={e => setName(e.target.value)}
        />
      </div>
      <div className="text-black">
        Harga: 
        <input
          placeholder="price"
          type="number"
          onChange={e => setPrice(Number(e.target.value))}
          />
      </div>
      <div className="text-black">
        Stock:
        <input
          placeholder="stock"
          type="number"
          onChange={e => setStock(Number(e.target.value))}
        />
      </div>
      <div className="text-black">
        Kategori:
        <input
          placeholder="category"
          onChange={e => setCategory(e.target.value)}
          />
      </div>
      <div className="text-black">
        Gambar:
        <input
          placeholder="image"
          onChange={e => setImage(e.target.value)}
          />
      </div>
      <button className={buttonStyles.btnCursor} type="submit">Create</button>
    </form>
    </div>
  )
}