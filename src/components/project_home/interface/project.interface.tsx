import type { UserRole } from "@/components/auth/interfaces/user.interface";
import type { User } from "@/components/auth/interfaces/user.interface";

export type Project={
    id: string;
    name: string;
    description: string;
    organization_id: string;
    users: string[];
    requirements: string[];
    created_at: string;
    updated_at: string;
}

export type TeamMember={
    email: string;
    role: UserRole;

}
export type ProjectFormProps={
    projectSaved: () => void;
    projectError: (error: any) => void;
    user: User | null;
}
export type ProjectCreate={
    name: string;
    description: string;    
    organization_id: string;
    user_id: string;
}

export type ProjectCard={
    project_id:string,
    name:string,
    description:string,
}
export type Stack={
    id: string;
    name: string;
    description: string;
    icon: string;
}