import { Route, Routes, BrowserRouter } from 'react-router-dom'
import AppPaths from './routes.constant'
import HomeComponent from '../components/home/components/home.component'

export const AppRoutes: React.FunctionComponent = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path={AppPaths.HOME} element={<HomeComponent />} />
        </Routes>
        </BrowserRouter>
    )
}