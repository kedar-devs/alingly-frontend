import { Route, Routes, BrowserRouter } from 'react-router-dom'
import AppPaths from './routes.constant'
import HomeComponent from '../components/home/components/home.component'
import { HeadbarComponent } from '../utils/navbar/headbar.component'
import LoginComponent from '../components/auth/components/Login'
import RegisterComponent from '../components/auth/components/Register'

export const AppRoutes: React.FunctionComponent = () => {
    return (
        <BrowserRouter>
        <HeadbarComponent />
        <Routes>
            <Route path={AppPaths.HOME} element={<HomeComponent />} />
            <Route path={AppPaths.LOGIN} element={<LoginComponent />} />
            <Route path={AppPaths.REGISTER} element={<RegisterComponent />} />
        </Routes>
        </BrowserRouter>
    )
}