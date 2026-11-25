import { Loader2Icon } from "lucide-react"

import { Skeleton } from "@/components/ui/skeleton"

const OrdersLoading = () => {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center gap-2.5 font-medium text-md md:text-lg text-muted-foreground">
        <Loader2Icon className="size-4 md:size-5 animate-spin text-foreground" />
        <span>جاري تحميل قائمة الطلبات...</span>
      </div>

      <Skeleton className="h-18 w-full rounded-2xl" />

      <div className="flex flex-col gap-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton className="h-16 w-full rounded-xl" key={index} />
        ))}
      </div>
    </div>
  )
}

export default OrdersLoading
