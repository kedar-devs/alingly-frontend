import { useParams } from "react-router-dom";
import { FlagTypeEnum, type FlagType, type Flag } from "./../interface/flag.interface"
import FlagCard from "./flag_card"
import {useGetFlagByPriorityQuery} from "./../store/api/flag.api"

function FlagContents({ type }: FlagType) {
  const { requirementId } = useParams<{ requirementId: string }>();
  const { data: flags, isLoading, error } = useGetFlagByPriorityQuery(requirementId??"",type)
  return (
    <div className="w-full h-full flex flex-col overflow-y-scroll ">
        {isLoading ? (
            <div>Loading...</div>
        ) : error ? (
            <div>Error loading flags</div>
        ) : flags && flags.length > 0 ? (
            <div className="w-full h-full flex flex-col gap-y-4 overflow-y-scroll ">
                {flags.map((flag: Flag) => (
                    <FlagCard key={flag.id} flag={flag} />
                ))}
            </div>
        ) : (
            <div>No flags found for this requirement.</div>
        )}
    </div>
  )
}

export default FlagContents
