import { fetchClient } from "@/lib/fetchClient"
import type {
  OrderFormValues,
  OrderMutationResponse,
  OrdersResponse,
} from "@/types/Order"

export const ordersApi = {
  getOrders: (): Promise<OrdersResponse> => {
    return fetchClient<OrdersResponse>("/orders", {
      method: "GET",
    })
  },

  createOrder: (data: OrderFormValues): Promise<OrderMutationResponse> => {
    return fetchClient<OrderMutationResponse>("/orders", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  updateOrder: (
    id: number,
    data: OrderFormValues
  ): Promise<OrderMutationResponse> => {
    return fetchClient<OrderMutationResponse>(`/orders/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  },

  deleteOrder: (id: number): Promise<OrderMutationResponse> => {
    return fetchClient<OrderMutationResponse>(`/orders/${id}`, {
      method: "DELETE",
    })
  },
}
