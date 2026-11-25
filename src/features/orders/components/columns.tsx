import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDownIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Actions } from "@/features/orders/components/Actions"
import {
  formatCurrency,
  formatDate,
  getOrderStatusBadgeClass,
} from "@/lib/formater"
import type { Order } from "@/types/Order"

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "orderNumber",
    header: "رقم الطلب",
    cell: ({ row }) => (
      <span className="font-bold font-mono text-sm">
        {row.original.orderNumber}
      </span>
    ),
  },
  {
    accessorKey: "customerName",
    header: "اسم الزبون",
    cell: ({ row }) => (
      <div className="flex flex-col text-start">
        <span className="font-semibold text-foreground text-sm">
          {row.original.customerName}
        </span>
        <span className="max-w-48 truncate text-muted-foreground text-xs">
          {row.original.address}
        </span>
      </div>
    ),
  },
  {
    id: "items",
    header: "المنتجات",
    cell: ({ row }) => {
      const items = row.original.items ?? []
      if (items.length === 0) {
        return <span className="text-muted-foreground text-xs">—</span>
      }
      const first = items[0]
      const extraCount = items.length - 1
      return (
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          <Badge className="max-w-44 truncate" variant="outline">
            {first.name} ×{first.quantity}
          </Badge>
          {extraCount > 0 && (
            <Badge variant="secondary">+{extraCount}</Badge>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <Button
        className="font-bold text-inherit hover:bg-white/10 hover:text-inherit"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        size="sm"
        variant="ghost"
      >
        المبلغ
        <ArrowUpDownIcon className="size-3.5" data-icon="inline-end" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="font-bold tabular-nums text-sm">
        {formatCurrency(row.original.amount)}
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        className="font-bold text-inherit hover:bg-white/10 hover:text-inherit"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        size="sm"
        variant="ghost"
      >
        التاريخ
        <ArrowUpDownIcon className="size-3.5" data-icon="inline-end" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="text-muted-foreground text-sm">
        {formatDate(row.original.createdAt.slice(0, 10), "full")}
      </span>
    ),
  },
  {
    accessorKey: "status",
    filterFn: "equalsString",
    header: "الحالة",
    cell: ({ row }) => (
      <Badge
        className={getOrderStatusBadgeClass(row.original.status)}
        variant="secondary"
      >
        {row.original.status}
      </Badge>
    ),
  },
  {
    id: "actions",
    header: "الإجراءات",
    cell: ({ row }) => <Actions order={row.original} />,
  },
]
