import RequirementTable from "./utils/requirment_tables"
import { useGetRequirementsQuery } from "../store/api/requirment.api"
import { useParams } from "react-router-dom"

function RequirementPage() {
  const { projectId } = useParams<{ projectId: string }>()
  const { data: requirements, isLoading, error } = useGetRequirementsQuery(projectId || "")

  return (
    <div className="w-full h-full p-10">
      <div className="w-full flex flex-col items-start justify-start gap-1">
        <h1 className="text-2xl font-bold">Project Requirement Directory</h1>
        <span className="text-sm text-gray-500">Manage and track all your project requirements here</span>
      </div>
      <div className="w-full flex flex-row items-start justify-start gap-1">
        <RequirementTable data={requirements || []} onVisitRequirement={() => {}} />
      </div>
    </div>
  )
}

export default RequirementPage