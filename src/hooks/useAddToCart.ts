import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

export const useAddToCart = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }: {
      productId: string
      quantity: number
    }) => {
      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity }),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || "Failed to add to cart")
      }

      return res.json()
    },

    // 🔥 AUTO REFRESH CART
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] })
      toast.success("Added to cart 🛒")
    },

    onError: (error: any) => {
       toast.error(error.message)
    }
  })
}