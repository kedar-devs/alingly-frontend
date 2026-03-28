import { Route, Routes, BrowserRouter } from 'react-router-dom'
import AppPaths from './routes.constant'
import HomeComponent from '../components/home/components/home.component'
import LoginComponent from '../components/auth/components/Login'
import RegisterComponent from '../components/auth/components/Register'
import CreateOrganizationComponent from '../components/organization/components/createOrganization'
import CreateProjectComponent from '../components/project_home/components/create_project'
import ProjectHomeComponent from '../components/project_home/components/project_home'
import RequirementPage from '../components/requirments/components/requirment_page'
import ProjectDashboard from '../components/project_home/components/project_dashboard'
import ProjectLayout from '../components/project_home/components/project_layout'
import RequirementDashboard from '../components/requirments/components/requirment_dashboard'
import RequirementVersion from '@/components/requirments/components/requirment_version'
import FlagCenter from '@/components/flags/components/flag_center'
import Unautherised from '@/components/auth/rbac/unautherised'
import { protectedRoutes } from './routes.constant'
import { UserRole } from '@/components/auth/interfaces/user.interface'
import { Permissions } from '@/components/auth/rbac/permissions'

export const AppRoutes: React.FunctionComponent = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path={AppPaths.HOME} element={<HomeComponent />} />
            <Route path={AppPaths.LOGIN} element={<LoginComponent />} />
            <Route path={AppPaths.REGISTER} element={<RegisterComponent />} />
            <Route path={AppPaths.UNAUTHORIZED} element={<Unautherised />} />

            <Route path={AppPaths.CREATE_ORGANIZATION} element={<CreateOrganizationComponent />} />
            <Route element={
                <Permissions allowedRoles={[UserRole.ALL]} >
                <ProjectLayout />
                </Permissions>
                }>
                {
                    protectedRoutes.map((route) => (
                        <Route key={route.route} path={route.route} element={<Permissions allowedRoles={route.allowedRoles} >{route.element}</Permissions>} />
                    ))
                }
            </Route>
        </Routes>
        </BrowserRouter>
    )
}