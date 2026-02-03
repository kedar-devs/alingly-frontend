export enum RequirementStatus {
    DRAFT = "DRAFT",
    IN_REVIEW = "IN_REVIEW",
    APPROVED = "APPROVED",
    CHANGES_REQUESTED = "CHANGES_REQUESTED",
    HANDED_TO_DEV = "HANDED_TO_DEV",
}
export interface Requirement {
    id:string,
    title:string,
    content:string,
    version:string,
    status:RequirementStatus,
    created_at:string,
    updated_at:string,
}

export interface RequirementCreate {
    title:string,
    content:string,
    version:string,
    project_id:string,
}
