import { customBaseQuery } from "../../../../core/store/base.query";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import type { Requirement, RequirementCreate } from "../../interfaces/requirment.interface";
import { requirementHandler } from "./../../handler/requirment.handler"

export const requirementApi = {
    getRequirements: async (): Promise<Requirement[]> => {
        const result = await customBaseQuery<Requirement[]>({
            url: '/requirement/get_all',
            method: 'get',
        })
        return result.data;
    },
    getRequirementById: async (id: string): Promise<Requirement|undefined> => {
        const result = await customBaseQuery<Requirement|undefined>({
            url: `/requirement/get/${id}`,
            method: 'get',
        })
        return result.data;
    },
    getRequirementsForProject: async (projectId: string): Promise<Requirement[]> => {
        const result = await customBaseQuery<Requirement[]>({
            url: `/requirement/get_requirements_for_project/${projectId}`,
            method: 'get',
        })
        return result.data;
    },
    createRequirement: async (requirement: RequirementCreate) => {
        const result = await customBaseQuery<RequirementCreate>({
            url: '/requirement/create',
            method: 'post',
            body: requirement,
        })
        return result.data;
    },
    updateRequirement: async (id: string, requirement: Requirement) => {
        const result = await customBaseQuery<Requirement>({
            url: `/requirement/update/${id}`,
            method: 'put',
            body: requirement,
        })
        return result.data;
    },
    deleteRequirement: async (id: string) => {
        const result = await customBaseQuery<Requirement>({
            url: `/requirement/delete/${id}`,
            method: 'delete',
        })
        return result.data;
    },

}
export const useGetRequirementsQuery = (projectId: string) => {
    return useQuery({
        queryKey: ['requirements'],
        queryFn: () => requirementHandler.getRequirementsForProject(projectId),
        enabled: !!projectId,
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1
    })
}
export const useGetRequirementByIdQuery = (id: string) => {
    return useQuery({
        queryKey: ['requirement', id],
        queryFn: () => requirementHandler.getRequirementById(id),
        enabled: !!id,
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1
    })
}
export const useGetRequirementsForProjectQuery = (projectId: string) => {
    return useQuery({
        queryKey: ['requirements', 'project', projectId],
        queryFn: () => requirementHandler.getRequirementsForProject(projectId),
    })
}
export const useCreateRequirementMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: requirementApi.createRequirement,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['requirements'] })
        },
        onError: (error) => {
            console.error("Error creating requirement:", error);
        },
    })
}
export const useUpdateRequirementMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({id, requirement}: {id: string, requirement: Requirement}) => requirementApi.updateRequirement(id, requirement),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['requirements'] })
        },
        onError: (error) => {
            console.error("Error updating requirement:", error);
        },
    })
}
export const useDeleteRequirementMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: requirementApi.deleteRequirement,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['requirements'] })
        },
        onError: (error) => {
            console.error("Error deleting requirement:", error);
        },
    })
}
