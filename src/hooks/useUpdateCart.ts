import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useUpdateCart = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }: {
      productId: string
      quantity: number
    }) => {
      const res = await fetch("/api/cart/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity }),
      })

      if (!res.ok) throw new Error("Failed update cart")

      return res.json()
    },

    onMutate: async ({ productId, quantity }) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] })

      const previousCart = queryClient.getQueryData<any>(["cart"])

      queryClient.setQueryData(["cart"], (old: any) => {
        if (!old) return old

        return {
          ...old,
          items: old.items.map((item: any) =>
            item.productId === productId
              ? { ...item, quantity }
              : item
          )
          .filter((item: any) => item.quantity > 0), // auto remove kalau 0
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