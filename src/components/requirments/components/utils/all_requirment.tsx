import { useGetSearchedRequirementsForProjectQuery } from "../../store/api/requirment.api"
import { useState,useEffect} from "react"
import { useParams } from "react-router-dom"
import { useDebounce } from "../../../../utils/helper/helper"
import { RequirementStatus } from "../../interfaces/requirment.interface"

type AllRequirmentProps={   
    handleRequirementChange: (requirementId: string) => void
}
function  AllRequirment({handleRequirementChange}:AllRequirmentProps) {
    const [searchText, setSearchText] = useState<string>("")
    const debouncedSearchText=useDebounce(searchText, 500)
    const { projectId } =useParams<{ projectId: string}>()

    const handleSearch = (text: string) => {
        setSearchText(text)
    }
    const { data: debouncedRequirements, isLoading: isDebouncedLoading, error: isDebouncedError } = useGetSearchedRequirementsForProjectQuery(projectId || "",debouncedSearchText)

  return (
    <div className="w-full h-full bg-gray-50/50 border border-gray-200 rounded-md flex flex-col p-3 ">
        <div className="w-full h-10 flex flex-row items-start justify-start gap-1 ">
            <input type="text" placeholder="Search requirements" className="w-full h-full p-2 rounded-md border border-gray-200 bg-white" value={searchText} onChange={(e) => handleSearch(e.target.value)} />
        </div>
        {isDebouncedLoading ? <div className=" w-full h-fulll flex item-center justify-center">loading..</div>:<div className="w-full h-full">{(debouncedRequirements && debouncedRequirements.length>0) ? (
            <div className= "w-full h-full flex flex-col overflow-y-auto max-h-[calc(100vh-100px)] mt-5 gap-5">
            {debouncedRequirements.map((requirement) => {
                let headerClass="text-gray-500"
                if(requirement.status === RequirementStatus.APPROVED){
                    headerClass="text-green-500"
                }else if(requirement.status === RequirementStatus.REJECTED){
                    headerClass="text-red-500"
                }else if(requirement.status === RequirementStatus.IN_REVIEW){
                    headerClass="text-yellow-500"
                }
                return(
                <div key={requirement.id} className="w-full h-36 flex flex-col items-start justify-start gap-1 bg-white rounded-md p-3 border cursor-pointer" onClick={()=>handleRequirementChange(requirement.id)}>
                <div className="w-full h-full flex flex-row items-start justify-between gap-1 ">
                    <p className={` ${headerClass}`}>{requirement.status}</p>
                    <div className="ml-auto">
                       {new Date(requirement.created_at).toLocaleDateString()}
                    </div>
                </div>
                    <div className="w-full h-full flex flex-col items-start justify-start gap-1">
                        <h1 className="text-2xl font-bold">{requirement.title}</h1>
                    </div>
                    
                </div>
            )}
            )}
            </div>
        ):(
            <div className=" w-full h-full flex items-center justify-center">No requirements found</div>
        )}
        </div>
        }
    </div>
  )
}

export default AllRequirment 