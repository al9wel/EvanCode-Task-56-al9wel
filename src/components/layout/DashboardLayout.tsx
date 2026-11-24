import { Outlet } from "react-router-dom"

import DashboardNavBar from "@/components/layout/DashboardNavBar"
import DashboardSideBar from "@/components/layout/DashboardSideBar"

const DashboardLayout = () => {
  return (
    <div>
      <DashboardSideBar />
      <div>
        <DashboardNavBar />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
