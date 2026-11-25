import type { ComponentProps } from "react"
import { PackageIcon } from "lucide-react"

import { AnimatedList } from "@/components/ui/animated-list"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import DashboardEmptyState from "@/features/main/components/DashboardEmptyState"
import { formatCurrency, getOrderStatusBadgeClass } from "@/lib/formater"
import { cn } from "@/lib/utils"
import type { Order } from "@/types/Order"

interface RecentOrdersCardProps extends ComponentProps<typeof Card> {
  orders?: Order[]
}

export function RecentOrdersCard({
  orders = [],
  className,
  ...props
}: RecentOrdersCardProps) {
  const visibleOrders = orders.slice(0, 4)

  return (
    <Card
      className={cn("gap-0 py-0 shadow-none dark:ring-0", className)}
      {...props}
    >
      <div className="flex items-center justify-between border-b px-4 py-2.5">
        <h3 className="font-bold text-foreground text-sm">أحدث الطلبات</h3>
        <span className="text-muted-foreground text-xs">آخر 4 طلبات واردة</span>
      </div>

      <CardContent className="px-0 py-0.5">
        {visibleOrders.length === 0 ? (
          <div className="p-4">
            <DashboardEmptyState message="لا توجد طلبات حديثة" />
          </div>
        ) : (
          <AnimatedList className="gap-0 divide-y divide-border" delay={650}>
            {visibleOrders.map((order) => {
              const firstItem = order.items[0]?.name ?? "شحنة توصيل"
              const extraCount = Math.max(0, order.items.length - 1)

              return (
                <div
                  className="flex w-full items-center justify-between gap-2.5 px-4 py-2"
                  key={order.id}
                >
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span
                      aria-hidden="true"
                      className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground [&_svg]:size-4"
                    >
                      <PackageIcon />
                    </span>
                    <div className="flex min-w-0 flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold font-mono text-foreground text-xs">
                          {order.orderNumber}
                        </span>
                        <p className="truncate font-semibold text-foreground text-sm">
                          {order.customerName}
                        </p>
                      </div>
                      <p className="truncate text-muted-foreground text-xs">
                        {firstItem}
                        {extraCount > 0 ? ` (+${extraCount})` : ""}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-col items-end gap-0.5">
                    <span className="font-bold text-foreground tabular-nums text-xs">
                      {formatCurrency(order.amount)}
                    </span>
                    <Badge
                      className={cn(
                        "h-5 px-2 text-[11px]",
                        getOrderStatusBadgeClass(order.status)
                      )}
                      variant="secondary"
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              )
            })}
          </AnimatedList>
        )}
      </CardContent>
    </Card>
  )
}
