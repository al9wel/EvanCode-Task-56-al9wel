import type { ComponentProps } from "react"
import {
  ArrowLeftIcon,
  CheckCircle2Icon,
  PackagePlusIcon,
  TruckIcon,
  WalletIcon,
} from "lucide-react"
import { Link } from "react-router-dom"

import { AnimatedList } from "@/components/ui/animated-list"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ROUTES } from "@/constants/routes"
import { cn } from "@/lib/utils"

const activityItems = [
  {
    id: "act-1",
    title: "تسجيل طلب توصيل جديد #1024 باسم أحمد المتوكل",
    time: "منذ 5 دقائق",
    icon: PackagePlusIcon,
  },
  {
    id: "act-2",
    title: "انطلاق المندوب بالطلب #1023 نحو شارع الزبيري",
    time: "منذ 18 دقيقة",
    icon: TruckIcon,
  },
  {
    id: "act-3",
    title: "تم توصيل الطلب #1022 بنجاح في حي حدة",
    time: "منذ 42 دقيقة",
    icon: CheckCircle2Icon,
  },
  {
    id: "act-4",
    title: "تحصيل مبلغ الطلب #1021 عند التسليم",
    time: "منذ ساعتين",
    icon: WalletIcon,
  },
] as const

export function DeliveryActivityCard({
  className,
  ...props
}: ComponentProps<typeof Card>) {
  return (
    <Card className={cn("gap-0 shadow-none dark:ring-0", className)} {...props}>
      <CardHeader className="border-b">
        <CardTitle>سجل النشاط الميداني</CardTitle>
        <CardDescription>آخر التحديثات الفورية لحركة الطلبات.</CardDescription>
      </CardHeader>

      <CardContent className="min-h-72 px-0 py-1">
        <AnimatedList className="gap-0 divide-y divide-border" delay={850}>
          {activityItems.map((item) => {
            const Icon = item.icon
            return (
              <div
                className="flex h-17 w-full items-center gap-3 px-3"
                key={item.id}
              >
                <span
                  aria-hidden="true"
                  className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground [&_svg]:size-4"
                >
                  <Icon />
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <p className="line-clamp-2 font-medium text-pretty text-foreground text-sm leading-snug">
                    {item.title}
                  </p>
                  <p className="text-muted-foreground text-xs tabular-nums">
                    {item.time}
                  </p>
                </div>
              </div>
            )
          })}
        </AnimatedList>
      </CardContent>

      <div className="mt-auto flex items-center justify-center border-t py-2.5">
        <Button asChild size="sm" variant="ghost">
          <Link to={ROUTES.DASHBOARD.ORDERS}>
            استعراض كل الطلبات
            <ArrowLeftIcon aria-hidden="true" data-icon="inline-end" />
          </Link>
        </Button>
      </div>
    </Card>
  )
}
