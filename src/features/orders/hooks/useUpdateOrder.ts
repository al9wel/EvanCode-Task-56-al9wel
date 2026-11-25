import { useMutation } from "@tanstack/react-query"

import { ordersApi } from "@/features/orders/api/ordersApi"
import type { OrderFormValues } from "@/types/Order"

export const useUpdateOrder = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: OrderFormValues }) =>
      ordersApi.updateOrder(id, data),
  })
}
