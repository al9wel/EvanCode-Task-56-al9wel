import { PlusIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { OrderForm } from "@/features/orders/components/OrderForm"
import { useCreateOrder } from "@/features/orders/hooks/useCreateOrder"
import type { OrderFormValues } from "@/types/Order"

export const CreateOrderDialog = () => {
  const [open, setOpen] = useState(false)
  const { mutate: createOrder, isPending } = useCreateOrder()

  const handleCreate = (values: OrderFormValues) => {
    createOrder(values, {
      onSuccess: (res) => {
        toast.info(res.message)
        setOpen(false)
      },
      onError: (err) => {
        toast.error(
          err instanceof Error ? err.message : "حدث خطأ أثناء إضافة الطلب"
        )
      },
    })
  }

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto">
          <PlusIcon data-icon="inline-start" />
          إضافة طلب جديد
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg" dir="rtl">
        <DialogHeader className="text-start">
          <DialogTitle className="font-bold text-lg">
            إضافة طلب توصيل جديد
          </DialogTitle>
          <DialogDescription>
            أدخل بيانات الزبون وتفاصيل الطلب لإضافته إلى قائمة المتابعة.
          </DialogDescription>
        </DialogHeader>
        <OrderForm
          isLoading={isPending}
          onCancel={() => setOpen(false)}
          onSubmit={handleCreate}
        />
      </DialogContent>
    </Dialog>
  )
}
