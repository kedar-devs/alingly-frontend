import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { customBaseQuery } from "../../../../core/store/base.query";
import { useOrganizationStore } from "../organization.store";


interface Organization {
    name: string;
}
interface PresignedUrlRequest {
    file_name: string;
    content_type: string;
    file_size?: number;
}

interface PresignedUrlResponse {
    upload_url: string;
    fields: Record<string, string>;
    file_key: string;
    file_url: string;
}

const organizationApi = {
    getUploadUrl: async (params: PresignedUrlRequest): Promise<PresignedUrlResponse> => {
        const result = await customBaseQuery<PresignedUrlResponse>({
            url: '/organization/get-upload-url',
            method: 'post',
            body: params,
        });
        return result.data;
    },
    
    uploadToS3: async (presignedData: PresignedUrlResponse, file: File): Promise<string> => {
        const formData = new FormData();
        Object.entries(presignedData.fields).forEach(([key, value]) => {
            formData.append(key, value);
        });
        
        formData.append('file', file);
        
        const response = await fetch(presignedData.upload_url, {
            method: 'POST',
            body: formData,
        });
        
        if (!response.ok) {
            throw new Error(`S3 upload failed: ${response.statusText}`);
        }
        return presignedData.file_url;
    },
    getOrganizations: async(): Promise<Organization[]> => {
        const result = await customBaseQuery<Organization[]>({
            url: '/organization/get',
            method: 'get',
        })
        return result.data;
    },
    createOrganization: async(formdata: FormData): Promise<Organization> => {
        const result = await customBaseQuery<Organization>({
            url: '/organization/create',
            method: 'post',
            body: formdata,
        })
        return result.data;
    },
    updateOrganization: async(organization: Organization): Promise<Organization> => {
        const result = await customBaseQuery<Organization>({
            url: '/organization/update',
            method: 'put',
            body: organization,
        })
        return result.data;
    },
    deleteOrganization: async(id: string): Promise<void> => {
        await customBaseQuery<void>({
            url: `/organization/delete/${id}`,
            method: 'delete',
        })
    },
    getOrganizationById: async(id: string): Promise<Organization> => {
        const result = await customBaseQuery<Organization>({
            url: `/organization/get/${id}`,
            method: 'get',
        })
        return result.data;
    },
}

export const useGetOrganizationByIdQuery=(id: string)=>{
    const queryClient = useQueryClient();
    const {setOrganization} = useOrganizationStore();
    return useQuery({
        queryKey: ['organizations',id],
        queryFn: async()=>{
            const data = await organizationApi.getOrganizationById(id);
            setOrganization(data);
            return data;
        },
        enabled: !!id,
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1
    })
}
export const useGetAllOrganizationsQuery=()=>{
    return useQuery({
        queryKey: ['organizations'],
        queryFn: async()=>{
            const data = await organizationApi.getOrganizations();
            return data;
        },
    })
}
export const useCreateOrganizationMutation=()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: organizationApi.createOrganization,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['organizations'] });
        },
    })
}
export const useUpdateOrganizationMutation=()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: organizationApi.updateOrganization,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['organizations'] });
        },
    })
}
export const useDeleteOrganizationMutation=()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: organizationApi.deleteOrganization,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['organizations'] });
        },
    })
}

export const useGetUploadUrlMutation=()=>{
    return useMutation({
        mutationFn: organizationApi.getUploadUrl,
        onSuccess: (data) => {
            return data;
        },
    })
}
