import type { ComponentProps } from "react"
import { ArrowLeftIcon } from "lucide-react"
import { Link } from "react-router-dom"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ROUTES } from "@/constants/routes"
import DashboardEmptyState from "@/features/main/components/DashboardEmptyState"
import { cn } from "@/lib/utils"
import type { ActivityLogItem } from "@/types/Dashboard"

const typeLabel: Record<ActivityLogItem["type"], string> = {
  new: "طلب جديد",
  transit: "تحرك مندوب",
  delivered: "تسليم مكتمل",
  payment: "تحصيل مبلغ",
}

const typeBadgeClass: Record<ActivityLogItem["type"], string> = {
  new: "border-transparent bg-brand-lime text-brand-lime-foreground",
  transit: "",
  delivered: "border-transparent bg-success text-success-foreground",
  payment: "",
}

interface DeliveryActivityCardProps extends ComponentProps<typeof Card> {
  activities?: ActivityLogItem[]
}

export function DeliveryActivityCard({
  activities = [],
  className,
  ...props
}: DeliveryActivityCardProps) {
  return (
    <Card className={cn("gap-0 shadow-none dark:ring-0", className)} {...props}>
      <CardHeader className="border-b">
        <CardTitle>سجل النشاط الميداني</CardTitle>
        <CardDescription>جدول آخر التحديثات الميدانية لحركة الطلبات.</CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        {activities.length === 0 ? (
          <div className="p-4">
            <DashboardEmptyState message="لا توجد تحديثات نشاط مسجلة" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="ps-6">نوع العملية</TableHead>
                <TableHead>التفاصيل</TableHead>
                <TableHead className="pe-6 text-end">الوقت</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activities.map((item) => (
                <TableRow
                  className="h-14 hover:bg-transparent"
                  key={item.id}
                >
                  <TableCell className="ps-6">
                    <Badge
                      className={typeBadgeClass[item.type]}
                      variant="secondary"
                    >
                      {typeLabel[item.type]}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-64 truncate font-medium text-sm">
                    {item.title}
                  </TableCell>
                  <TableCell className="pe-6 text-end text-muted-foreground text-xs tabular-nums">
                    {item.time}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>

      <div className="mt-auto flex items-center justify-center border-t py-2.5">
        <Button asChild size="sm" variant="ghost">
          <Link to={ROUTES.DASHBOARD.ORDERS}>
            استعراض كل الطلبات
            <ArrowLeftIcon aria-hidden="true" data-icon="inline-end" />
          </Link>
        </Button>
      </div>
    </Card>
  )
}
