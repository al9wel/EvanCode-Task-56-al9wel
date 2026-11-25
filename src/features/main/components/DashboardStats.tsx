import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Delta, DeltaIcon, DeltaValue } from "@/components/ui/delta"
import { cn } from "@/lib/utils"

type Stat = {
  label: string
  value: string
  delta: number
  footnote: string
}

const stats: readonly Stat[] = [
  {
    label: "الطلبات الجديدة اليوم",
    value: "42",
    delta: 12.4,
    footnote: "مقارنة بالأمس",
  },
  {
    label: "طلبات في الطريق",
    value: "18",
    delta: 5.2,
    footnote: "مقارنة بالأسبوع الماضي",
  },
  {
    label: "متوسط زمن التوصيل",
    value: "28 د",
    delta: -8.0,
    footnote: "أسرع من الأسبوع الماضي",
  },
  {
    label: "نسبة التوصيل المكتمل",
    value: "94%",
    delta: 2.1,
    footnote: "خلال آخر 30 يوماً",
  },
]

export function DashboardStats() {
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
