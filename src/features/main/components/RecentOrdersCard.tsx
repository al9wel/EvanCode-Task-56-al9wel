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
import { formatCurrency } from "@/lib/formater"
import { cn } from "@/lib/utils"

type PreviewOrderStatus = "جديد" | "في الطريق" | "تم التوصيل"

type PreviewOrder = {
  id: string
  customerName: string
  amount: number
  date: string
  status: PreviewOrderStatus
}

const previewOrders: readonly PreviewOrder[] = [
  {
    id: "#1024",
    customerName: "أحمد عبدالكريم المتوكل",
    amount: 8500,
    date: "اليوم، 01:40 م",
    status: "جديد",
  },
  {
    id: "#1023",
    customerName: "فاطمة محمد الشامي",
    amount: 14200,
    date: "اليوم، 12:15 م",
    status: "في الطريق",
  },
  {
    id: "#1022",
    customerName: "خالد يحيى الأرياني",
    amount: 6000,
    date: "اليوم، 10:50 ص",
    status: "تم التوصيل",
  },
  {
    id: "#1021",
    customerName: "سارة علي العواضي",
    amount: 21500,
    date: "أمس، 08:30 م",
    status: "تم التوصيل",
  },
]

function statusBadgeClass(status: PreviewOrderStatus): string {
  if (status === "تم التوصيل") {
    return "border-transparent bg-success text-success-foreground"
  }
  if (status === "جديد") {
    return "border-transparent bg-brand-lime text-brand-lime-foreground"
  }
  return ""
}

export function RecentOrdersCard({
  className,
  ...props
}: ComponentProps<typeof Card>) {
  return (
    <Card
      className={cn("gap-0 shadow-none md:col-span-2 dark:ring-0", className)}
      {...props}
    >
      <CardHeader className="border-b">
        <CardTitle>أحدث الطلبات</CardTitle>
        <CardDescription>آخر 4 طلبات واردة إلى نظام وصّل</CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="ps-6">رقم الطلب</TableHead>
              <TableHead>اسم الزبون</TableHead>
              <TableHead className="hidden sm:table-cell">التاريخ</TableHead>
              <TableHead className="text-end">المبلغ</TableHead>
              <TableHead className="pe-6 text-end">الحالة</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {previewOrders.map((order) => (
              <TableRow className="h-14 hover:bg-transparent" key={order.id}>
                <TableCell className="ps-6 font-mono font-medium text-xs">
                  {order.id}
                </TableCell>
                <TableCell className="max-w-36 truncate font-medium">
                  {order.customerName}
                </TableCell>
                <TableCell className="hidden text-muted-foreground text-xs sm:table-cell">
                  {order.date}
                </TableCell>
                <TableCell className="text-end font-medium tabular-nums text-sm">
                  {formatCurrency(order.amount)}
                </TableCell>
                <TableCell className="pe-6 text-end">
                  <Badge
                    className={statusBadgeClass(order.status)}
                    variant="secondary"
                  >
                    {order.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-center border-t py-3">
          <Button asChild size="sm" variant="ghost">
            <Link to={ROUTES.DASHBOARD.ORDERS}>
              عرض جميع الطلبات
              <ArrowLeftIcon aria-hidden="true" data-icon="inline-end" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
