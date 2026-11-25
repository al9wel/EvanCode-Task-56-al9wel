import { useMutation } from "@tanstack/react-query"

import { ordersApi } from "@/features/orders/api/ordersApi"
import type { OrderFormValues } from "@/types/Order"

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: (data: OrderFormValues) => ordersApi.createOrder(data),
  })
}
