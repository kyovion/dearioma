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

    // 🔥 OPTIMISTIC UPDATE
    onMutate: async ({ productId, quantity }) => {
      // 1. stop query sementara
      await queryClient.cancelQueries({ queryKey: ["cart"] })

      // 2. ambil data lama
      const previousCart = queryClient.getQueryData<any>(["cart"])

      // 3. update cache langsung
      queryClient.setQueryData(["cart"], (old: any) => {
        if (!old) return old

        const existingItem = old.items.find(
          (item: any) => item.productId === productId
        )

        if (existingItem) {
          return {
            ...old,
            items: old.items.map((item: any) =>
              item.productId === productId
                ? {
                    ...item,
                    quantity: item.quantity + quantity,
                  }
                : item
            ),
          }
        }

        // kalau item belum ada
        return {
          ...old,
          items: [
            ...old.items,
            {
              id: `temp-${Date.now()}`, // temporary
              productId,
              quantity,
              product: {
                name: "Loading...",
                price: 0,
              },
            },
          ],
        }
      })

      // 4. return context untuk rollback
      return { previousCart }
    },

    // ❌ kalau error → rollback
    onError: (err, variables, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(["cart"], context.previousCart)
        toast.error(err.message)
      }
    },

    // 🔄 sync ulang dengan server
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] })
      toast.success("Added to cart 🛒")
    },
  })
}
