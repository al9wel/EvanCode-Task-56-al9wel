import { memo } from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const chartConfig = {
  total: {
    label: "إجمالي الطلبات",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

const chartData = [
  { label: "السبت", delivered: 29, inTransit: 6, newOrder: 4, total: 39 },
  { label: "الأحد", delivered: 34, inTransit: 8, newOrder: 5, total: 47 },
  { label: "الإثنين", delivered: 31, inTransit: 7, newOrder: 4, total: 42 },
  { label: "الثلاثاء", delivered: 38, inTransit: 9, newOrder: 6, total: 53 },
  { label: "الأربعاء", delivered: 36, inTransit: 7, newOrder: 5, total: 48 },
  { label: "الخميس", delivered: 42, inTransit: 10, newOrder: 7, total: 59 },
  { label: "الجمعة", delivered: 25, inTransit: 5, newOrder: 3, total: 33 },
]

const WeeklyOrdersBarChart = memo(() => {
  return (
    <ChartContainer config={chartConfig} className="h-60 w-full">
      <BarChart
        accessibilityLayer
        data={chartData}
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
                const day = payload as unknown as (typeof chartData)[number]
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
          dataKey="total"
          fill="var(--color-total)"
          isAnimationActive={false}
          radius={[8, 8, 8, 8]}
        />
      </BarChart>
    </ChartContainer>
  )
})

WeeklyOrdersBarChart.displayName = "WeeklyOrdersBarChart"

export default WeeklyOrdersBarChart
