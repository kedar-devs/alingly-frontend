import AllRequirment from "./utils/all_requirment";
import CurrentProject from "./utils/current_project";
import { useState } from "react";
import { useParams } from "react-router-dom";

function RequirementDashboard() {
  const { requirementId } = useParams<{ requirementId: string }>();
  const [currentRequirementId,setCurrentRequirementId]=useState<string | null>(requirementId || null)

  const handleRequirementChange=(requirementId:string)=>{
    setCurrentRequirementId(requirementId)
}
  return (
    <div className=" w-full h-full py-10 grid grid-cols-3">
        <div className="col-span-1">
            <AllRequirment handleRequirementChange={handleRequirementChange} />
        </div>
        <div className="col-span-2">
            <CurrentProject currentRequirementId={currentRequirementId || ''} />
        </div>

    </div>
  )
}

export default RequirementDashboard