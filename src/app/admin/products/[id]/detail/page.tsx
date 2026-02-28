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

  if (loading) return <p>Loading...</p>

  return (
    <div>
      <h1>Detail Product</h1>

      <div>
        Product Name : {name}
      </div>
      <div>
        Price: {price}
      </div>
      <div>
        Stock: {stock}
      </div>
      <div>
        Category: {category}
      </div>
      <div>
        Description: {description}
      </div>
      <div>
        Image: {image}
      </div>
      
    </div>
  )
}