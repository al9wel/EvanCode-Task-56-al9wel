import { useState } from "react"
import {
  ClipboardListIcon,
  HomeIcon,
  LayoutGridIcon,
  PackagePlusIcon,
  SearchIcon,
  TruckIcon,
  XIcon,
} from "lucide-react"
import { Link, useLocation } from "react-router-dom"

import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { ROUTES } from "@/constants/routes"
import { cn } from "@/lib/utils"

const navItems = [
  {
    title: "الرئيسية",
    path: ROUTES.DASHBOARD.MAIN,
    icon: LayoutGridIcon,
  },
  {
    title: "الطلبات",
    path: ROUTES.DASHBOARD.ORDERS,
    icon: ClipboardListIcon,
  },
] as const

const DashboardSideBar = () => {
  const { pathname } = useLocation()
  const [noticeOpen, setNoticeOpen] = useState(true)

  return (
    <Sidebar side="right" collapsible="icon" variant="inset">
      <SidebarHeader className="h-16 justify-center">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg" tooltip="وصّل للتوصيل">
              <Link to={ROUTES.PUBLIC.HOME}>
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-lime text-brand-lime-foreground shadow-xs">
                  <TruckIcon className="size-5" />
                </div>
                <div className="flex flex-col gap-0.5 leading-tight">
                  <span className="font-bold text-lg">وصّل</span>
                  <span className="text-muted-foreground text-xs">
                    متابعة طلبات التوصيل
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="gap-2 px-1">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem className="flex items-center gap-2">
              <SidebarMenuButton
                asChild
                className="min-w-9 bg-primary font-semibold text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
                tooltip="استعراض الطلبات"
              >
                <Link to={ROUTES.DASHBOARD.ORDERS}>
                  <PackagePlusIcon />
                  <span>متابعة الطلبات</span>
                </Link>
              </SidebarMenuButton>
              <Button
                asChild
                aria-label="البحث في الطلبات"
                className="size-11 shrink-0 group-data-[collapsible=icon]:hidden"
                size="icon"
                variant="outline"
              >
                <Link to={ROUTES.DASHBOARD.ORDERS}>
                  <SearchIcon />
                  <span className="sr-only">البحث في الطلبات</span>
                </Link>
              </Button>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="mb-1 text-xs font-semibold">
            لوحة المتابعة
          </SidebarGroupLabel>
          <SidebarMenu className="gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.path
              return (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    className="font-semibold"
                    isActive={isActive}
                    tooltip={item.title}
                  >
                    <Link to={item.path}>
                      <Icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="gap-2">
        {noticeOpen && (
          <div
            className={cn(
              "group/latest-change relative flex size-full flex-col justify-center gap-1.5 overflow-hidden rounded-xl border bg-card p-4",
              "transition-opacity group-data-[collapsible=icon]:pointer-events-none group-data-[collapsible=icon]:opacity-0"
            )}
          >
            <span className="inline-flex w-fit rounded bg-brand-lime px-2 py-0.5 font-bold text-brand-lime-foreground text-xs">
              جديد
            </span>
            <p className="font-bold text-sm">وداعاً لملفات الإكسل</p>
            <span className="text-muted-foreground text-xs leading-relaxed">
              ابحث ورتّب طلبات الزبائن فوراً.
            </span>
            <Button
              asChild
              className="h-auto w-max px-0 pt-1 text-xs font-semibold"
              size="sm"
              variant="link"
            >
              <Link to={ROUTES.DASHBOARD.ORDERS}>فتح صفحة الطلبات</Link>
            </Button>
            <Button
              aria-label="إغلاق التنبيه"
              className="absolute start-2 top-2 z-10 size-7 rounded-full opacity-0 transition-opacity group-hover/latest-change:opacity-100"
              onClick={() => setNoticeOpen(false)}
              size="icon-xs"
              variant="ghost"
            >
              <XIcon className="text-muted-foreground" />
            </Button>
          </div>
        )}

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="text-muted-foreground"
              size="sm"
              tooltip="الصفحة التعريفية"
            >
              <Link to={ROUTES.PUBLIC.HOME}>
                <HomeIcon />
                <span>الصفحة التعريفية</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

export default DashboardSideBar
