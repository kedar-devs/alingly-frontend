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

export type ProjectCreate={
    name: string;
    description: string;    
    organization_id: string;
    user_id: string;
}
