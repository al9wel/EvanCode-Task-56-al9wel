export type OrderStatus = "جديد" | "في الطريق" | "تم التوصيل"

export interface OrderItem {
  name: string
  quantity: number
}

export interface Order {
  id: number
  orderNumber: string
  customerName: string
  phone: string
  address: string
  items: OrderItem[]
  amount: number
  createdAt: string
  status: OrderStatus
}

export interface OrderFormValues {
  customerName: string
  phone: string
  address: string
  itemsSummary: string
  amount: number
  createdAt: string
  status: OrderStatus
}

export interface OrdersResponse {
  data: Order[]
  message: string
}

export interface OrderMutationResponse {
  data: Order | null
  message: string
}
