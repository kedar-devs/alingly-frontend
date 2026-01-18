import { useQuery } from "@tanstack/react-query"
import type { DashboardData } from "../../interface/dashboard.interface"
import { dashboardHandler } from "../../handlers/dashboard.handler"

/**
 * Dashboard API
 * 
 * This module provides React Query hooks for dashboard data.
 * The actual data fetching is handled by dashboardHandler which
 * manages the switch between mock data and real API calls.
 */
export const dashboardApi = {
  /**
   * Fetches dashboard data for a project
   * Uses the dashboard handler which manages mock/API switching
   */
  getDashboardData: async (projectId: string): Promise<DashboardData> => {
    return dashboardHandler.getDashboardData(projectId);
  },
}

/**
 * React Query hook for fetching dashboard data
 * @param projectId - The project ID to fetch dashboard data for
 * @returns Query result with dashboard data
 */
export const useGetDashboardDataQuery = (projectId: string) => {
  return useQuery({
    queryKey: ['dashboard', projectId],
    queryFn: () => dashboardApi.getDashboardData(projectId),
    enabled: !!projectId,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1
  })
}
