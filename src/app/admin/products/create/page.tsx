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
  const [file, setFile] = useState<File | null>(null)

  async function handleSubmit(e: any) {
  // const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (!file) return

    const formData = new FormData()
    formData.append("file", file)

    const resUpload = await fetch("/api/upload-img", {
      method: "POST",
      body: formData
    })

    
    const data = await resUpload.json()
    console.log(resUpload)
    
    //need user const varible, because when use setstate is async so it always empty
    // const image = data.url

    // if (!image) {
    //   alert("Upload gagal")
    //   return
    // }
    // console.log(`isi image ${image}`);

    if (!data) {
      alert("Upload data gagal")
      return
    }
    if (!data.url) {
      alert("URL gambar kosong")
      return
    }
    const image = data.url
    const publicId = data.publicId
    console.log(`isi pulic id ${publicId}`)

    
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
        image,
        publicId
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
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </div>
      <button className={buttonStyles.btnCursor} type="submit">Create</button>
    </form>
    </div>
  )
}