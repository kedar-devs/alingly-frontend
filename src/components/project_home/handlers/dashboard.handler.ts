import { customBaseQuery } from "../../../core/store/base.query";
import { shouldUseMockData } from "../../../core/config/app.config";
import { mockDashboardData } from "../mocks/dashboard.mock";
import type { DashboardData } from "../interface/dashboard.interface";

/**
 * Dashboard Data Handler
 * 
 * This handler manages fetching dashboard data from either:
 * - Mock data (for development/testing)
 * - Real API (for production)
 * 
 * The data source is controlled by environment variables:
 * - VITE_USE_MOCK_DATA: Global mock data flag
 * - VITE_DASHBOARD_USE_MOCK: Dashboard-specific mock data flag
 */
export const dashboardHandler = {
  /**
   * Fetches dashboard data for a project
   * @param projectId - The project ID to fetch dashboard data for
   * @returns Promise<DashboardData> - The dashboard data
   */
  getDashboardData: async (projectId: string): Promise<DashboardData> => {
    // Check if we should use mock data
    if (shouldUseMockData()) {
      
      // Simulate API delay for more realistic behavior
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Return mock data with project-specific modifications if needed
      return {
        ...mockDashboardData,
        // You can modify mock data based on projectId if needed
        projectName: projectId ? `Project ${projectId} - Enterprise Upgrade` : mockDashboardData.projectName,
      };
    }
    
    try {
      const result = await customBaseQuery<DashboardData>({
        url: `/project/${projectId}/dashboard`,
        method: 'get',
      });
      
      return result.data;
    } catch (error) {
      console.error('[Dashboard Handler] API error, falling back to mock data:', error);
      
      // Fallback to mock data if API fails (optional - you can remove this if you want strict API-only mode)
      if (import.meta.env.DEV) {
        console.warn('[Dashboard Handler] Falling back to mock data due to API error');
        return {
          ...mockDashboardData,
          projectName: projectId ? `Project ${projectId} - Enterprise Upgrade` : mockDashboardData.projectName,
        };
      }
      
      // Re-throw error in production
      throw error;
    }
  },
};
