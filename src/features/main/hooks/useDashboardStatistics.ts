import { useQuery } from "@tanstack/react-query"

import { mainApi } from "@/features/main/api/mainApi"

export const useDashboardStatistics = () => {
  return useQuery({
    queryKey: ["dashboard-statistics"],
    queryFn: () => mainApi.getStatistics(),
  })
}
