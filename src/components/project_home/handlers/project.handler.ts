import { shouldUseMockData } from "../../../core/config/app.config";
import { projects } from "../mocks/project.mock";
import type { Project } from "../interface/project.interface";
import { projectApi } from "../store/api/project.api";

export const projectHandler = {
    getProjects: async (): Promise<Project[]> => {
        if (shouldUseMockData()) {
            await new Promise(resolve => setTimeout(resolve, 500));
            console.warn("Using Mock Data for getProjects");
            return projects;
        }
        try{
            const result = await projectApi.getProjects();
            return result;
        }catch(error){
            console.error("Error fetching projects:", error);
            throw error;
        }
    },
    getProjectById: async (id: string): Promise<Project|undefined> => {
        if (shouldUseMockData()) {
            await new Promise(resolve => setTimeout(resolve, 500));
            return projects.find((project) => project.id === id);
        }
        try{
            const result = await projectApi.getProjectById(id);
            return result;
        }catch(error){
            console.error("Error fetching project by id:", error);
            throw error;
        }
    },
    getProjectsForUser: async (userId: string): Promise<Project[]> => {
        if (shouldUseMockData()) {
            await new Promise(resolve => setTimeout(resolve, 500));
            console.warn("Using Mock Data for getProjectsForUser");
            return projects.filter((project) => project.users.includes(userId));
        }
        try{
        const result = await projectApi.getProjectsForUser(userId);
            return result;
        }catch(error){
            console.error("Error fetching projects for user:", error);
            throw error;
        }
    },
    getProjectsForOrganization: async (organizationId: string): Promise<Project[]> => {
        if (shouldUseMockData()) {
            await new Promise(resolve => setTimeout(resolve, 500));
            console.warn("Using Mock Data for getProjectsForOrganization");
            return projects.filter((project) => project.organization_id === organizationId);
        }
        try{
            const result = await projectApi.getProjectsForOrganization(organizationId);
            return result;
        }catch(error){
            console.error("Error fetching projects for organization:", error);
            throw error;
        }
    }
}