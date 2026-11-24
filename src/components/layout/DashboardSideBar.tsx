import { NavLink } from "react-router-dom"

import { ROUTES } from "@/constants/routes"

const DashboardSideBar = () => {
  return (
    <aside>
      <nav aria-label="القائمة الجانبية">
        <ul>
          <li>
            <NavLink to={ROUTES.DASHBOARD.MAIN}>الرئيسية</NavLink>
          </li>
          <li>
            <NavLink to={ROUTES.DASHBOARD.ORDERS}>الطلبات</NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default DashboardSideBar
