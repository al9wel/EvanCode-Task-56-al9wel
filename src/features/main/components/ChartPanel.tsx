import type { LucideIcon } from "lucide-react"
import type { ReactNode } from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

type ChartPanelProps = {
  title: string
  description?: string
  sectionLabel: string
  icon: LucideIcon
  children: ReactNode
  footer?: ReactNode
  compact?: boolean
  className?: string
}

const ChartPanel = ({
  title,
  description,
  sectionLabel,
  icon: Icon,
  children,
  footer,
  compact = false,
  className,
}: ChartPanelProps) => {
  if (compact) {
    return (
      <Card className={cn("gap-0 py-0 shadow-none dark:ring-0", className)}>
        <div className="flex items-center justify-between gap-2 border-b px-4 py-2.5">
          <h3 className="font-bold text-foreground text-sm">{title}</h3>
          <div className="flex shrink-0 items-center gap-1 rounded bg-muted px-2 py-0.5 font-medium text-[11px] text-muted-foreground">
            <Icon className="size-3.5" />
            <span>{sectionLabel}</span>
          </div>
        </div>
        <CardContent className="p-3">
          {children}
          {footer ? (
            <div className="mt-2 border-t pt-2 text-center text-muted-foreground text-xs">
              {footer}
            </div>
          ) : null}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn("shadow-none dark:ring-0", className)}>
      <CardHeader className="border-b">
        <div className="flex items-center justify-between gap-3">
          <div>
            <CardTitle className="font-bold text-foreground text-lg">
              {title}
            </CardTitle>
            {description && (
              <CardDescription className="mt-1">{description}</CardDescription>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-1.5 rounded-md bg-muted px-3 py-1.5 font-medium text-muted-foreground text-xs">
            <Icon className="size-4" />
            <span>{sectionLabel}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        {children}
        {footer ? (
          <div className="mt-3 border-t pt-3 text-center text-muted-foreground text-xs">
            {footer}
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}

export default ChartPanel
