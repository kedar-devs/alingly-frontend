import RequirementTable from "./utils/requirment_tables"

function RequirementPage() {
  return (
    <div className="w-full h-full p-10">
      <div className="w-full flex flex-col items-start justify-start gap-1">
        <h1 className="text-2xl font-bold">Project Requirement Directory</h1>
        <span className="text-sm text-gray-500">Manage and track all your project requirements here</span>
      </div>
      <div className="w-full flex flex-row items-start justify-start gap-1">
        <RequirementTable data={[]} onVisitRequirement={() => {}} />
      </div>
    </div>
  )
}

export default RequirementPage