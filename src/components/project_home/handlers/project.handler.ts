import { shouldUseMockData } from "../../../core/config/app.config";
import { projects } from "../mocks/project.mock";
import type { Project } from "../interface/project.interface";
import { projectApi } from "../store/api/project.api";
import type { Stack } from "../interface/project.interface";
import { stacks } from "../mocks/project.mock";

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
            const result= projects.filter((project) => project.users.includes("user-1"));
            console.log("Mock Data for getProjectsForUser:", result,userId);
            return result;
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
    },
    getStacksHandler: async (search: string): Promise<Stack[]> => {
        if (shouldUseMockData()) {
            await new Promise(resolve => setTimeout(resolve, 500));
            console.warn("Using Mock Data for getStacksHandler");
            if(search===""){
                return stacks;
            }
            return stacks.filter((stack) => stack.name.toLowerCase().includes(search.toLowerCase()));
        }
        try{
            const result = await projectApi.getStacks(search);
            return result;
        }catch(error){
            console.error("Error fetching stacks:", error);
            throw error;
        }
    },
}