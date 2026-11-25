import { Outlet, useLocation } from "react-router-dom"

import DashboardNavBar from "@/components/layout/DashboardNavBar"
import DashboardSideBar from "@/components/layout/DashboardSideBar"
import { BlurFade } from "@/components/ui/blur-fade"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

const DashboardLayout = () => {
  const { pathname } = useLocation()

  return (
    <div className="overflow-hidden bg-sidebar">
      <SidebarProvider className="relative h-svh bg-sidebar">
        <DashboardSideBar />
        <SidebarInset className="bg-sidebar md:peer-data-[variant=inset]:m-0 md:peer-data-[variant=inset]:rounded-none md:peer-data-[variant=inset]:shadow-none md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ms-0">
          <DashboardNavBar />
          <div className="mx-2.5 mb-2.5 flex flex-1 flex-col overflow-hidden rounded-2xl border border-sidebar-border/90 bg-background shadow-xs md:ms-0 md:me-2.5">
            <div className="flex flex-1 flex-col gap-4 overflow-y-auto scroll-smooth p-4 md:p-6">
              <BlurFade blur="5px" duration={0.55} key={pathname} offset={8}>
                <Outlet />
              </BlurFade>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}

export default DashboardLayout
