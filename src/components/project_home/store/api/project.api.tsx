import { customBaseQuery } from "../../../../core/store/base.query"
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import type { ProjectCreate,Project } from "../../interface/project.interface"

export const projectApi = {
    createProject: async (params: ProjectCreate) => {
        const result = await customBaseQuery<ProjectCreate>({
            url: '/project/create',
            method: 'post',
            body: params,
        })
        return result.data;
    },   
    getProjectById: async (id: string) => {
        const result = await customBaseQuery<Project>({
            url: `/project/${id}`,
            method: 'get',
        })
        return result.data;
    },
    getProjects: async () => {
        const result = await customBaseQuery<Project[]>({
            url: '/project/get-all',
            method: 'get',
        })
        return result.data;
    },
    getProjectsForUser: async (id: string) => {
        const result = await customBaseQuery<Project[]>({
            url: `/project/get-projects-for-user/${id}`,
            method: 'get',
        })
        return result.data;
    },
    getProjectsForOrganization: async (id: string) => {
        const result = await customBaseQuery<Project[]>({
            url: `/project/get-projects-for-organization/${id}`,
            method: 'get',
        })
        return result.data;
    },
    updateProject: async (id: string, params: Project) => {
        const result = await customBaseQuery<Project>({
            url: `/project/${id}`,
            method: 'put',
            body: params,
        })
        return result.data;
    },
    deleteProject: async (id: string) => {
        const result = await customBaseQuery<Project>({
            url: `/project/${id}`,
            method: 'delete',
        })
        return result.data;
    },
}

export const useGetProjectsQuery = (id: string) => {
    return useQuery({
        queryKey: ['projects', id],
        queryFn: () => projectApi.getProjects(),
        enabled: !!id,
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1
    })
}
export const useGetProjectsForUserQuery = (id: string) => {
    return useQuery({
        queryKey: ['projects', id],
        queryFn: () => projectApi.getProjectsForUser(id),
        enabled: !!id,
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1
    })
}
export const useGetProjectByIdQuery = (id: string) => {
    return useQuery({
        queryKey: ['project', id],
        queryFn: () => projectApi.getProjectsForUser(id),
        enabled: !!id,
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1
    })
}
export const useCreateProjectMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: projectApi.createProject,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['projects'] })
        },
    })
}
export const useUpdateProjectMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({id, params}: {id: string, params: Project}) => projectApi.updateProject(id, params),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['projects'] })
        },
    })
}
export const useDeleteProjectMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: projectApi.deleteProject,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['projects'] })
        },
    })
}