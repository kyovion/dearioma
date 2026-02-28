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
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")

  const [loading, setLoading] = useState(true)

  // ⭐ GET detail produk (prefill form)
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/products/${id}`)
      const data = await res.json()

        setName(data.name || "")
        setPrice(data.price || 0)
        setStock(data.stock || 0)
        setCategory(data.category || "")
        setDescription(data.description || "")
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
        description,
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
      Product Name : 
      <input
        name="name"
        value={name}
        placeholder="Product Name"
        onChange={e => setName(e.target.value)}
        />
      </div>
      <div className="text-black">
        Price: 
        <input
          name="price"
          value={price}
          placeholder="Price"
          type="number"
          onChange={e => setPrice(Number(e.target.value))}
          />
      </div>
      <div className="text-black">
        Stock:
        <input
          name="stock"
          value={stock}
          placeholder="Stock"
          type="number"
          onChange={e => setStock(Number(e.target.value))}
        />
      </div>
      <div className="text-black">
        Category:
        <input
          name="category"
          value={category}
          placeholder="Category"
          onChange={e => setCategory(e.target.value)}
          />
      </div>
      <div className="text-black">
        Description:
        <input
          name="description"
          value={description}
          placeholder="Description"
          onChange={e => setDescription(e.target.value)}
          />
      </div>
      <div className="text-black">
        Image:
        <input
          name="image"
          value={image}
          placeholder="Image"
          onChange={e => setImage(e.target.value)}
          />
      </div>
      <button className={buttonStyles.btnCursor} type="submit">Update</button>
    </form>
    </div>
  )
}