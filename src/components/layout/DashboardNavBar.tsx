import {
  ClipboardListIcon,
  HomeIcon,
  LayoutGridIcon,
  MoonIcon,
  PackageCheckIcon,
  SunIcon,
  UserIcon,
} from "lucide-react"
import { Link, useLocation } from "react-router-dom"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ROUTES } from "@/constants/routes"
import { useTheme } from "@/hooks/useTheme"

const pageMeta: Record<string, { title: string; icon: typeof LayoutGridIcon }> = {
  [ROUTES.DASHBOARD.MAIN]: {
    title: "الرئيسية",
    icon: LayoutGridIcon,
  },
  [ROUTES.DASHBOARD.ORDERS]: {
    title: "الطلبات",
    icon: ClipboardListIcon,
  },
}

const DashboardNavBar = () => {
  const { pathname } = useLocation()
  const { theme, toggleTheme } = useTheme()
  const current = pageMeta[pathname] ?? pageMeta[ROUTES.DASHBOARD.MAIN]
  const ActiveIcon = current.icon

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between gap-3 bg-sidebar px-4 text-sidebar-foreground md:px-6">
      <div className="flex items-center gap-3">
        <Tooltip delayDuration={700}>
          <TooltipTrigger asChild>
            <SidebarTrigger className="size-9 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground [&_svg]:size-5" />
          </TooltipTrigger>
          <TooltipContent className="px-2.5 py-1.5 text-xs" side="bottom">
            إظهار / إخفاء القائمة{" "}
            <KbdGroup>
              <Kbd>Ctrl</Kbd>
              <Kbd>B</Kbd>
            </KbdGroup>
          </TooltipContent>
        </Tooltip>

        <Separator
          className="me-1 h-5 bg-sidebar-border data-[orientation=vertical]:self-center"
          orientation="vertical"
        />

        <Breadcrumb>
          <BreadcrumbList className="text-sm sm:gap-2.5">
            <BreadcrumbItem className="hidden sm:inline-flex">
              <span className="font-medium text-muted-foreground text-sm">
                نظام وصّل
              </span>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden sm:inline-flex" />
            <BreadcrumbItem>
              <BreadcrumbPage className="flex items-center gap-2 font-bold text-base text-sidebar-foreground [&>svg]:size-4.5">
                <ActiveIcon />
                {current.title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center gap-2.5">
        <Button
          asChild
          aria-label="صفحة الطلبات"
          className="border-sidebar-border bg-card/80 hover:bg-card"
          size="icon-sm"
          variant="outline"
        >
          <Link to={ROUTES.DASHBOARD.ORDERS}>
            <PackageCheckIcon />
          </Link>
        </Button>

        <Button
          aria-label={
            theme === "light" ? "تفعيل الوضع الداكن" : "تفعيل الوضع الفاتح"
          }
          className="border-sidebar-border bg-card/80 hover:bg-card"
          onClick={toggleTheme}
          size="icon-sm"
          variant="outline"
        >
          {theme === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>

        <Separator
          className="h-5 bg-sidebar-border data-[orientation=vertical]:self-center"
          orientation="vertical"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              aria-label="حساب الموظف"
              className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
              type="button"
            >
              <Avatar className="size-9 cursor-pointer">
                <AvatarFallback className="bg-brand-lime font-bold text-brand-lime-foreground text-sm">
                  وص
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="pointer-events-none flex items-center gap-3 py-2">
                <Avatar className="size-9">
                  <AvatarFallback className="bg-brand-lime font-bold text-brand-lime-foreground text-sm">
                    وص
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold text-foreground text-sm">
                    موظف المتابعة
                  </p>
                  <p className="truncate text-muted-foreground text-xs">
                    شركة وصّل — صنعاء
                  </p>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild className="py-2 text-sm">
                <Link to={ROUTES.DASHBOARD.MAIN}>
                  <UserIcon />
                  لوحة المتابعة
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="py-2 text-sm">
                <Link to={ROUTES.DASHBOARD.ORDERS}>
                  <ClipboardListIcon />
                  قائمة الطلبات
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild className="py-2 text-sm">
                <Link to={ROUTES.PUBLIC.HOME}>
                  <HomeIcon />
                  الصفحة التعريفية
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

export default DashboardNavBar
