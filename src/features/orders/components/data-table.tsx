import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table"
import {
  ArrowUpDownIcon,
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  SearchIcon,
  SearchXIcon,
  WalletIcon,
  XIcon,
} from "lucide-react"
import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Actions } from "@/features/orders/components/Actions"
import { CreateOrderDialog } from "@/features/orders/components/CreateOrderDialog"
import {
  formatCurrency,
  formatDate,
  getOrderStatusBadgeClass,
} from "@/lib/formater"
import type { Order } from "@/types/Order"

interface DataTableProps<TData extends Order, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

const sortOptions = [
  {
    key: "date-desc",
    label: "التاريخ: الأحدث أولاً",
    icon: CalendarIcon,
    sorting: [{ id: "createdAt", desc: true }],
  },
  {
    key: "date-asc",
    label: "التاريخ: الأقدم أولاً",
    icon: CalendarIcon,
    sorting: [{ id: "createdAt", desc: false }],
  },
  {
    key: "amount-desc",
    label: "المبلغ: الأعلى أولاً",
    icon: WalletIcon,
    sorting: [{ id: "amount", desc: true }],
  },
  {
    key: "amount-asc",
    label: "المبلغ: الأقل أولاً",
    icon: WalletIcon,
    sorting: [{ id: "amount", desc: false }],
  },
] as const

