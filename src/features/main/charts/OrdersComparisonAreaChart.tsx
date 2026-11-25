import { memo } from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import DashboardEmptyState from "@/features/main/components/DashboardEmptyState"
import type { DailyComparisonPoint } from "@/types/Dashboard"

interface OrdersComparisonAreaChartProps {
  data?: DailyComparisonPoint[]
}

const chartConfig = {
  delivered: {
    label: "تم التوصيل",
    color: "var(--chart-1)",
  },
  inTransit: {
    label: "في الطريق",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

const OrdersComparisonAreaChart = memo(
  ({ data = [] }: OrdersComparisonAreaChartProps) => {
    const hasData = data.some(
      (item) => item.delivered > 0 || item.inTransit > 0
    )

    if (!hasData) {
      return <DashboardEmptyState message="لا توجد بيانات حركة توصيل للفترة" />
    }

    return (
      <ChartContainer className="h-80 w-full" config={chartConfig}>
        <AreaChart
          accessibilityLayer
          data={data}
          margin={{ top: 16, right: 8, left: 8, bottom: 8 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            axisLine={false}
            dataKey="date"
            minTickGap={20}
            tickLine={false}
            tickMargin={12}
          />
          <ChartTooltip
            content={<ChartTooltipContent indicator="dot" />}
            cursor={false}
          />
          <Area
            animationBegin={450}
            animationDuration={1100}
            animationEasing="ease-out"
            dataKey="delivered"
            fill="var(--color-delivered)"
            fillOpacity={0.22}
            isAnimationActive={true}
            stackId="orders"
            stroke="var(--color-delivered)"
            strokeWidth={2}
            type="natural"
          />
          <Area
            animationBegin={550}
            animationDuration={1100}
            animationEasing="ease-out"
            dataKey="inTransit"
            fill="var(--color-inTransit)"
            fillOpacity={0.22}
            isAnimationActive={true}
            stackId="orders"
            stroke="var(--color-inTransit)"
            strokeWidth={2}
            type="natural"
          />
          <ChartLegend content={<ChartLegendContent />} />
        </AreaChart>
      </ChartContainer>
    )
  }
)

OrdersComparisonAreaChart.displayName = "OrdersComparisonAreaChart"

export default OrdersComparisonAreaChart
