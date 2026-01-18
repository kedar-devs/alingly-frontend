import { create } from "zustand";
import type { DashboardData } from "../interface/dashboard.interface.ts";
import { dashboardHandler } from "../handlers/dashboard.handler.ts";

interface DashboardState {
  dashboardData: DashboardData | null;
  isLoading: boolean;
  error: Error | null;
  currentProjectId: string | null;
  
  // Actions
  fetchDashboardData: (projectId: string) => Promise<void>;
  setDashboardData: (data: DashboardData) => void;
  clearDashboardData: () => void;
  reset: () => void;
}

/**
 * Dashboard Store
 * 
 * Zustand store for managing dashboard data state.
 * This store can be used alongside React Query or independently.
 * 
 * Usage:
 * ```tsx
 * const { dashboardData, fetchDashboardData, isLoading } = useDashboardStore();
 * 
 * useEffect(() => {
 *   fetchDashboardData(projectId);
 * }, [projectId]);
 * ```
 */
export const useDashboardStore = create<DashboardState>((set) => ({
  dashboardData: null,
  isLoading: false,
  error: null,
  currentProjectId: null,

  fetchDashboardData: async (projectId: string) => {
    set({ isLoading: true, error: null, currentProjectId: projectId });
    
    try {
      const data = await dashboardHandler.getDashboardData(projectId);
      set({ 
        dashboardData: data, 
        isLoading: false, 
        error: null,
        currentProjectId: projectId 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error : new Error('Failed to fetch dashboard data'),
        isLoading: false,
        dashboardData: null 
      });
    }
  },

  setDashboardData: (data: DashboardData) => {
    set({ dashboardData: data, error: null });
  },

  clearDashboardData: () => {
    set({ 
      dashboardData: null, 
      error: null, 
      currentProjectId: null 
    });
  },

  reset: () => {
    set({ 
      dashboardData: null, 
      isLoading: false, 
      error: null, 
      currentProjectId: null 
    });
  },
}));
