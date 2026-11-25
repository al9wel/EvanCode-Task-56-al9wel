import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Delta, DeltaIcon, DeltaValue } from "@/components/ui/delta"
import { cn } from "@/lib/utils"
import type { DashboardStatItem } from "@/types/Dashboard"

interface DashboardStatsProps {
  stats: DashboardStatItem[]
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <>
      {stats.map((s) => (
        <Card className={cn("shadow-none dark:ring-0")} key={s.label}>
          <CardHeader>
            <CardTitle className="font-medium text-muted-foreground text-sm">
              {s.label}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2.5">
            <p className="font-bold text-3xl tabular-nums">{s.value}</p>
            <div className="flex items-center gap-1.5 text-sm">
              <Delta value={s.delta}>
                <DeltaIcon />
                <DeltaValue />
              </Delta>
              <span className="text-muted-foreground">{s.footnote}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
