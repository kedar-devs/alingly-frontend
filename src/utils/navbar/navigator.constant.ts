import AppPaths from "../../routes/routes.constant"
export const pre_login_navigation = [
    { name: 'Home', path: AppPaths.HOME },
    { name: 'Login', path: AppPaths.LOGIN },
    { name: 'Register', path: AppPaths.REGISTER },
]
export const post_login_navigation = [
    { name: 'Home', path: AppPaths.HOME },
    { name: 'Logout', path: AppPaths.HOME },
]