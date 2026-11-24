import { createBrowserRouter, Navigate } from "react-router-dom"

import DashboardLayout from "@/components/layout/DashboardLayout"
import { ROUTES } from "@/constants/routes"
import LandingPage from "@/features/landing/pages/LandingPage"
import MainPage from "@/features/main/pages/MainPage"
import OrdersPage from "@/features/orders/pages/OrdersPage"

export const router = createBrowserRouter([
  {
    path: ROUTES.PUBLIC.HOME,
    element: <LandingPage />,
  },
  {
    path: ROUTES.DASHBOARD.ROOT,
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.DASHBOARD.MAIN} replace />,
      },
      {
        path: "main",
        element: <MainPage />,
      },
      {
        path: "orders",
        element: <OrdersPage />,
      },
    ],
  },
])
