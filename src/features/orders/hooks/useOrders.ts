import { useQuery } from "@tanstack/react-query"

import { ordersApi } from "@/features/orders/api/ordersApi"

export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => ordersApi.getOrders(),
  })
}
