import { BarChart3Icon, PieChartIcon, TrendingUpIcon } from "lucide-react"

import { BlurFade } from "@/components/ui/blur-fade"
import OrdersComparisonAreaChart from "@/features/main/charts/OrdersComparisonAreaChart"
import OrdersStatusPieChart from "@/features/main/charts/OrdersStatusPieChart"
import WeeklyOrdersBarChart from "@/features/main/charts/WeeklyOrdersBarChart"
import { ActiveCouriersCard } from "@/features/main/components/ActiveCouriersCard"
import ChartPanel from "@/features/main/components/ChartPanel"
import { DashboardStats } from "@/features/main/components/DashboardStats"
import { DeliveryActivityCard } from "@/features/main/components/DeliveryActivityCard"
import { RecentOrdersCard } from "@/features/main/components/RecentOrdersCard"

const MainPage = () => {
  return (
    <div className="flex w-full flex-col gap-4">
      <BlurFade blur="4px" delay={0.05} duration={0.6} offset={8}>
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <DashboardStats />
        </section>
      </BlurFade>

      <BlurFade blur="4px" delay={0.18} duration={0.65} offset={8}>
        <section className="grid grid-cols-1 gap-4 xl:grid-cols-[1.35fr_0.95fr]">
          <ChartPanel
            description="مقارنة الطلبات المكتملة والطلبات التي في الطريق خلال آخر 7 أيام"
            footer="متوسط الإنجاز اليومي: 31 طلباً مكتملاً"
            icon={TrendingUpIcon}
            sectionLabel="الأداء اليومي"
            title="حركة توصيل الطلبات"
          >
            <OrdersComparisonAreaChart />
          </ChartPanel>

          <ChartPanel
            description="توزيع الطلبات المسجلة حسب حالتها الحالية"
            footer="إجمالي الطلبات المسجلة هذا الأسبوع: 148 طلباً"
            icon={PieChartIcon}
            sectionLabel="الحالات"
            title="توزيع حالات الطلبات"
          >
            <OrdersStatusPieChart />
          </ChartPanel>
        </section>
      </BlurFade>

      <BlurFade blur="4px" delay={0.3} duration={0.65} offset={8}>
        <section className="grid grid-cols-1 gap-4 xl:grid-cols-[0.95fr_1.35fr]">
          <ChartPanel
            description="إجمالي الطلبات اليومية وتفصيل حالتها على مدار الأسبوع"
            footer="أعلى ذروة طلبات مسجلة: يوم الخميس (59 طلباً)"
            icon={BarChart3Icon}
            sectionLabel="أيام الأسبوع"
            title="إجمالي الطلبات الأسبوعية"
          >
            <WeeklyOrdersBarChart />
          </ChartPanel>

          <RecentOrdersCard className="md:col-span-1" />
        </section>
      </BlurFade>

      <BlurFade blur="4px" delay={0.42} duration={0.65} offset={8}>
        <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <ActiveCouriersCard />
          <DeliveryActivityCard />
        </section>
      </BlurFade>
    </div>
  )
}

export default MainPage
