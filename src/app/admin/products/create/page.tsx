"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import buttonStyles from '@/src/styles/buttonStyles.module.css'

export default function CreateProduct() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)
  const [stock, setStock] = useState(1)
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
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
        description,
        image
      })
    })
    
    router.push("/admin/products")
  }

  return (
    <div className="bg-red">
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
      <button className={buttonStyles.btnCursor} type="submit">Create</button>
    </form>
    </div>
  )
}