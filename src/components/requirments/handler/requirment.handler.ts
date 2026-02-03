import { shouldUseMockData} from "../../../core/config/app.config";
import { requirementApi } from "../store/api/requirment.api";
import type { Requirement, RequirementCreate } from "../interfaces/requirment.interface";
import { MOCK_REQUIREMENTS } from "../mock/requirment.mock";

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
            return MOCK_REQUIREMENTS.find((requirement) => requirement.id === id);
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
            return MOCK_REQUIREMENTS.filter((requirement) => requirement.project_id === projectId);
        }
        try{
            const result = await requirementApi.getRequirementsForProject(projectId);
            return result;
        }catch(error){
            console.error("Error fetching requirements for project:", error);
            throw error;
        }
    }
}