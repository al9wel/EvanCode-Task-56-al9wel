import { memo } from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import DashboardEmptyState from "@/features/main/components/DashboardEmptyState"
import type { WeeklyOrderPoint } from "@/types/Dashboard"

interface WeeklyOrdersBarChartProps {
  data?: WeeklyOrderPoint[]
}

const chartConfig = {
  total: {
    label: "إجمالي الطلبات",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

const WeeklyOrdersBarChart = memo(
  ({ data = [] }: WeeklyOrdersBarChartProps) => {
    const hasData = data.some((item) => item.total > 0)

    if (!hasData) {
      return <DashboardEmptyState message="لا توجد طلبات مسجلة لهذا الأسبوع" />
    }

    return (
      <ChartContainer className="h-60 w-full" config={chartConfig}>
        <BarChart
          accessibilityLayer
          data={data}
          margin={{ top: 16, right: 8, left: 8, bottom: 0 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            axisLine={false}
            dataKey="label"
            interval={0}
            tickLine={false}
            tickMargin={10}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(_value, _name, _item, _index, payload) => {
                  const day = payload as unknown as WeeklyOrderPoint
                  return (
                    <div className="flex min-w-36 flex-col gap-2 text-start">
                      <div className="flex items-center justify-between gap-4 font-bold">
                        <span>إجمالي اليوم</span>
                        <span className="tabular-nums">{day.total}</span>
                      </div>
                      <div className="grid gap-1 text-muted-foreground">
                        <div className="flex items-center justify-between gap-4">
                          <span>تم التوصيل</span>
                          <span className="tabular-nums">{day.delivered}</span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <span>في الطريق</span>
                          <span className="tabular-nums">{day.inTransit}</span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <span>جديد</span>
                          <span className="tabular-nums">{day.newOrder}</span>
                        </div>
                      </div>
                    </div>
                  )
                }}
                hideLabel
              />
            }
            cursor={false}
          />
          <Bar
            animationBegin={550}
            animationDuration={1000}
            animationEasing="ease-out"
            dataKey="total"
            fill="var(--color-total)"
            isAnimationActive={true}
            radius={[8, 8, 8, 8]}
          />
        </BarChart>
      </ChartContainer>
    )
  }
)

WeeklyOrdersBarChart.displayName = "WeeklyOrdersBarChart"

export default WeeklyOrdersBarChart
