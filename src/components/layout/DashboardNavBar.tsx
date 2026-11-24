import { NavLink } from "react-router-dom"

import { ROUTES } from "@/constants/routes"

const DashboardNavBar = () => {
  return (
    <header>
      <nav aria-label="شريط لوحة التحكم">
        <NavLink to={ROUTES.PUBLIC.HOME}>وصّل</NavLink>
      </nav>
    </header>
  )
}

export default DashboardNavBar
