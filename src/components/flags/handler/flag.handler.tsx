import {shouldUseMockData} from "@/core/config/app.config"
import { flagApi } from "../store/api/flag.api"
import { FlagTypeEnum, type Flag } from "../interface/flag.interface"
import { FlagMockData } from "../mock/flag.mock"


export const flagHandler = {
    getAllFlags: async (): Promise<Flag[]|undefined> => {
        if (shouldUseMockData()) {
            await new Promise(resolve => setTimeout(resolve, 500));
            console.warn("Using Mock Data for getAllFlags");
            return FlagMockData;
        }
        try{
            const response = await flagApi.getAllFlags();
            return response;
        }catch(error){
            console.error("Error fetching flags:", error);
            return undefined;
        }
    },
    getAllFlagsByRequirement: async (requirementId: string): Promise<Flag[]|undefined> => {
        if (shouldUseMockData()) {
            await new Promise(resolve => setTimeout(resolve, 500));
            console.warn("Using Mock Data for getAllFlagsByRequirement");
            return FlagMockData.filter(flag => flag.requirement_id === "req-001");
        }
        try{
            const response = await flagApi.getAllFlagsByRequirement(requirementId);
            return response;
        }catch(error){
            console.error("Error fetching flags by requirement:", error);
            return undefined;
        }
    },
    getFlagByPriority: async (requirementId: string, priority: FlagTypeEnum): Promise<Flag[]|undefined> => {
        if (shouldUseMockData()) {
            await new Promise(resolve => setTimeout(resolve, 500));
            console.warn("Using Mock Data for getFlagByPriority");
            if(priority==FlagTypeEnum.All){
                return FlagMockData.filter(flag => flag.requirement_id === "req-001")   
            }
            return FlagMockData.filter(flag => flag.requirement_id === "req-001" && flag.priority === priority);
        }
        try{
            const response = await flagApi.getFlagByPriority(requirementId, priority);
            return response;
        }catch(error){
            console.error("Error fetching flag by priority:", error);
            return undefined;
        }
    }
}