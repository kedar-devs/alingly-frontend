import { shouldUseMockData} from "../../../core/config/app.config";
import { requirementApi } from "../store/api/requirment.api";
import type { Requirement, RequirementVersionMeta } from "../interfaces/requirment.interface";
import { MOCK_REQUIREMENTS, MOCK_ACTIVITY } from "../mock/requirment.mock";

export const requirementHandler = {
    getRequirements: async (): Promise<Requirement[]> => {
        if (shouldUseMockData()) {
            await new Promise(resolve => setTimeout(resolve, 500));
            console.warn("Using Mock Data for getRequirements");
            return MOCK_REQUIREMENTS;
        }
        try{
            const result = await requirementApi.getRequirements();
            return result;
        }catch(error){
            console.error("Error fetching requirements:", error);
            throw error;
        }
    },
    getRequirementById: async (id: string): Promise<Requirement|undefined> => {
        if (shouldUseMockData()) {
            await new Promise(resolve => setTimeout(resolve, 500));
            console.warn("Using Mock Data for getRequirementById");
            return MOCK_REQUIREMENTS.find((requirement) => requirement.id === "req-001");
        }
        try{
            const result = await requirementApi.getRequirementById(id);
            return result;
        }catch(error){
            console.error("Error fetching requirement by id:", error);
            throw error;
        }
    },
    getRequirementsForProject: async (projectId: string): Promise<Requirement[]> => {
        if (shouldUseMockData()) {
            await new Promise(resolve => setTimeout(resolve, 500));
            console.warn("Using Mock Data for getRequirementsForProject");
            return MOCK_REQUIREMENTS.filter((requirement) => requirement.project_id === "project-001");
        }
        try{
            const result = await requirementApi.getRequirementsForProject(projectId);
            return result;
        }catch(error){
            console.error("Error fetching requirements for project:", error);
            throw error;
        }
    },
    getActivityForRequirement:async(requirementId:string,top:number)=>{
        if(shouldUseMockData()){
            await new Promise(resolve=>setTimeout(resolve,500))
            console.warn("Using Mock Data for getActivityForRequirement")
            return MOCK_ACTIVITY.filter(comment=>comment.requirement.id==="req-001").slice(0,5)
        }
        try{
            const result=await requirementApi.getActivityForRequirement(requirementId,top)
            return result
        }catch(error){
            console.error("Error Fetching latest comment",error)
            throw error
        }

    },
    getSearchedRequirment:async(projectId:string,search:string)=>{
        if(shouldUseMockData()){
            console.log("using Mock data for getSearchedRequirment",search)
            if(search===""){
                return MOCK_REQUIREMENTS
            }
            return MOCK_REQUIREMENTS.filter(requirement=>requirement.project_id==="project-001" && requirement.title.toLowerCase().includes("user"))
        }
        try{
            const result=await requirementApi.getSearchedRequirementsForProject(projectId,search)
            return result
        }catch(error){
            console.error("Error Fetching searched requirment",error)
            throw error
        }
    },
    getRequirmentByIdAndVersion: async (requirementId: string, version: number): Promise<Requirement | undefined> => {
        if (shouldUseMockData()) {
            await new Promise((resolve) => setTimeout(resolve, 300));
            console.warn("Using Mock data for getRequirmentByIdAndVersion");
            const req = MOCK_REQUIREMENTS.find((r) => r.id === requirementId);
            if (!req || parseInt(req.version, 10) !== version) return undefined;
            return req;
        }
        try {
            return await requirementApi.getRequirementByIdAndVersion(requirementId, version);
        } catch (error) {
            console.error("Error fetching requirement by version:", error);
            throw error;
        }
    },
    getRequirementVersions: async (requirementId: string): Promise<RequirementVersionMeta[]> => {
        if (shouldUseMockData()) {
            await new Promise((resolve) => setTimeout(resolve, 300));
            console.warn("Using Mock data for getRequirementVersions");
            return [
                { version: 3, updated_at: "2025-01-27T09:15:00Z" },
                { version: 2, updated_at: "2025-01-20T14:30:00Z" },
                { version: 1, updated_at: "2025-01-15T09:00:00Z" },
            ];
        }
        try {
            return await requirementApi.getRequirementVersions(requirementId);
        } catch (error) {
            console.error("Error fetching requirement versions:", error);
            throw error;
        }
    },
};
