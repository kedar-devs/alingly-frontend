import { useDebounce } from "../../../../utils/helper/helper"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useGetStacksQuery } from "../../store/api/project.api"
import { Loader2 } from "lucide-react"
import AppPaths from "../../../../routes/routes.constant"

function Intigration() {
    const [search, setSearch] = useState<string>('')
    const debouncedSearch = useDebounce(search, 500)
    const { data: stacks, isLoading, error } = useGetStacksQuery(debouncedSearch)
    const [selectedStacks, setSelectedStacks] = useState<string[]>([])
    const navigate = useNavigate()

    const handleFinishAndLaunchProject = () => {
        navigate(AppPaths.PROJECT_DASHBOARD.replace(':projectId', '0'))
    }
    const handleSelectStack = (stack: string) => {
        setSelectedStacks([...selectedStacks, stack])
    }
    const handleUnselectStack = (stack: string) => {
        setSelectedStacks(selectedStacks.filter((s) => s !== stack))
    }
    return (
        <div className=" w-full h-full flex flex-col  gap-y-5 p-10">
            <div className=" w-full h-1/5 flex justify-between items-center">
                <div className="w-1/2 flex flex-col gap-y-2">
                    <h1 className=" text-2xl font-bold capitalize">Choose your stack</h1>
                    <p className="text-sm text-gray-500">Integrate your project with your favorite tools to get started.</p>
                </div>
                <div className="w-1/2 flex items-center gap-x-2 py-2">
                <div className=" ml-auto">
                    <input className=" border w-fit p-2 rounded-md bg-gray-100 " type="text" placeholder="Search for a stack" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>     
                </div>
            </div>
            {isLoading && <div className="flex items-center justify-center">
                <Loader2 className="w-4 h-4 animate-spin" />
            </div>}
            {error && <div className="flex items-center justify-center">
                <p className="text-red-500 text-sm">Error fetching stacks</p>
            </div>}
            {stacks && <div className=" gap-4 w-full h-4/5 flex flex-col">
                <div className="grid grid-cols-3 gap-4 w-full h-5/6 overflow-y-auto p-2 bg-gray-100 rounded-md border">
                {stacks.map((stack) => (
                    <div key={stack.id} className="flex flex-col items-start justify-between gap-2 bg-white border rounded-md p-4 ">
                        <img src={stack.icon} alt={stack.name} className="w-10 h-10" />
                        <h1 className="text-md font-bold">{stack.name}</h1>
                        <p className="text-sm text-gray-500">{stack.description}</p>
                        <button className="bg-[#1877f2] text-white py-1 px-2 rounded-md cursor-pointer font-bold">Configure</button>
                    </div>
                ))}
                </div>
                <div className=" w-full flex ">
                <button className="bg-[#1877f2] text-white py-2 px-4 rounded-md cursor-pointer font-bold ml-auto" onClick={handleFinishAndLaunchProject}>Finish & Launch Project</button>
            </div>
            </div>}
            
        </div>
    )
}

export default Intigration