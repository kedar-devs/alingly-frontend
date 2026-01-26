import { Outlet, useParams, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Sidebar from "../../../utils/sidebar/sidebar";
import AppPaths from "../../../routes/routes.constant";
import { useGetDashboardDataQuery } from "../store/api/dashboard.api";
import { defaultSidebarConfig } from "../../../utils/sidebar/sidebar.constant";

function ProjectLayout() {
    const location = useLocation();
    const {projectId} = useParams<{projectId: string}>();
    const navigate = useNavigate();

    const currentPath = location.pathname;
    const isDashboard = currentPath.includes(AppPaths.PROJECT_DASHBOARD);
    const {data: dashboardData} = useGetDashboardDataQuery(
        isDashboard && projectId ? projectId : ''
    );

    const sidebarConfig = {
        ...defaultSidebarConfig,
        navItems: defaultSidebarConfig.navItems.map(item => ({
            ...item,
            isActive: item.id === "dashboard" // Set active based on current route
        })),
        footerAction: {
            ...defaultSidebarConfig.footerAction!,
            onClick: () => navigate(AppPaths.CREATE_PROJECT)
        }
    };
    const misalignmentsCount = dashboardData?.misalignmentsCount || 0;
  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased font-display">
        <Sidebar config={sidebarConfig} misalignmentsCount={misalignmentsCount} />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <Outlet />
        </div>
    </div>
  )
}

export default ProjectLayout