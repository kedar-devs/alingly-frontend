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

export const AppRoutes: React.FunctionComponent = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path={AppPaths.HOME} element={<HomeComponent />} />
            <Route path={AppPaths.LOGIN} element={<LoginComponent />} />
            <Route path={AppPaths.REGISTER} element={<RegisterComponent />} />
            <Route path={AppPaths.CREATE_ORGANIZATION} element={<CreateOrganizationComponent />} />
            <Route element={<ProjectLayout />}>
                <Route path={AppPaths.CREATE_PROJECT} element={<CreateProjectComponent />} />
                <Route path={AppPaths.PROJECT_HOME} element={<ProjectHomeComponent />} />
                <Route path={AppPaths.PROJECT_DASHBOARD} element={<ProjectDashboard />} />
                <Route path={AppPaths.REQUIREMENT_PAGE} element={<RequirementPage />} />
                <Route path={AppPaths.REQUIREMENT_DASHBOARD} element={<RequirementDashboard />} />
                <Route path={AppPaths.REQUIREMENT_VERSION} element={<RequirementVersion />} />
            </Route>
        </Routes>
        </BrowserRouter>
    )
}