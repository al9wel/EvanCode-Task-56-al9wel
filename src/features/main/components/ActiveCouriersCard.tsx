import type { ComponentProps } from "react"
import { EllipsisIcon, ListChecksIcon, SendIcon } from "lucide-react"
import { toast } from "sonner"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { StatusIndicator } from "@/components/ui/status-indicator"
import DashboardEmptyState from "@/features/main/components/DashboardEmptyState"
import { cn } from "@/lib/utils"
import type { CourierItem } from "@/types/Dashboard"

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("")
}

interface ActiveCouriersCardProps extends ComponentProps<typeof Card> {
  couriers?: CourierItem[]
}

export function ActiveCouriersCard({
  couriers = [],
  className,
  ...props
}: ActiveCouriersCardProps) {
  const showDemoNotice = () => {
    toast.info("هذه البيانات تجريبية للعرض فقط وليست مرتبطة بـ API حقيقي")
  }

  return (
    <Card className={cn("shadow-none dark:ring-0", className)} {...props}>
      <CardHeader className="border-b">
        <CardTitle>المندوبون في الميدان</CardTitle>
        <CardDescription>حالة مندوبي التوصيل والطلبات المسندة حالياً</CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        {couriers.length === 0 ? (
          <div className="p-4">
            <DashboardEmptyState message="لا يوجد مندوبون مسجلون حالياً" />
          </div>
        ) : (
          <ul className="flex flex-col divide-y divide-border">
            {couriers.map((c) => (
              <li className="flex items-center gap-2 p-3.5 sm:gap-3" key={c.id}>
                <Avatar className="size-9">
                  <AvatarFallback className="font-semibold text-xs">
                    {getInitials(c.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1 pe-1">
                  <p className="truncate font-semibold text-foreground text-sm leading-snug">
                    {c.name}
                  </p>
                  <p className="flex items-center gap-2 text-xs leading-snug">
                    <span className="flex shrink-0 items-center gap-1">
                      <StatusIndicator
                        color={c.status === "متصل" ? "emerald" : "amber"}
                        pulse={c.status === "متصل"}
                      />
                      {c.status}
                    </span>
                    <span className="inline-flex size-1 rounded-full bg-foreground/60" />
                    <span className="text-muted-foreground tabular-nums">
                      {c.assigned} طلبات مسندة
                    </span>
                  </p>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      aria-label={`إجراءات المندوب ${c.name}`}
                      size="icon-xs"
                      variant="ghost"
                    >
                      <EllipsisIcon />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="min-w-48">
                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="font-normal text-muted-foreground text-xs">
                        {c.name}
                      </DropdownMenuLabel>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        className="gap-2"
                        onSelect={showDemoNotice}
                      >
                        <SendIcon />
                        إرسال تنبيه
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="gap-2"
                        onSelect={showDemoNotice}
                      >
                        <ListChecksIcon />
                        تأكيد تسليم طلب
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
