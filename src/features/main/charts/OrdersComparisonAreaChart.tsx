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

const chartData = [
  { date: "18 نوفمبر", delivered: 24, inTransit: 9 },
  { date: "19 نوفمبر", delivered: 28, inTransit: 11 },
  { date: "20 نوفمبر", delivered: 25, inTransit: 8 },
  { date: "21 نوفمبر", delivered: 31, inTransit: 12 },
  { date: "22 نوفمبر", delivered: 29, inTransit: 10 },
  { date: "23 نوفمبر", delivered: 35, inTransit: 14 },
  { date: "24 نوفمبر", delivered: 38, inTransit: 13 },
]

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

const OrdersComparisonAreaChart = memo(() => {
  return (
    <ChartContainer config={chartConfig} className="h-72 w-full">
      <AreaChart
        accessibilityLayer
        data={chartData}
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
          dataKey="delivered"
          fill="var(--color-delivered)"
          fillOpacity={0.22}
          isAnimationActive={false}
          stackId="orders"
          stroke="var(--color-delivered)"
          strokeWidth={2}
          type="natural"
        />
        <Area
          dataKey="inTransit"
          fill="var(--color-inTransit)"
          fillOpacity={0.22}
          isAnimationActive={false}
          stackId="orders"
          stroke="var(--color-inTransit)"
          strokeWidth={2}
          type="natural"
        />
        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  )
})

OrdersComparisonAreaChart.displayName = "OrdersComparisonAreaChart"

export default OrdersComparisonAreaChart
