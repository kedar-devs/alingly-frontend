import type { ProjectCard } from "../interface/project.interface"

type ProjectDataCardProps = {
  projectCard: ProjectCard
  onVisit?: (id: string) => void
}

function ProjectDataCard({ projectCard, onVisit }: ProjectDataCardProps) {
  const handleVisit = () => onVisit?.(projectCard.project_id)

  return (
    <div className=" w-80 h-80 border rounded-sm border-[#5bd787] text-[#5bd787] flex flex-col justify-center items-center p-5">
      <img src="/project_main.jpg" alt="Project Image" className=" w-full h-1/3 object-cover" />
      <div className=" w-full grid grid-cols-5 gap-y-5">
        <div className=" col-span-2">
            Project Name:
        </div>
        <div className="col-span-3">
          {projectCard.name}
        </div>
        <div className=" col-span-2">
            Project Description:
        </div>
        <div className="col-span-3 ">
          {(projectCard.description?.slice(0, 50) ?? "")}{(projectCard.description?.length ?? 0) > 50 ? "..." : ""}
        </div>
        <button className="w-full h-10 bg-[#5bd787] text-black rounded-md cursor-pointer font-bold" onClick={()=>{
          navigateToProject(projectCard.project_id)
        }
        }>
          Visit
        </button>
      </div>

    </div>
  )
}

export default ProjectDataCard