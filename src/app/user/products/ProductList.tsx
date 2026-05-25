'use client'

import { useRouter } from "next/navigation"
import buttonStyles from '@/src/styles/buttonStyles.module.css'
import AddToCartButton from "@/src/components/cart/AddToCartButton"

export default function ProductList({ product }: any)
{
    const router = useRouter()
    const handleShowDetail = async (id:number) => {
        router.push(`/user/products/${id}/detail`)
    }
    
    return(
    <>
        <li key={product.id} className="mb-2 text-[#333333]">
            {product.name +" | "+ product.price + " | " + product.stock + " | " + product.category + " | " + product.description + " | " + product.image + " | " }
            <button className="mr-2 border-2 cursor-pointer rounded bg-yellow-400" onClick={() => handleShowDetail(product.id)}>Show Detail Product</button>
            { " | "}
            <AddToCartButton productId={product.id}/>
        </li>
    </>
    )
}