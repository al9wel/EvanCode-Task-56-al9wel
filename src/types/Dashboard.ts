import type { Order } from "./Order"

export interface DashboardStatItem {
  label: string
  value: string
  delta: number
  footnote: string
}

export interface DailyComparisonPoint {
  date: string
  delivered: number
  inTransit: number
}

export interface StatusDistributionItem {
  key: "delivered" | "inTransit" | "newOrder"
  name: string
  value: number
}

export interface WeeklyOrderPoint {
  label: string
  delivered: number
  inTransit: number
  newOrder: number
  total: number
}

export interface CourierItem {
  id: string
  name: string
  status: "متصل" | "في استراحة"
  assigned: number
}

export interface ActivityLogItem {
  id: string
  title: string
  time: string
  type: "new" | "transit" | "delivered" | "payment"
}

export interface DashboardStatistics {
  stats: DashboardStatItem[]
  dailyComparison: DailyComparisonPoint[]
  statusDistribution: StatusDistributionItem[]
  weeklyOrders: WeeklyOrderPoint[]
  recentOrders: Order[]
  couriers: CourierItem[]
  activities: ActivityLogItem[]
}

export interface DashboardStatisticsResponse {
  data: DashboardStatistics
  message: string
}
