"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
// import buttonStyles from '../../../../../styles/buttonStyles.module.css'
import buttonStyles from '@/src/styles/buttonStyles.module.css'

export default function EditProductPage() {
  const { id } = useParams()
  const router = useRouter()

  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)
  const [stock, setStock] = useState(1)
  const [category, setCategory] = useState("")
  const [image, setImage] = useState("")

  const [loading, setLoading] = useState(true)

  // ⭐ GET detail produk (prefill form)
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/products/${id}`)
      const data = await res.json()

      console.log("check fetch")
      console.log(res)
     
        setName(data.name || "")
        setPrice(data.price || 0)
        setStock(data.stock || 0)
        setCategory(data.category || "")
        setImage(data.image || "")

      setLoading(false)
    }

    if (id) fetchProduct()
  }, [id])

  // ⭐ handler submit update
  const handleSubmit = async (e: any) => {
    e.preventDefault()

    await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        price,
        stock,
        category,
        image
      })
    })

    alert("Produk berhasil diupdate")
    router.push("/admin/products")
  }

  if (loading) return <p>Loading...</p>

  return (
    <div>
      <h1>Edit Product</h1>

      <form onSubmit={handleSubmit} className="bg-white">
      <div className="text-black">
      Nama : 
      <input
        name="name"
        value={name}
        placeholder="name"
        onChange={e => setName(e.target.value)}
        />
      </div>
      <div className="text-black">
        Harga: 
        <input
          name="price"
          value={price}
          placeholder="price"
          type="number"
          onChange={e => setPrice(Number(e.target.value))}
          />
      </div>
      <div className="text-black">
        Stock:
        <input
          name="stock"
          value={stock}
          placeholder="stock"
          type="number"
          onChange={e => setStock(Number(e.target.value))}
        />
      </div>
      <div className="text-black">
        Kategori:
        <input
          name="category"
          value={category}
          placeholder="category"
          onChange={e => setCategory(e.target.value)}
          />
      </div>
      <div className="text-black">
        Gambar:
        <input
          name="image"
          value={image}
          placeholder="image"
          onChange={e => setImage(e.target.value)}
          />
      </div>
      <button className="text-black bg-yellow-500 btn-cursor" type="submit">Update</button>
    </form>
    </div>
  )
}