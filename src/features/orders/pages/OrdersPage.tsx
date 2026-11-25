import { useQueryClient } from "@tanstack/react-query"
import { WifiOffIcon } from "lucide-react"

import ErrorState from "@/app/pages/ErrorState"
import { BlurFade } from "@/components/ui/blur-fade"
import { Button } from "@/components/ui/button"
import { columns } from "@/features/orders/components/columns"
import { DataTable } from "@/features/orders/components/data-table"
import OrdersLoading from "@/features/orders/components/OrdersLoading"
import { useOrders } from "@/features/orders/hooks/useOrders"
import { triggerSimulatedApiError } from "@/lib/fetchClient"

const OrdersPage = () => {
  const queryClient = useQueryClient()
  const { data, isPending, isError, error, refetch } = useOrders()

  if (isPending) {
    return <OrdersLoading />
  }

  if (isError) {
    return (
      <ErrorState
        message={error instanceof Error ? error.message : undefined}
        onRetry={() => void refetch()}
      />
    )
  }

  if (!data?.data) {
    return <OrdersLoading />
  }

  const handleSimulateError = () => {
    triggerSimulatedApiError()
    void queryClient.resetQueries({ queryKey: ["orders"] })
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <BlurFade blur="4px" delay={0.05} duration={0.6} offset={8}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="font-bold text-foreground text-xl sm:text-2xl">
              قائمة طلبات التوصيل
            </h1>
            <p className="text-muted-foreground text-sm">
              متابعة طلبات زبائن شركة «وصّل» في صنعاء، والبحث بالاسم، والترتيب
              حسب التاريخ أو المبلغ.
            </p>
          </div>

          <Button
            className="w-fit text-muted-foreground"
            onClick={handleSimulateError}
            size="sm"
            variant="outline"
          >
            <WifiOffIcon data-icon="inline-start" />
            اختبار حالة الخطأ
          </Button>
        </div>
      </BlurFade>

      <BlurFade blur="4px" delay={0.16} duration={0.65} offset={8}>
        <DataTable columns={columns} data={data.data} />
      </BlurFade>
    </div>
  )
}

export default OrdersPage
