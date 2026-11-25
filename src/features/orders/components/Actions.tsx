import {
  AlertTriangleIcon,
  EyeIcon,
  Loader2Icon,
  PencilIcon,
  Trash2Icon,
} from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { OrderForm } from "@/features/orders/components/OrderForm"
import { useDeleteOrder } from "@/features/orders/hooks/useDeleteOrder"
import { useUpdateOrder } from "@/features/orders/hooks/useUpdateOrder"
import {
  formatCurrency,
  formatDate,
  getOrderStatusBadgeClass,
} from "@/lib/formater"
import type { Order, OrderFormValues } from "@/types/Order"

interface ActionsProps {
  order: Order
}

export const Actions = ({ order }: ActionsProps) => {
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const { mutate: updateOrder, isPending: isUpdating } = useUpdateOrder()
  const { mutate: deleteOrder, isPending: isDeleting } = useDeleteOrder()

  const handleUpdate = (values: OrderFormValues) => {
    updateOrder(
      { id: order.id, data: values },
      {
        onSuccess: (res) => {
          toast.info(res.message)
          setIsEditOpen(false)
        },
        onError: (err) => {
          toast.error(
            err instanceof Error ? err.message : "حدث خطأ أثناء تعديل الطلب"
          )
        },
      }
    )
  }

  const handleDelete = () => {
    deleteOrder(order.id, {
      onSuccess: (res) => {
        toast.info(res.message)
        setIsDeleteOpen(false)
      },
      onError: (err) => {
        toast.error(
          err instanceof Error ? err.message : "حدث خطأ أثناء حذف الطلب"
        )
      },
    })
  }

  return (
    <div className="flex items-center justify-center gap-1">
      {/* View Details Dialog */}
      <Button
        aria-label={`عرض تفاصيل الطلب ${order.orderNumber}`}
        onClick={() => setIsViewOpen(true)}
        size="icon-sm"
        variant="ghost"
      >
        <EyeIcon className="size-4 text-muted-foreground" />
      </Button>

      <Dialog onOpenChange={setIsViewOpen} open={isViewOpen}>
        <DialogContent className="sm:max-w-md" dir="rtl">
          <DialogHeader className="text-start">
            <DialogTitle className="flex items-center gap-2 font-bold text-lg">
              <span>تفاصيل الطلب</span>
              <span className="font-mono text-sm">{order.orderNumber}</span>
            </DialogTitle>
            <DialogDescription>ملخص بيانات طلب الزبون وحالته.</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col divide-y divide-border rounded-xl border bg-muted/20 px-4 text-sm">
            <div className="flex items-center justify-between py-3">
              <span className="text-muted-foreground">اسم الزبون</span>
              <span className="font-semibold">{order.customerName}</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-muted-foreground">رقم الجوال</span>
              <span className="font-mono" dir="ltr">
                {order.phone}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 py-3">
              <span className="shrink-0 text-muted-foreground">العنوان</span>
              <span className="text-end font-medium">{order.address}</span>
            </div>
            <div className="flex flex-col gap-2 py-3">
              <span className="text-muted-foreground">المنتجات</span>
              <div className="flex flex-wrap gap-1.5">
                {order.items.map((item) => (
                  <Badge key={item.name} variant="outline">
                    {item.name} ×{item.quantity}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-muted-foreground">المبلغ</span>
              <span className="font-bold tabular-nums">
                {formatCurrency(order.amount)}
              </span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-muted-foreground">تاريخ الطلب</span>
              <span>{formatDate(order.createdAt.slice(0, 10), "full")}</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-muted-foreground">الحالة</span>
              <Badge
                className={getOrderStatusBadgeClass(order.status)}
                variant="secondary"
              >
                {order.status}
              </Badge>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Button
        aria-label={`تعديل الطلب ${order.orderNumber}`}
        onClick={() => setIsEditOpen(true)}
        size="icon-sm"
        variant="ghost"
      >
        <PencilIcon className="size-4 text-foreground/80" />
      </Button>

      <Dialog onOpenChange={setIsEditOpen} open={isEditOpen}>
        <DialogContent className="sm:max-w-lg" dir="rtl">
          <DialogHeader className="text-start">
            <DialogTitle className="font-bold text-lg">
              تعديل بيانات الطلب {order.orderNumber}
            </DialogTitle>
            <DialogDescription>
              قم بتحديث بيانات الطلب أو تغيير حالته ثم اضغط حفظ.
            </DialogDescription>
          </DialogHeader>
          <OrderForm
            initialData={order}
            isLoading={isUpdating}
            onCancel={() => setIsEditOpen(false)}
            onSubmit={handleUpdate}
          />
        </DialogContent>
      </Dialog>

      {/* Delete AlertDialog */}
      <AlertDialog onOpenChange={setIsDeleteOpen} open={isDeleteOpen}>
        <AlertDialogTrigger asChild>
          <Button
            aria-label={`حذف الطلب ${order.orderNumber}`}
            size="icon-sm"
            variant="ghost"
          >
            <Trash2Icon className="size-4 text-destructive" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent dir="rtl" size="sm">
          <AlertDialogHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <AlertTriangleIcon className="size-5" />
              </div>
              <AlertDialogTitle className="font-bold text-start">
                حذف الطلب {order.orderNumber}
              </AlertDialogTitle>
            </div>
            <AlertDialogDescription className="pt-2 text-start">
              هل أنت متأكد من حذف طلب الزبون{" "}
              <span className="font-bold text-foreground">
                {order.customerName}
              </span>
              ؟
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-start">
            <AlertDialogAction
              disabled={isDeleting}
              onClick={(e) => {
                e.preventDefault()
                handleDelete()
              }}
              variant="destructive"
            >
              {isDeleting ? (
                <>
                  <Loader2Icon
                    className="animate-spin"
                    data-icon="inline-start"
                  />
                  جاري الحذف...
                </>
              ) : (
                "تأكيد الحذف"
              )}
            </AlertDialogAction>
            <AlertDialogCancel disabled={isDeleting}>إلغاء</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
