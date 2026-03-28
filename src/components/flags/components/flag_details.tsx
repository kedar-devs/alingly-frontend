import  { type FlagDetailsType, FlagTypeEnum } from "../interface/flag.interface"
function FlagDetails({ flagDetails }: { flagDetails: FlagDetailsType[] }) {
    const projectOwners = ["John Doe", "Jane Doe", "Jim Doe"]
    return (
        <div className="w-full h-full px-2 py-3 flex flex-col gap-y-2">
            <h1 className=" text-gray-500 font-bold text-xl uppercase">
                Flag by severity
            </h1>
            <div className=" text-lg  ">
                {flagDetails.map((flag)=>(
                    <div className="flex gap-x-2">
                        <span className={` bg-${flag.severity === FlagTypeEnum.High ? 'red-300' : flag.severity === FlagTypeEnum.Medium ? 'yellow-300' : 'blue-300'} w-6 h-6 rounded-md`}>

                        </span>
                        <span className={` text-gray-500 font-bold text-xl uppercase ${flag.severity === FlagTypeEnum.High ? 'text-red-500' : flag.severity === FlagTypeEnum.Medium ? 'text-yellow-500' : 'text-blue-500'}`}>
                            {flag.severity} SEVERITY
                        </span>
                        <span className={` ml-auto ${flag.severity === FlagTypeEnum.High ? 'text-red-500 bg-red-300' : flag.severity === FlagTypeEnum.Medium ? 'text-yellow-500 bg-yellow-300' : 'text-blue-500 bg-blue-300'} w-8 h-6 rounded-md flex items-center justify-center bg-opacity-50`}>
                            {flag.count}
                        </span>
                    </div>
                ))}
            </div>
            <div className=" mt-3">
                <h1 className=" text-gray-500 font-bold text-xl uppercase">
                    Project Owner
                </h1>
                <div className="flex flex-col gap-x-2">
                    <div className=" text-gray-500  capitalize flex flex-col  gap-y-2 mt-4">
                        {projectOwners.map((owner)=>(
                            <div key={owner} className=" text-gray-500 font-bold uppercase text-md">
                                {owner}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}
export default FlagDetails;