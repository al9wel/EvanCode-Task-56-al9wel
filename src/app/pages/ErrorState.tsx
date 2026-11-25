import { AlertCircleIcon, RefreshCwIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

interface ErrorStateProps {
  message?: string
  onRetry?: () => void
}

const ErrorState = ({
  message = "حدث خطأ أثناء تحميل البيانات، يرجى المحاولة مرة أخرى.",
  onRetry,
}: ErrorStateProps) => {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center gap-4 rounded-2xl border border-dashed bg-card p-8 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertCircleIcon className="size-7" />
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="font-bold text-foreground text-lg">تعذّر جلب البيانات</h2>
        <p className="max-w-md text-muted-foreground text-sm">{message}</p>
      </div>
      {onRetry && (
        <Button className="mt-1 px-6" onClick={onRetry} variant="outline">
          <RefreshCwIcon data-icon="inline-start" />
          إعادة المحاولة
        </Button>
      )}
    </div>
  )
}

export default ErrorState
