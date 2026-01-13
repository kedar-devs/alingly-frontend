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
    
}

