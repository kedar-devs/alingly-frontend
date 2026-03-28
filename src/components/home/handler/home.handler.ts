import { shouldUseMockData } from "@/core/config/app.config";
import { homeApi } from "../store/api/home.api";
import type { HomeData } from "../interface/home.interface";

export const homeHandler = {
    getHomeData: async (): Promise<HomeData> => {
        if (shouldUseMockData()) {
            await new Promise(resolve => setTimeout(resolve, 500));
            console.warn("Using Mock Data for getHomeData");
            return {
                trusted_cards: [],
            }
        }
        try{
            const result = await homeApi.getHomeData();
            return result;
        }catch(error){
            console.error("Error fetching home data:", error);
            throw error;
        }
    }
}
