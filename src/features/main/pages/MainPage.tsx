import { BarChart3Icon, PieChartIcon, TrendingUpIcon } from "lucide-react"

import ErrorState from "@/app/pages/ErrorState"
import { BlurFade } from "@/components/ui/blur-fade"
import OrdersComparisonAreaChart from "@/features/main/charts/OrdersComparisonAreaChart"
import OrdersStatusPieChart from "@/features/main/charts/OrdersStatusPieChart"
import WeeklyOrdersBarChart from "@/features/main/charts/WeeklyOrdersBarChart"
import { ActiveCouriersCard } from "@/features/main/components/ActiveCouriersCard"
import ChartPanel from "@/features/main/components/ChartPanel"
import DashboardLoading from "@/features/main/components/DashboardLoading"
import { DashboardStats } from "@/features/main/components/DashboardStats"
import { DeliveryActivityCard } from "@/features/main/components/DeliveryActivityCard"
import { RecentOrdersCard } from "@/features/main/components/RecentOrdersCard"
import { useDashboardStatistics } from "@/features/main/hooks/useDashboardStatistics"

const MainPage = () => {
  const { data, isPending, isError, error, refetch } =
    useDashboardStatistics()

  if (isPending) {
    return <DashboardLoading />
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
    return <DashboardLoading />
  }

  const dashboard = data.data

  return (
    <div className="flex w-full flex-col gap-4">

      {/* Top 2.45 : 1.55 Asymmetric Grid */}
      <section className="grid grid-cols-1 items-stretch gap-4 xl:grid-cols-[2.45fr_1.55fr]">
        {/* Main Column (~2.5): 3 KPI Cards on top + Delivery Movement Chart below */}
        <BlurFade
          blur="4px"
          className="flex flex-col gap-4"
          delay={0.05}
          duration={0.55}
          offset={8}
        >
          <div className="flex items-center gap-2.5 font-medium text-md text-muted-foreground">
            <span>مرحبا بك في وصّل</span>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <DashboardStats stats={dashboard.stats.slice(0, 3)} />
          </div>

          <ChartPanel
            className="flex-1"
            description="مقارنة الطلبات المكتملة والطلبات التي في الطريق خلال آخر 7 أيام"
            footer="متوسط الإنجاز اليومي: 31 طلباً مكتملاً"
            icon={TrendingUpIcon}
            sectionLabel="الأداء اليومي"
            title="حركة توصيل الطلبات"
          >
            <OrdersComparisonAreaChart data={dashboard.dailyComparison} />
          </ChartPanel>
        </BlurFade>

        {/* Side Column (~1.5): Animated Recent Orders on top + Status Distribution below */}
        <BlurFade
          blur="4px"
          className="flex flex-col gap-4"
          delay={0.14}
          duration={0.55}
          offset={8}
        >
          <RecentOrdersCard orders={dashboard.recentOrders} />

          <ChartPanel
            className="flex-1"
            compact
            footer={`إجمالي الطلبات المسجلة: ${dashboard.statusDistribution.reduce((s, i) => s + i.value, 0)} طلباً`}
            icon={PieChartIcon}
            sectionLabel="الحالات"
            title="توزيع حالات الطلبات"
          >
            <OrdersStatusPieChart data={dashboard.statusDistribution} />
          </ChartPanel>
        </BlurFade>
      </section>

      {/* Bottom Supporting Row: Weekly Chart + Field Activity Table + Couriers */}
      <BlurFade blur="4px" delay={0.25} duration={0.6} offset={8}>
        <section className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_1.35fr_0.9fr]">
          <ChartPanel
            description="إجمالي الطلبات اليومية وتفصيل حالتها على مدار الأسبوع"
            footer="أعلى ذروة طلبات مسجلة: يوم الخميس (59 طلباً)"
            icon={BarChart3Icon}
            sectionLabel="أيام الأسبوع"
            title="إجمالي الطلبات الأسبوعية"
          >
            <WeeklyOrdersBarChart data={dashboard.weeklyOrders} />
          </ChartPanel>

          <DeliveryActivityCard activities={dashboard.activities} />

          <ActiveCouriersCard couriers={dashboard.couriers} />
        </section>
      </BlurFade>
    </div>
  )
}

export default MainPage
