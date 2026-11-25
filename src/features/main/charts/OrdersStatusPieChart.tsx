import { memo } from "react"
import { Label, Pie, PieChart } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

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

const chartData = [
  {
    key: "delivered",
    name: "تم التوصيل",
    value: 86,
    fill: "var(--color-chart-1)",
  },
  {
    key: "inTransit",
    name: "في الطريق",
    value: 34,
    fill: "var(--color-chart-2)",
  },
  {
    key: "newOrder",
    name: "جديد",
    value: 28,
    fill: "var(--color-chart-3)",
  },
]

const total = chartData.reduce((sum, item) => sum + item.value, 0)

const OrdersStatusPieChart = memo(() => {
  return (
    <div className="grid items-center gap-4 lg:grid-cols-[1.1fr_0.9fr]">
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square h-60"
      >
        <PieChart>
          <ChartTooltip
            content={<ChartTooltipContent hideLabel nameKey="name" />}
            cursor={false}
          />
          <Pie
            cornerRadius={4}
            data={chartData}
            dataKey="value"
            innerRadius={60}
            isAnimationActive={false}
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

      <div className="flex flex-col gap-3.5">
        {chartData.map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between gap-3 rounded-lg border bg-muted/30 px-3 py-2"
          >
            <div className="flex items-center gap-2.5">
              <span
                className="size-3 shrink-0 rounded-full"
                style={{ backgroundColor: item.fill }}
              />
              <span className="font-semibold text-foreground/85 text-sm">
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
})

OrdersStatusPieChart.displayName = "OrdersStatusPieChart"

export default OrdersStatusPieChart
