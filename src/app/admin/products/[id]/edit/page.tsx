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
  const [publicId, setPublicId] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

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
        setPublicId(data.publicId || "")
        setLoading(false)
    }

    if (id) fetchProduct()
  }, [id])

  // ⭐ handler submit update
  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const oldImage = image
    const oldpublicId = publicId
    let tempNewImage
    let tempNewPublicId
    if (file)
    {
      const formData = new FormData()
      formData.append("file", file)
      
      const resUpload = await fetch("/api/upload-img", {
        method: "POST",
        body: formData
      })
      
      const data = await resUpload.json()
      console.log(resUpload)
      
      if (!data) {
        alert("Upload data gagal")
        return
      }
      if (!data.url) {
        alert("URL gambar kosong")
        return
      }
      tempNewImage = data.url
      tempNewPublicId = data.publicId
    }
    const newImage = tempNewImage?tempNewImage:oldImage
    const newPublicId = tempNewPublicId?tempNewPublicId:oldpublicId

    await fetch(`/api/delete-img/${id}`, {
      method: "DELETE"
    })

    await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        price,
        stock,
        category,
        description,
        image: newImage,
        publicId: newPublicId
      })
    })

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
        Change New Image:
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const selectedFile = e.target.files?.[0] || null
            if (selectedFile && selectedFile.size > 1 * 1024 * 1024) {
              alert('File too large (max 1MB)')
              return
            }
            setFile(selectedFile)

            if (selectedFile) {
              setPreview(URL.createObjectURL(selectedFile))
            }
          }}
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            style={{ width: 200, marginTop: 10 }}
          />
        )}
      </div>
      <div>
        Current Image:
        {image && (<img src={image} width={100} /> ) }
      </div>
      <button className={buttonStyles.btnCursor} type="submit">Update</button>
    </form>
    </div>
  )
}