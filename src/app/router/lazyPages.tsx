import { lazy } from "react"
import { Loader2Icon } from "lucide-react"

export const LandingPage = lazy(
  () => import("@/features/landing/pages/LandingPage")
)
export const MainPage = lazy(() => import("@/features/main/pages/MainPage"))
export const OrdersPage = lazy(
  () => import("@/features/orders/pages/OrdersPage")
)

export const RouteFallback = ({
  fullScreen = false,
}: {
  fullScreen?: boolean
}) => (
  <div
    className={
      fullScreen
        ? "flex min-h-screen items-center justify-center bg-background p-6"
        : "flex w-full flex-col gap-4"
    }
  >
    <div className="flex items-center gap-2.5 font-medium text-md md:text-lg text-muted-foreground">
      <Loader2Icon className="size-4 md:size-5 animate-spin text-foreground" />
      <span>جاري تحضير الصفحة...</span>
    </div>
  </div>
)
