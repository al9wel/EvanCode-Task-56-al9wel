import { Suspense } from "react"
import { createBrowserRouter, Navigate } from "react-router-dom"

import AppErrorBoundary from "@/app/pages/AppErrorBoundary"
import {
  LandingPage,
  MainPage,
  OrdersPage,
  RouteFallback,
} from "@/app/router/lazyPages"
import DashboardLayout from "@/components/layout/DashboardLayout"
import { ROUTES } from "@/constants/routes"

export const router = createBrowserRouter([
  {
    path: ROUTES.PUBLIC.HOME,
    errorElement: <AppErrorBoundary />,
    element: (
      <Suspense fallback={<RouteFallback fullScreen />}>
        <LandingPage />
      </Suspense>
    ),
  },
  {
    path: ROUTES.DASHBOARD.ROOT,
    element: <DashboardLayout />,
    errorElement: <AppErrorBoundary />,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.DASHBOARD.MAIN} replace />,
      },
      {
        path: "main",
        element: (
          <Suspense fallback={<RouteFallback />}>
            <MainPage />
          </Suspense>
        ),
      },
      {
        path: "orders",
        element: (
          <Suspense fallback={<RouteFallback />}>
            <OrdersPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <AppErrorBoundary isNotFound />,
  },
])
