import { customBaseQuery } from "../../../../core/store/base.query";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import type { Requirement, RequirementCreate, RequirementVersionMeta } from "../../interfaces/requirment.interface";
import { requirementHandler } from "./../../handler/requirment.handler"
import type { Comment } from "../../interfaces/requirment.interface";

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
    getSearchedRequirementsForProject: async (projectId: string, search: string): Promise<Requirement[]> => {
        const result = await customBaseQuery<Requirement[]>({
            url: `/requirement/search_requirement/${projectId}/${search}`,
            method: 'get',
        })
        return result.data;
    },
    getRequirementVersions: async (requirementId: string): Promise<RequirementVersionMeta[]> => {
        const result = await customBaseQuery<{ versions: RequirementVersionMeta[] }>({
            url: `/requirement/version/${requirementId}/list`,
            method: "get",
        });
        return result.data.versions;
    },
    restoreRequirementVersion: async (requirementId: string, version: number): Promise<Requirement> => {
        const result = await customBaseQuery<Requirement>({
            url: `/requirement/restore/${requirementId}/${version}`,
            method: "post",
        });
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
        return result;
    },
    getRequirementByIdAndVersion: async (id: string, version: number|""): Promise<Requirement | undefined> => {
        const result = await customBaseQuery<Requirement>({
            url: `/requirement/version/${id}/${version}`,
            method: "get",
        });
        return result.data;
    },
    getActivityForRequirement: async (requirementId: string,top: number) => {
        const result = await customBaseQuery<Comment[]>({
            url: `/requirement/get_activity_for_requirement/${requirementId}/${top}`,
            method: 'get',
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
export const useGetSearchedRequirementsForProjectQuery = (projectId: string, search: string) => {
    return useQuery({
        queryKey: ['requirements', 'project', projectId, 'search', search],
        queryFn: () => requirementHandler.getSearchedRequirment(projectId, search),
        enabled: !!projectId,
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
    })
}
export const useGetActivityForRequirementQuery = (requirementId: string, top: number=5) => {
    return useQuery({
        queryKey: ['comments', requirementId, top],
        queryFn: () => requirementHandler.getActivityForRequirement(requirementId, top),
        enabled: !!requirementId && !!top,
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
        refetchInterval: 10000, // 10 seconds
    })
}
export const useGetRequirmentByVersionQuery = (
    requirementId: string,
    version: number|"" = 1,
    enabled: boolean = true
) => {
    return useQuery({
        queryKey: ["requirements", "version", requirementId, version],
        queryFn: () => requirementHandler.getRequirmentByIdAndVersion(requirementId, version),
        enabled: !!requirementId && enabled,
        staleTime: 1000 * 60 * 5,
        retry: 1,
    });
};

export const useGetRequirementVersionsQuery = (requirementId: string) => {
    return useQuery({
        queryKey: ["requirements", "versions", requirementId],
        queryFn: () => requirementHandler.getRequirementVersions(requirementId),
        enabled: !!requirementId,
        staleTime: 1000 * 60 * 5,
        retry: 1,
    });
};

export const useRestoreRequirementVersionMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ requirementId, version }: { requirementId: string; version: number }) =>
            requirementApi.restoreRequirementVersion(requirementId, version),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["requirement", variables.requirementId] });
            queryClient.invalidateQueries({ queryKey: ["requirements"] });
            queryClient.invalidateQueries({ queryKey: ["requirements", "versions", variables.requirementId] });
        },
        onError: (error) => {
            console.error("Error restoring requirement version:", error);
        },
    });
};