export function DataTable<TData extends Order, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([
    { id: "createdAt", desc: true },
  ])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    state: {
      columnFilters,
      sorting,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  })

  const searchValue =
    (table.getColumn("customerName")?.getFilterValue() as string) ?? ""
  const statusFilter =
    (table.getColumn("status")?.getFilterValue() as string) || "all"

  const currentSort = sorting[0]
  const activeSortLabel = currentSort
    ? currentSort.id === "amount"
      ? currentSort.desc
        ? "المبلغ (الأعلى)"
        : "المبلغ (الأقل)"
      : currentSort.desc
        ? "التاريخ (الأحدث)"
        : "التاريخ (الأقدم)"
    : "الترتيب"

  const rows = table.getRowModel().rows
  const filteredTotal = table.getFilteredRowModel().rows.length

  const resetFilters = () => {
    table.resetColumnFilters()
  }

  return (
    <div className="flex flex-col gap-4" dir="rtl">
      {/* Search, Sort & Filter Toolbar */}
      <div className="rounded-2xl border bg-card p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
            {/* Search by Customer Name */}
            <div className="relative flex-1 sm:max-w-sm">
              <SearchIcon className="pointer-events-none absolute start-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                aria-label="البحث باسم الزبون"
                className="h-10 ps-10 pe-9"
                onChange={(event) =>
                  table
                    .getColumn("customerName")
                    ?.setFilterValue(event.target.value)
                }
                placeholder="ابحث باسم الزبون..."
                value={searchValue}
              />
              {searchValue && (
                <button
                  aria-label="مسح البحث"
                  className="absolute end-2.5 top-1/2 -translate-y-1/2 rounded p-0.5 text-muted-foreground hover:text-foreground"
                  onClick={() =>
                    table.getColumn("customerName")?.setFilterValue("")
                  }
                  type="button"
                >
                  <XIcon className="size-4" />
                </button>
              )}
            </div>

            {/* Sort Button (Date or Amount) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="justify-between sm:w-auto" variant="outline">
                  <ArrowUpDownIcon data-icon="inline-start" />
                  <span>ترتيب: {activeSortLabel}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-52">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-muted-foreground text-xs">
                    ترتيب الطلبات حسب
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {sortOptions.map((option) => {
                    const Icon = option.icon
                    return (
                      <DropdownMenuItem
                        className="gap-2"
                        key={option.key}
                        onSelect={() => setSorting([...option.sorting])}
                      >
                        <Icon className="size-4 text-muted-foreground" />
                        <span>{option.label}</span>
                      </DropdownMenuItem>
                    )
                  })}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Status Filter */}
            <Select
              onValueChange={(val) =>
                table
                  .getColumn("status")
                  ?.setFilterValue(val === "all" ? "" : val)
              }
              value={statusFilter}
            >
              <SelectTrigger
                aria-label="تصفية حسب الحالة"
                className="h-10 w-full sm:w-40"
              >
                <SelectValue placeholder="كل الحالات" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">كل الحالات</SelectItem>
                  <SelectItem value="جديد">جديد</SelectItem>
                  <SelectItem value="في الطريق">في الطريق</SelectItem>
                  <SelectItem value="تم التوصيل">تم التوصيل</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <CreateOrderDialog />
        </div>
      </div>

      {/* Empty Search / Filter State */}
      {rows.length === 0 ? (
        <Empty className="min-h-72 border bg-card py-12">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <SearchXIcon />
            </EmptyMedia>
            <EmptyTitle className="font-bold text-base">
              لا توجد طلبات مطابقة لبحثك
            </EmptyTitle>
            <EmptyDescription>
              {searchValue
                ? `لم نعثر على أي طلب مسجل باسم الزبون «${searchValue}». تأكد من كتابة الاسم بشكل صحيح أو امسح البحث.`
                : "لا توجد طلبات تطابق معايير التصفية المحددة حالياً."}
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button onClick={resetFilters} size="sm" variant="outline">
              مسح البحث والفلاتر
            </Button>
          </EmptyContent>
        </Empty>
      ) : (
        <>
          {/* Desktop DataTable */}
          <div className="hidden overflow-hidden rounded-2xl border bg-card md:block">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    className="border-none bg-primary hover:bg-primary"
                    key={headerGroup.id}
                  >
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        className="h-12 text-center font-bold text-primary-foreground first:text-start nth-2:text-start"
                        key={header.id}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    className="transition-colors hover:bg-muted/40"
                    key={row.id}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        className="px-4 py-3 text-center font-medium first:text-start nth-2:text-start"
                        key={cell.id}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Responsive Order Cards (driven by the same useReactTable rows) */}
          <div className="grid grid-cols-1 gap-3 md:hidden">
            {rows.map((row) => {
              const order = row.original
              return (
                <div
                  className="flex flex-col gap-3 rounded-2xl border bg-card p-4"
                  key={row.id}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold font-mono text-foreground text-sm">
                      {order.orderNumber}
                    </span>
                    <Badge
                      className={getOrderStatusBadgeClass(order.status)}
                      variant="secondary"
                    >
                      {order.status}
                    </Badge>
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <p className="font-bold text-base text-foreground">
                      {order.customerName}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {order.address}
                    </p>
                  </div>

                  {order.items.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {order.items.map((item) => (
                        <Badge key={item.name} variant="outline">
                          {item.name} ×{item.quantity}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between border-t pt-3">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-bold text-foreground tabular-nums text-sm">
                        {formatCurrency(order.amount)}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {formatDate(order.createdAt.slice(0, 10), "full")}
                      </span>
                    </div>
                    <Actions order={order} />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Pagination Controls */}
          <div className="flex flex-col items-center justify-between gap-3 px-1 py-1 sm:flex-row">
            <div className="font-medium text-muted-foreground text-sm">
              عرض {rows.length} من أصل {filteredTotal} طلب — صفحة{" "}
              {table.getState().pagination.pageIndex + 1} من{" "}
              {Math.max(1, table.getPageCount())}
            </div>

            <div className="flex items-center gap-2">
              <Button
                aria-label="الصفحة الأولى"
                className="hidden lg:inline-flex"
                disabled={!table.getCanPreviousPage()}
                onClick={() => table.setPageIndex(0)}
                size="icon-sm"
                variant="outline"
              >
                <ChevronsRightIcon />
              </Button>
              <Button
                aria-label="الصفحة السابقة"
                disabled={!table.getCanPreviousPage()}
                onClick={() => table.previousPage()}
                size="icon-sm"
                variant="outline"
              >
                <ChevronRightIcon />
              </Button>

              <span className="flex size-9 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground text-sm tabular-nums">
                {table.getState().pagination.pageIndex + 1}
              </span>

              <Button
                aria-label="الصفحة التالية"
                disabled={!table.getCanNextPage()}
                onClick={() => table.nextPage()}
                size="icon-sm"
                variant="outline"
              >
                <ChevronLeftIcon />
              </Button>
              <Button
                aria-label="الصفحة الأخيرة"
                className="hidden lg:inline-flex"
                disabled={!table.getCanNextPage()}
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                size="icon-sm"
                variant="outline"
              >
                <ChevronsLeftIcon />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
