import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ productId }: { productId: string }) => {
      const res = await fetch("/api/cart/remove", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      })

      if (!res.ok) throw new Error("Failed remove item")

      return res.json()
    },

    onMutate: async ({ productId }) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] })

      const previousCart = queryClient.getQueryData<any>(["cart"])

      queryClient.setQueryData(["cart"], (old: any) => {
        if (!old) return old

        const index = old.items.findIndex(
          (item: any) => item.productId === productId
        )

        if (index === -1) return old

        const newItems = [...old.items]
        newItems.splice(index, 1) // 🔥 remove by index (lebih stabil)

        return {
          ...old,
          items: newItems,
        }
      })

      return { previousCart }
    },

    onError: (err, variables, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(["cart"], context.previousCart)
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] })
    },
  })
}