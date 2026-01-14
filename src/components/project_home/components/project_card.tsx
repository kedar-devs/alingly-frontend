import AppPaths from "../../../routes/routes.constant"
import type { ProjectCard } from "../interface/project.interface"
import { useNavigate } from "react-router-dom"

function ProjectDataCard({ project_id, name, description }: ProjectCard) {
  const navigator=useNavigate()
  const navigateToProject=(id:string)=>{
    navigator(AppPaths.LOGIN)
  }
  return (
    <div className=" w-64 h-92 border rounded-sm border-[#5bd787] text-[#5bd787] flex justify-center items-center p-5">
      <img src="/project_main.jpg" alt="Project Image" className=" w-2/3" />
      <div className=" w-full grid grid-cols-5 gap-y-5">
        <div className=" col-span-2">
            Project Name:
        </div>
        <div className="col-span-3">
          {name}
        </div>
        <div className=" col-span-2">
            Project Description:
        </div>
        <div className="col-span-3">
          {description}
        </div>
        <button className="w-2/3 " onClick={()=>{
          navigateToProject(project_id)
        }
        }>
          Visit
        </button>
      </div>

    </div>
  )
}

export default ProjectDataCard