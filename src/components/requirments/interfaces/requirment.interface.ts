import type{ JSONContent } from '@tiptap/react'
export interface User {
    id:string,
    name:string,
}
export enum RequirementStatus {
    DRAFT = "DRAFT",
    REJECTED = "REJECTED",
    IN_REVIEW = "IN_REVIEW",
    APPROVED = "APPROVED",
    CHANGES_REQUESTED = "CHANGES_REQUESTED",
    HANDED_TO_DEV = "HANDED_TO_DEV",
}
export interface Requirement {
    id:string,
    title:string,
    content:JSONContent,
    version:string,
    project_id:string,
    status:RequirementStatus,
    created_at:string,
    updated_at:string,
}

export interface RequirementCreate {
    title:string,
    content:JSONContent,
    version:string,
    project_id:string,
}

export interface RequirementVersionMeta {
    version: number;
    updated_at: string;
    updated_by?: string;
}

export interface Comment {
    id:string,
    content:string,
    created_at:string,
    updated_at:string,
    user_id:string,
    requirement_id:string,
    parent_comment_id:string|null,
    author:User,
    requirement:Requirement,
    parent:Comment|null,
    children:Comment[],
}