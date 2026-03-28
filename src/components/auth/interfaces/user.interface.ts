export interface User {
    id: string;
    organization_id: string;
    created_at: string;
    updated_at: string;
    name: string;
    email: string;
    password: string;
}

export interface UserCreate {
    name: string;
    email: string;
    password: string;
    organization_id: string;
}

export interface UserLogin {
    email: string;
    password: string;
}

export enum UserRole {
    ADMIN = "ADMIN",
    DEVELOPER = "DEVELOPER",
    REVIEWER = "REVIEWER",
    VIEWER = "VIEWER",
    CONSULTANT = "CONSULTANT",
    ALL = "ALL",

}
export interface AllowedRoles {
    allowedRoles: UserRole[];
    children: React.ReactNode;
}