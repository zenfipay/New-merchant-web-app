// MAIN ROUTES

// export { default as ProtectedRoutes } from './ProtectedRoutes';
// export { default as RoleBasedRoutes } from './RoleBasedRoutes';


// ROUTE CONSTANTS

export const ROUTES = {
    OWNERDASHBOARD: '/owner',
    LOGIN: '/auth',
    SIGNUP: '/auth/register',
    OWNER_BUSINESSES: '/dashboard/owner/businesses',
    ADMIN_BUSINESSES: '/dashboard/admin/businesses',
    BRANCH_MANAGER_BRANCH: '/dashboard/branch-manager/branches',
    STAFF_BRANCH: '/dashboard/staff/branches/',
    ADD_BRANCH: '/auth/add-branch',
    ADD_BUSINESS: '/auth/add-business',
}

export default ROUTES