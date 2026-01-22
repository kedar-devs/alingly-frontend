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

export const AppRoutes: React.FunctionComponent = () => {
    return (
        <BrowserRouter>
        
        <Routes>
            <Route path={AppPaths.HOME} element={<HomeComponent />} />
            <Route path={AppPaths.LOGIN} element={<LoginComponent />} />
            <Route path={AppPaths.REGISTER} element={<RegisterComponent />} />
            <Route path={AppPaths.CREATE_ORGANIZATION} element={<CreateOrganizationComponent />} />
            <Route path={AppPaths.CREATE_PROJECT} element={<CreateProjectComponent />} />
            <Route path={AppPaths.PROJECT_HOME} element={<ProjectHomeComponent />} />
            <Route path={AppPaths.PROJECT_DASHBOARD} element={<ProjectDashboard />} />
            <Route path={AppPaths.REQUIREMENT_PAGE} element={<RequirementPage />} />
        </Routes>
        </BrowserRouter>
    )
}