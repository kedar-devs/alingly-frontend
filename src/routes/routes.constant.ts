const AppPaths = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
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

export default AppPaths;