import { AlertTriangleIcon, ArrowRightIcon, CompassIcon } from "lucide-react"
import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { ROUTES } from "@/constants/routes"

interface AppErrorBoundaryProps {
  isNotFound?: boolean
}

const AppErrorBoundary = ({ isNotFound = false }: AppErrorBoundaryProps) => {
  const error = useRouteError()

  const is404 =
    isNotFound || (isRouteErrorResponse(error) && error.status === 404)

  let title = is404 ? "الصفحة غير موجودة" : "حدث خطأ غير متوقع"
  let message = is404
    ? "الرابط الذي تحاول الوصول إليه غير موجود أو تم نقله إلى مسار آخر."
    : "تعذّر عرض هذه الصفحة في الوقت الحالي، يرجى العودة والمحاولة مرة أخرى."

  if (!is404 && isRouteErrorResponse(error)) {
    if (error.status === 503) {
      title = "الخدمة غير متوفرة حالياً"
      message = "يرجى المحاولة بعد قليل."
    }
  } else if (!is404 && error instanceof Error && error.message) {
    message = error.message
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-background p-4"
      dir="rtl"
    >
      <div className="flex w-full max-w-md flex-col items-center justify-center gap-4 rounded-2xl border border-dashed bg-card p-8 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-muted text-foreground">
          {is404 ? (
            <CompassIcon className="size-7" />
          ) : (
            <AlertTriangleIcon className="size-7 text-destructive" />
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          {is404 && (
            <span className="font-bold font-mono text-muted-foreground text-xs tracking-wider">
              ERROR 404
            </span>
          )}
          <h1 className="font-bold text-foreground text-xl">{title}</h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {message}
          </p>
        </div>

        <div className="mt-2 flex flex-wrap items-center justify-center gap-2.5">
          <Button asChild>
            <Link to={ROUTES.DASHBOARD.MAIN}>
              <ArrowRightIcon data-icon="inline-start" />
              الذهاب للوحة التحكم
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to={ROUTES.PUBLIC.HOME}>الصفحة الرئيسية</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AppErrorBoundary
