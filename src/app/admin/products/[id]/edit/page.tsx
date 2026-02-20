"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"

export default function EditProductPage() {
  const { id } = useParams()
  const router = useRouter()

  const [form, setForm] = useState({
    name: "",
    price: 0,
    stock: 0,
    category: "",
    image: ""
  })

  const [loading, setLoading] = useState(true)

  // ⭐ GET detail produk (prefill form)
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/products/${id}`)
      const data = await res.json()

      console.log("check fetch")
      console.log(res)

      setForm({
        name: data.name || "",
        price: data.price || 0,
        stock: data.stock || 0,
        category: data.category || "",
        image: data.image || "",
      })

      setLoading(false)
    }

    if (id) fetchProduct()
  }, [id])

  // ⭐ handler input change
  const handleChange = (e: any) => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value
    }))
  }

  // ⭐ handler submit update
  const handleSubmit = async (e: any) => {
    e.preventDefault()

    await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })

    alert("Produk berhasil diupdate")
    router.push("/admin/products")
  }

  // if (loading) return <p>Loading...</p>

  return (
    <div>
      <h1>Edit Product</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nama produk"
        />

        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="Harga"
        />

        <input
          name="stock"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="Stok"
        />

        <textarea
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Kategori"
        />

        <textarea
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Gambar"
        />

        <button type="submit">Update</button>
      </form>
    </div>
  )
}