import * as React from "react"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MinusIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type DeltaIconVariant = "default" | "trend" | "arrow" | "triangle"
type DeltaVariant = "default" | "badge"

type DeltaContextValue = {
  value: number
}

const DeltaContext = React.createContext<DeltaContextValue | null>(null)

function useDeltaValue() {
  const context = React.useContext(DeltaContext)
  if (!context) {
    throw new Error(
      "DeltaIcon and DeltaValue must be used inside a `Delta` component."
    )
  }
  return context.value
}

function Delta({
  className,
  value,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & {
  value: number
  variant?: DeltaVariant
}) {
  return (
    <DeltaContext.Provider value={{ value }}>
      {variant === "badge" ? (
        <Badge
          className={cn(
            "gap-1 border-none tabular-nums [&_svg]:size-4 [&_svg]:shrink-0",
            value > 0
              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              : "bg-red-500/10 text-red-600 dark:text-red-400",
            className
          )}
          data-slot="delta"
          variant="secondary"
          {...(props as React.ComponentProps<typeof Badge>)}
        />
      ) : (
        <div
          className={cn(
            "inline-flex items-center gap-1 text-muted-foreground tabular-nums",
            "[&_svg]:size-3 [&_svg]:shrink-0",
            value > 0 ? "text-emerald-600 dark:text-emerald-400" : "",
            value < 0 ? "text-rose-600 dark:text-rose-400" : "",
            className
          )}
          data-slot="delta"
          {...props}
        />
      )}
    </DeltaContext.Provider>
  )
}

function DeltaIcon({
  variant = "default",
  className,
  ...props
}: Omit<React.ComponentProps<"svg">, "fill"> & {
  variant?: DeltaIconVariant
}) {
  const resolvedValue = useDeltaValue()
  const mergedClassName = cn(className)

  if (!resolvedValue || resolvedValue === 0) {
    return (
      <MinusIcon
        data-slot="delta-icon"
        className={mergedClassName}
        {...props}
      />
    )
  }

  if (resolvedValue > 0) {
    if (variant === "trend") {
      return (
        <TrendingUpIcon
          data-slot="delta-icon"
          className={mergedClassName}
          {...props}
        />
      )
    }
    if (variant === "arrow") {
      return (
        <ArrowUpIcon
          data-slot="delta-icon"
          className={mergedClassName}
          {...props}
        />
      )
    }
    return (
      <ChevronUpIcon
        data-slot="delta-icon"
        className={mergedClassName}
        {...props}
      />
    )
  }

  if (variant === "trend") {
    return (
      <TrendingDownIcon
        data-slot="delta-icon"
        className={mergedClassName}
        {...props}
      />
    )
  }
  if (variant === "arrow") {
    return (
      <ArrowDownIcon
        data-slot="delta-icon"
        className={mergedClassName}
        {...props}
      />
    )
  }
  return (
    <ChevronDownIcon
      data-slot="delta-icon"
      className={mergedClassName}
      {...props}
    />
  )
}

function DeltaValue({
  className,
  precision = 1,
  suffix = "%",
  absolute = true,
  ...props
}: React.ComponentProps<"span"> & {
  precision?: number
  suffix?: string
  absolute?: boolean
}) {
  const resolvedValue = useDeltaValue()
  const formattedValue = (
    absolute ? Math.abs(resolvedValue) : resolvedValue
  ).toFixed(precision)

  return (
    <span
      className={cn("tabular-nums", className)}
      data-slot="delta-value"
      {...props}
    >
      {formattedValue}
      {suffix}
    </span>
  )
}

export { Delta, DeltaIcon, DeltaValue }
