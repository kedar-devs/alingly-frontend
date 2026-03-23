import type { Flag } from "./../interface/flag.interface"
import { FlagTypeEnum } from "./../interface/flag.interface"
import { formatRelativeTime } from "@/utils/formatters/time.format"
function FlagCard({ flag }: { flag: Flag }) {
  return (
    <div className={`w-full h-96 flex flex-col border border-l-4 px-2 py-2 ${flag.priority === FlagTypeEnum.High ? 'border-l-red-500' : flag.priority === FlagTypeEnum.Medium ? 'border-l-yellow-500' : 'border-l-blue-500'} rounded-2xl `}>
      <div className =" w-full flex gap-x-3 ">
        <span className=" text-xl text-gray-300 font-bold  ">
          {flag.id.slice(0,3)}...
        </span>
        <span className={`px-2 py-1 bg-opacity-50 rounded-2xl ${flag.priority === FlagTypeEnum.High ? 'bg-red-300 text-red-500' : flag.priority === FlagTypeEnum.Medium ? 'bg-yellow-300 text-yellow-500' : 'bg-blue-300 text-blue-500'} uppercase`}>
          {flag.priority} SEVERITY
        </span>
        <span className="flex ">
          <p className="w-2 h-2 text-black rounded-full" />
          {formatRelativeTime(flag.date)}
        </span>
    
      </div>
      <div className="w-full grid grid-cols-2 gap-x-2 mt-4">
        <div className=" col-span-1 flex flex-col gap-y-2">
          <h1 className=" text-xl text-gray-500 font-bold">
            Flagged Requirment
          </h1>
          <div className="h-36 text-xl overflow-y-auto">
            "{flag.flag}"
          </div>
          <div className=" max-h-36 min-h-28 bg-gray-400 overflow-y-auto px-2 py-2 border border-dashed rounded-2xl">
            {flag.ai_flag}
          </div>
        </div>
        <div className=" col-span-1 flex flex-col gap-y-4">
          <h1 className=" text-xl text-gray-500 font-bold">
            Suggested Rewrite
          </h1>
          <div className="max-h-72 min-h-64 bg-gray-400 text-black rounded-2xl border border-dashed px-2 py-2 ">
            {flag.ai_suggestion}
          </div>
        </div>
      </div>  
    </div>
  )
}

export default FlagCard
