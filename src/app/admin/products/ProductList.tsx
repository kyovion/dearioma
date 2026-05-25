'use client'

import { useRouter } from "next/navigation"
import buttonStyles from '@/src/styles/buttonStyles.module.css'

export default function ProductList({ product }: any)
{
    const router = useRouter()
    const handleShowDetail = async (id:number) => {
        router.push(`/admin/products/${id}/detail`)
    }
    const handleEdit = async (id:number) => {
        router.push(`/admin/products/${id}/edit`)
    }
    const handleDelete = async (id:number) => {
        const confirmDelete = confirm("Yakin hapus?")

        if (!confirmDelete) return

        await fetch(`/api/delete-img/${id}`, {
            method: "DELETE"
        })

        await fetch(`/api/products/${id}`, {
            method: "DELETE"
        })

        router.refresh()
    }
    
    return(
    <>
        <li key={product.id} className="mb-2 text-[#333333]">
            {product.name +" | "+ product.price + " | " + product.stock + " | " + product.category + " | " + product.description + " | "}
            {product.image && (<img src={product.image} width={100} /> ) }
            {" | "}
            <button className="mr-2 border-2 cursor-pointer rounded bg-yellow-400" onClick={() => handleShowDetail(product.id)}>Show Detail Product</button>
            {" | "}
            <button className="mr-2 border-2 cursor-pointer rounded bg-yellow-400" onClick={() => handleEdit(product.id)}>Edit</button>
            {" | "}
            <button className="mr-2 border-2 cursor-pointer rounded bg-yellow-400" onClick={() => handleDelete(product.id)}>Delete</button>
        </li>
    </>
    )
}