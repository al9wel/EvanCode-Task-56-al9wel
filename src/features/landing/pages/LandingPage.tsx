import { NavLink, useNavigate } from "react-router-dom"

import { ROUTES } from "@/constants/routes"

const LandingPage = () => {
  const navigate = useNavigate()

  return (
    <div>
      <header>
        <nav aria-label="التنقل الرئيسي">
          <NavLink to={ROUTES.PUBLIC.HOME}>وصّل</NavLink>
          {" | "}
          <NavLink to={ROUTES.DASHBOARD.MAIN}>لوحة التحكم</NavLink>
        </nav>
      </header>

      <main>
        <section>
          <h1>وصّل</h1>
          <button
            type="button"
            onClick={() => void navigate(ROUTES.DASHBOARD.MAIN)}
          >
            الذهاب إلى لوحة التحكم
          </button>
        </section>
      </main>
    </div>
  )
}

export default LandingPage
