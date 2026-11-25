import { zodResolver } from "@hookform/resolvers/zod"
import { CheckIcon, Loader2Icon } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Order, OrderFormValues } from "@/types/Order"

const orderSchema = z.object({
  customerName: z.string().min(3, "اسم الزبون يجب أن يكون 3 أحرف على الأقل"),
  phone: z
    .string()
    .regex(/^7\d{8}$/, "رقم الجوال يجب أن يبدأ بـ 7 ويتكون من 9 أرقام"),
  address: z.string().min(4, "يرجى إدخال عنوان التوصيل"),
  itemsSummary: z.string().min(2, "يرجى كتابة منتجات الطلب"),
  amount: z
    .number({ message: "يرجى إدخال مبلغ صحيح" })
    .min(500, "المبلغ يجب أن يكون 500 ر.ي على الأقل"),
  createdAt: z.string().min(1, "يرجى تحديد تاريخ الطلب"),
  status: z.enum(["جديد", "في الطريق", "تم التوصيل"]),
})

interface OrderFormProps {
  initialData?: Order | null
  onSubmit: (values: OrderFormValues) => void
  onCancel: () => void
  isLoading?: boolean
}

export const OrderForm = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: OrderFormProps) => {
  const defaultDate = initialData?.createdAt
    ? initialData.createdAt.slice(0, 10)
    : "2026-11-25"

  const defaultItemsSummary = initialData?.items
    ? initialData.items.map((i) => `${i.name} ×${i.quantity}`).join("، ")
    : ""

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      customerName: initialData?.customerName ?? "",
      phone: initialData?.phone ?? "",
      address: initialData?.address ?? "",
      itemsSummary: defaultItemsSummary,
      amount: initialData?.amount ?? 5000,
      createdAt: defaultDate,
      status: initialData?.status ?? "جديد",
    },
  })

  return (
    <form
      className="flex flex-col gap-4 pt-2"
      dir="rtl"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="customerName">اسم الزبون *</Label>
        <Input
          aria-invalid={!!errors.customerName}
          className="h-10"
          id="customerName"
          placeholder="مثال: أحمد عبدالكريم المتوكل"
          {...register("customerName")}
        />
        {errors.customerName && (
          <p className="text-destructive text-xs">
            {errors.customerName.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="phone">رقم الجوال *</Label>
          <Input
            aria-invalid={!!errors.phone}
            className="h-10 text-end font-mono"
            dir="ltr"
            id="phone"
            placeholder="777000000"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-destructive text-xs">{errors.phone.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="amount">المبلغ (ر.ي) *</Label>
          <Input
            aria-invalid={!!errors.amount}
            className="h-10 font-mono"
            id="amount"
            min={500}
            step={100}
            type="number"
            {...register("amount", { valueAsNumber: true })}
          />
          {errors.amount && (
            <p className="text-destructive text-xs">{errors.amount.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="itemsSummary">منتجات الطلب *</Label>
        <Input
          aria-invalid={!!errors.itemsSummary}
          className="h-10"
          id="itemsSummary"
          placeholder="مثال: سماعة بلوتوث ×1، شاحن سريع ×1"
          {...register("itemsSummary")}
        />
        {errors.itemsSummary && (
          <p className="text-destructive text-xs">
            {errors.itemsSummary.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="address">عنوان التوصيل *</Label>
        <Input
          aria-invalid={!!errors.address}
          className="h-10"
          id="address"
          placeholder="صنعاء — الحي والشارع"
          {...register("address")}
        />
        {errors.address && (
          <p className="text-destructive text-xs">{errors.address.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="createdAt">تاريخ الطلب *</Label>
          <Input
            aria-invalid={!!errors.createdAt}
            className="h-10"
            id="createdAt"
            type="date"
            {...register("createdAt")}
          />
          {errors.createdAt && (
            <p className="text-destructive text-xs">
              {errors.createdAt.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label>حالة الطلب *</Label>
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="اختر الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="جديد">جديد</SelectItem>
                    <SelectItem value="في الطريق">في الطريق</SelectItem>
                    <SelectItem value="تم التوصيل">تم التوصيل</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <div className="mt-2 flex items-center gap-2.5 border-t pt-4">
        <Button className="flex-1" disabled={isLoading} type="submit">
          {isLoading ? (
            <Loader2Icon className="animate-spin" data-icon="inline-start" />
          ) : (
            <CheckIcon data-icon="inline-start" />
          )}
          {isLoading
            ? "جاري المعالجة..."
            : initialData
              ? "حفظ التعديلات"
              : "إضافة الطلب"}
        </Button>
        <Button
          disabled={isLoading}
          onClick={onCancel}
          type="button"
          variant="outline"
        >
          إلغاء
        </Button>
      </div>
    </form>
  )
}
