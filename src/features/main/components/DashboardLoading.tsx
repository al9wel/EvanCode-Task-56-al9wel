import { Loader2Icon } from "lucide-react"

import { Skeleton } from "@/components/ui/skeleton"

const DashboardLoading = () => {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="grid grid-cols-1 items-stretch gap-4 xl:grid-cols-[2.45fr_1.55fr]">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2.5 font-medium text-md text-muted-foreground">
            <Loader2Icon className="size-4 animate-spin text-foreground" />
            <span>جاري تحميل إحصائيات لوحة التحكم...</span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton className="h-32 rounded-xl" key={index} />
            ))}
          </div>
          <Skeleton className="min-h-104 flex-1 rounded-xl" />
        </div>

        <div className="flex flex-col gap-4">
          <Skeleton className="h-64 rounded-xl" />
          <Skeleton className="min-h-84 flex-1 rounded-xl" />
        </div>
      </div>
    </div>
  )
}

export default DashboardLoading
