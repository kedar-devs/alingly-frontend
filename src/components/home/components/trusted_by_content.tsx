import type { TrustedCardType } from "../interface/home.interface";
import TrustedCard from "./trusted_card";
import { useGetHomeDataQuery } from "../store/api/home.api";
import Toaster from "@/utils/toaster/toaster";
import { useEffect, useState } from "react";
function TrustedByContent() {
    const {data,isLoading,error} = useGetHomeDataQuery()
    const trustedCards: TrustedCardType[] = data?.trusted_cards || []
    const [toast,setToast] = useState<boolean>(false)
    useEffect(()=>{
        if(error){
            setToast(true)
        }
    },[error])
    return (
        <div className=" w-full h-48 flex justify-center items-center bg-white gap-x-16 flex-col">
            <Toaster message="Error fetching home data" type="error" count={toast?1:0} />
            <h1 className=" text-lg font-bold text-gray-400 uppercase">Trusted by world's top firms</h1>
            <div className=" w-full h-2/3 flex justify-center items-center gap-x-16 overflow-x-scroll">
            {trustedCards.length>0?trustedCards.map((cards)=>(
                <TrustedCard key={cards.name} trustedCard={cards} />
            )):Array.from({length:4}).map((_,index)=>(
                <div className=" w-64 h-18 bg-gray-400 rounded-md animate-pulse" key={index} />
            ))}
            </div>
        </div>
    )
}
export default TrustedByContent;