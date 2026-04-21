import { UserRole } from "@/components/auth/interfaces/user.interface";
import CreateProjectComponent from '../components/project_home/components/create_project_components/create_project'
import ProjectHomeComponent from '../components/project_home/components/project_home'
import RequirementPage from '../components/requirments/components/requirment_page'
import ProjectDashboard from '../components/project_home/components/project_dashboard'
import RequirementDashboard from '../components/requirments/components/requirment_dashboard'
import RequirementVersion from '@/components/requirments/components/requirment_version'
import FlagCenter from '@/components/flags/components/flag_center'

export type ProtectedRoutes = {
    route: string;
    allowedRoles: UserRole[];
    element: React.ReactNode;
}

const AppPaths = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    UNAUTHORIZED: '/unauthorized',
    FORGOT_PASSWORD: '/forgot-password',
    CREATE_PROJECT: '/create-project',
    PROJECT_HOME: '/project-home',
    PROJECT_DETAILS: '/project-details',
    REQUIREMENT_PAGE: '/requirement-page/:projectId',
    CREATE_ORGANIZATION: '/create-organization',
    RESET_PASSWORD: '/reset-password',
    PROJECT_DASHBOARD: '/project-dashboard/:projectId',
    VERIFY_EMAIL: '/verify-email',
    VERIFY_OTP: '/verify-otp',
    WORKSTREAM_DETAILS: '/workstream-details/:workstreamId',
    REQUIREMENT_DASHBOARD: '/project/:projectId/requirement-dashboard/:requirementId',
    REQUIREMENT_DETAILS: '/project/:projectId/requirement-details/:requirementId',
    REQUIREMENT_VERSION: '/requirement-details/:requirementId/version-history',
    FLAG_MISALIGNED: '/flag-misaligned/:requirementId',
}

export const protectedRoutes: Array<ProtectedRoutes> = [
    {
        route: AppPaths.CREATE_PROJECT,
        // allowedRoles: [UserRole.ADMIN, UserRole.CONSULTANT],
        allowedRoles: [UserRole.ALL],
        element: <CreateProjectComponent />
    },
    {
        route: AppPaths.PROJECT_HOME,
        allowedRoles: [UserRole.ALL],
        element: <ProjectHomeComponent />
    },
    {
        route: AppPaths.PROJECT_DASHBOARD,
        allowedRoles: [UserRole.ALL],
        element: <ProjectDashboard />
    },
    {
        route: AppPaths.REQUIREMENT_PAGE,
        allowedRoles: [UserRole.ALL],
        element: <RequirementPage />
    },
    {
        route: AppPaths.REQUIREMENT_DASHBOARD,
        allowedRoles: [UserRole.ALL],
        element: <RequirementDashboard />
    },
    {
        route: AppPaths.REQUIREMENT_VERSION,
        allowedRoles: [UserRole.ALL],
        element: <RequirementVersion />
    },
    {
        route: AppPaths.FLAG_MISALIGNED,
        allowedRoles: [UserRole.ALL],
        element: <FlagCenter />
    }
]

export default AppPaths;