import { type ComponentProps, useState } from "react"
import { EllipsisIcon, ListChecksIcon, SendIcon } from "lucide-react"

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
import { cn } from "@/lib/utils"

type Courier = {
  id: string
  name: string
  status: "متصل" | "في استراحة"
  assigned: number
}

const INITIAL_COURIERS: readonly Courier[] = [
  { id: "c1", name: "محمد الحمادي", status: "متصل", assigned: 6 },
  { id: "c2", name: "عبدالله السنباني", status: "متصل", assigned: 5 },
  { id: "c3", name: "ياسر المقطري", status: "في استراحة", assigned: 2 },
  { id: "c4", name: "أكرم الشيباني", status: "متصل", assigned: 7 },
  { id: "c5", name: "صالح العولقي", status: "في استراحة", assigned: 1 },
]

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("")
}

export function ActiveCouriersCard({
  className,
  ...props
}: ComponentProps<typeof Card>) {
  const [couriers, setCouriers] = useState<Courier[]>(() => [
    ...INITIAL_COURIERS,
  ])

  function markDelivered(id: string) {
    setCouriers((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, assigned: Math.max(0, c.assigned - 1) } : c
      )
    )
  }

  return (
    <Card className={cn("shadow-none dark:ring-0", className)} {...props}>
      <CardHeader className="border-b">
        <CardTitle>المندوبون في الميدان</CardTitle>
        <CardDescription>حالة مندوبي التوصيل والطلبات المسندة حالياً</CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        <ul className="flex flex-col divide-y divide-border">
          {couriers.map((c) => (
            <li
              className="flex items-center gap-2 p-3 sm:gap-3"
              key={c.id}
            >
              <Avatar className="size-8">
                <AvatarFallback className="text-xs">
                  {getInitials(c.name)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1 pe-1">
                <p className="truncate font-medium text-foreground text-sm leading-snug">
                  {c.name}
                </p>
                <p className="flex items-center gap-2 text-[11px] leading-snug">
                  <span className="flex shrink-0 items-center gap-1">
                    <StatusIndicator
                      color={c.status === "متصل" ? "emerald" : "amber"}
                      pulse={c.status === "متصل"}
                    />
                    {c.status}
                  </span>
                  <span className="inline-flex size-1 rounded-full bg-foreground/60" />
                  <span className="tabular-nums text-muted-foreground">
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
                    <DropdownMenuItem className="gap-2">
                      <SendIcon />
                      إرسال تنبيه
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="gap-2"
                      disabled={c.assigned === 0}
                      onSelect={() => markDelivered(c.id)}
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
      </CardContent>
    </Card>
  )
}
