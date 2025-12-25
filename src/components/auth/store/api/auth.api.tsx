
import { useQuery,useQueryClient,useMutation } from "@tanstack/react-query";
import { customBaseQuery } from "../../../../core/store/base.query";
import { useAuthStore } from "../auth.store";

interface User {
    name: string;
    email: string;
    password: string;
}
interface LoginParams {
    email: string;
    password: string;
}
interface AuthResponse {
    token: string;
    user: User;
}
interface AuthState {
    user: User | null;
    isLoading: boolean;
    isError: boolean;
    error: string | null;
    login: (email: string, password: string) => void;
    logout: () => void;
}

export const authKeys = {
    all: ['auth'] as const,
    user: () => [...authKeys.all, 'user'] as const,
    currentUser: () => [...authKeys.user(), 'currentUser'] as const
}

const authApi = {
    register: async(params:User): Promise<AuthResponse> => {
      const result= await customBaseQuery<AuthResponse>({
        url: '/user/register',
        method: 'post',
        body: params,
      })
      return result.data;
    },
    login: async(params:LoginParams): Promise<AuthResponse> => {
      const result= await customBaseQuery<AuthResponse>({
        url: '/user/login',
        method: 'post',
        body: params,
      })
      return result.data;
    },
    getCurrentUser: async(): Promise<User> => {
        const result = await customBaseQuery<User>({
            url: '/user/get',
            method: 'get',
        })
        return result.data;
    },
    logout: async(): Promise<void> => {
        await customBaseQuery<void>({
            url: '/user/logout',
            method: 'post',
        })
        localStorage.removeItem('token');
    },
}

export const useRegisterUserMutation=()=>{
    const queryClient = useQueryClient();
    const {setAuth} = useAuthStore()
    return useMutation({
        mutationFn: authApi.register,
        onSuccess: (data) => {
            setAuth(data.user, data.token);
            // Store the user data in the query cache
            queryClient.setQueryData(authKeys.currentUser(), data.user);
            // Invalidate the current user query to ensure fresh data
            queryClient.invalidateQueries({ queryKey: authKeys.currentUser() });
        },
        onError: (error) => {
            console.error('Registration failed:', error);
        },
    })
}
export const useLoginUserMutation=()=>{
    const queryClient = useQueryClient();
    const {setAuth} = useAuthStore()
    return useMutation({
        mutationFn: authApi.login,
        onSuccess: (data) => {
            setAuth(data.user, data.token);
            queryClient.setQueryData(authKeys.currentUser(), data.user);
            queryClient.invalidateQueries({ queryKey: authKeys.currentUser() });
        },
        onError: (error) => {
            console.error('Login failed:', error);
        },
    })
}
export const useLogoutUserMutation=()=>{
    const queryClient = useQueryClient();
    const {clearAuth} = useAuthStore()
    return useMutation({
        mutationFn: authApi.logout,
        onSuccess: () => {
            clearAuth();
            queryClient.removeQueries({ queryKey: authKeys.currentUser() });
        },
    })
}
export const useGetCurrentUserQuery=(options?:{enabled?:boolean})=>{
    const {token, setUser} = useAuthStore()
    return useQuery({
        queryKey: authKeys.currentUser(),
        queryFn: async()=>{
            const data = await authApi.getCurrentUser()
            setUser(data)
            return data
        },
        enabled: options?.enabled && !!token,
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1
        
    })
}

export const AuthApi = {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useGetCurrentUserQuery,
}

