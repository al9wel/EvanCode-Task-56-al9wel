import { memo } from "react"
import { Label, Pie, PieChart } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import DashboardEmptyState from "@/features/main/components/DashboardEmptyState"
import type { StatusDistributionItem } from "@/types/Dashboard"

interface OrdersStatusPieChartProps {
  data?: StatusDistributionItem[]
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
  newOrder: {
    label: "جديد",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig

const colorByKey: Record<StatusDistributionItem["key"], string> = {
  delivered: "var(--color-chart-1)",
  inTransit: "var(--color-chart-2)",
  newOrder: "var(--color-chart-3)",
}

const OrdersStatusPieChart = memo(
  ({ data = [] }: OrdersStatusPieChartProps) => {
    const chartData = data.map((item) => ({
      ...item,
      fill: colorByKey[item.key],
    }))
    const total = chartData.reduce((sum, item) => sum + item.value, 0)

    if (total === 0) {
      return <DashboardEmptyState message="لا توجد حالات طلبات مسجلة" />
    }

    return (
      <div className="grid items-center gap-4 sm:grid-cols-[1.1fr_0.9fr]">
        <ChartContainer
          className="mx-auto aspect-square h-60"
          config={chartConfig}
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent hideLabel nameKey="name" />}
              cursor={false}
            />
            <Pie
              animationBegin={500}
              animationDuration={1050}
              animationEasing="ease-out"
              cornerRadius={4}
              data={chartData}
              dataKey="value"
              innerRadius={60}
              isAnimationActive={true}
              nameKey="name"
              outerRadius={98}
              paddingAngle={4}
              strokeWidth={6}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        dominantBaseline="middle"
                        textAnchor="middle"
                        x={viewBox.cx}
                        y={viewBox.cy}
                      >
                        <tspan
                          className="fill-foreground font-bold text-3xl"
                          x={viewBox.cx}
                          y={viewBox.cy}
                        >
                          {total}
                        </tspan>
                        <tspan
                          className="fill-muted-foreground text-xs"
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 26}
                        >
                          طلب
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>

        <div className="flex flex-col gap-2.5">
          {chartData.map((item) => (
            <div
              className="flex items-center justify-between gap-3 rounded-lg border bg-muted/30 px-3 py-2"
              key={item.key}
            >
              <div className="flex items-center gap-2">
                <span
                  className="size-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: item.fill }}
                />
                <span className="font-semibold text-foreground/85 text-xs sm:text-sm">
                  {item.name}
                </span>
              </div>
              <span className="font-bold text-muted-foreground tabular-nums text-sm">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }
)

OrdersStatusPieChart.displayName = "OrdersStatusPieChart"

export default OrdersStatusPieChart
