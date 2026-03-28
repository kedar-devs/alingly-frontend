import { Outlet, Navigate, replace } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import type { AllowedRoles } from "../interfaces/user.interface";
import AppPaths from "@/routes/routes.constant";
import { UserRole } from "../interfaces/user.interface";


export const Permissions = ({allowedRoles, children}: AllowedRoles) => {
    const { user } = useAuthStore();
    if (allowedRoles.includes(UserRole.ALL)) {
        return children;
    }
    if (!user) {
        return <Navigate to={AppPaths.LOGIN} replace />;
    }
    if (!allowedRoles.includes(user.role as UserRole)) {
        return <Navigate to={AppPaths.LOGIN} replace />;
    }
    
    return children;
};