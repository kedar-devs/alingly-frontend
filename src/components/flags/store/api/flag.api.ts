import {customBaseQuery} from "../../../../core/store/base.query";
import {FlagTypeEnum} from "./../../interface/flag.interface"
import {useQuery} from "@tanstack/react-query";
import {flagHandler} from "../../handler/flag.handler";
import type { Flag } from "../../interface/flag.interface";

export const flagApi={
    getAllFlags:async():Promise<Flag[]>=>{
        const result=await customBaseQuery<Flag[]>({
            url:'flag/get_all',
            method:'get'
        })
        return result.data
    },
    getAllFlagsByRequirement:async(id:string):Promise<Flag[]>=>{
        const result=await customBaseQuery<Flag[]>({
            url:`flag/get_all_by_requirement/${id}`,
            method:'get'
        })
        return result.data
    },
    getFlagByPriority:async(id:string,type:FlagTypeEnum):Promise<Flag[]>=>{
        const result=await customBaseQuery<Flag[]>({
            url:`flag/get_by_priority/${id}/${type}`,
            method:'get'
        })
        return result.data
    }
}
export const useGetAllFlagsQuery=() => {
    return useQuery({
        queryKey: ['flags'],
        queryFn: () => flagHandler.getAllFlags(),
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1, // Retry once on failure

    })
}
export const useGetAllFlagsByRequirementQuery=(requirementId:string) => {
    return useQuery({
        queryKey: ['flags', 'requirement', requirementId],
        queryFn: () => flagHandler.getAllFlagsByRequirement(requirementId),
        enabled: !!requirementId,
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1, // Retry once on failure
        
    })
}
export const useGetFlagByPriorityQuery=(requirementId:string,type:FlagTypeEnum) => {
    return useQuery({
        queryKey: ['flags', 'requirement', requirementId, 'priority', type],
        queryFn: () => flagHandler.getFlagByPriority(requirementId,type),
        enabled: !!requirementId && !!type,
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1, // Retry once on failure
        
    })
}
