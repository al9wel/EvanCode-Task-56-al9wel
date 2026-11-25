import { useMutation } from "@tanstack/react-query"

import { ordersApi } from "@/features/orders/api/ordersApi"

export const useDeleteOrder = () => {
  return useMutation({
    mutationFn: (id: number) => ordersApi.deleteOrder(id),
  })
}
