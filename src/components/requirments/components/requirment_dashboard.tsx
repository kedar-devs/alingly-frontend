import AllRequirment from "./utils/all_requirment";
import CurrentRequirment from "./utils/current_requirment";
import { useState } from "react";
import { useParams } from "react-router-dom";
import RequiremetHeader from "./requiremet_header";

function RequirementDashboard() {
  const { requirementId } = useParams<{ requirementId: string }>();
  const [currentRequirementId,setCurrentRequirementId]=useState<string | null>(requirementId || null)

  const handleRequirementChange=(requirementId:string)=>{
    setCurrentRequirementId(requirementId)
}
  return (
    <div className="w-full h-full flex flex-col items-start justify-start gap-y-10">
      <RequiremetHeader title="Requirement Editor" content="Edit and manage your requirements here" sideButtons={<button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer">History</button>} />
      <div className=" w-full h-full grid grid-cols-4">
        <div className="col-span-1 h-full">
            <AllRequirment handleRequirementChange={handleRequirementChange} />
        </div>
        <div className="col-span-3">
            <CurrentRequirment currentRequirementId={currentRequirementId || ''} />
        </div>

    </div>
    </div>
  )
}

export default RequirementDashboard