import type { ProjectCard } from "../interface/project.interface"

type ProjectDataCardProps = {
  projectCard: ProjectCard
  onVisit?: (id: string) => void
}

function ProjectDataCard({ projectCard, onVisit }: ProjectDataCardProps) {

  return (
    <div className=" w-80 h-80 border rounded-sm border-[#5bd787] text-[#5bd787] flex flex-col justify-center items-center p-5">
      <img src="/project_main.jpg" alt="Project Image" className=" w-full h-1/3 object-cover border-0 rounder-lg" />
      <div className=" w-full flex flex-col gap-y-5">
        <div className="col-span-3">
          {projectCard.name}
        </div>
        <div className="col-span-3 ">
          {(projectCard.description?.slice(0, 50) ?? "")}{(projectCard.description?.length ?? 0) > 50 ? "..." : ""}
        </div>
        <div className="w-full flex items-center justify-center">
        <button className="w-1/2 h-10 bg-[#5bd787] text-black rounded-md cursor-pointer font-bold" onClick={()=>{
          onVisit?.(projectCard.project_id)
        }
        }>
            Visit
          </button>
        </div>
      </div>

    </div>
  )
}

export default ProjectDataCard