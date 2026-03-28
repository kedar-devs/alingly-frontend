import { customBaseQuery } from "@/core/store/base.query";
import type { HomeData } from "../../interface/home.interface";
import { useQuery } from "@tanstack/react-query";
import { homeHandler } from "../../handler/home.handler";

export const homeApi = {
    getHomeData: async (): Promise<HomeData> => {
        const result = await customBaseQuery<HomeData>({
            url: '/home/get-home-data',
            method: 'get',
        })
        return result.data;
    }
}

export const useGetHomeDataQuery = () => {
    return useQuery<HomeData>({
        queryKey: ['home-data'],
        queryFn: async () => await homeHandler.getHomeData(),
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1
    })
}