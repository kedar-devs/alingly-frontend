import {  useGetProjectsForUserQuery } from "../store/api/project.api"
import { useAuthStore } from "../../auth/store/auth.store"
import { useNavigate } from "react-router-dom"
import type { ProjectCard } from "../interface/project.interface"
import { useState,useEffect } from "react"
import ProjectDataCard from "./project_card"
import AppPaths from "../../../routes/routes.constant"
function ProjectHome() {
    const { user } = useAuthStore()
    const { data: projects, isLoading, error } = useGetProjectsForUserQuery(user?.id || '0')
    const [projectCards, setProjectCards] = useState<ProjectCard[]>([])
    const [projectLoading, setProjectLoading] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        if(isLoading) {
            setProjectLoading(true)
            return
        }
        if(projects) {
            setProjectCards(projects.map((project) => ({
                project_id: project.id,
                name: project.name,
                description: project.description,
            })))
        }
        setProjectLoading(false)
    }, [projects,isLoading])

    const navigateToProject = (id: string) => {
        if(id === '0') {
            navigate(AppPaths.CREATE_PROJECT)
            return
        }
        navigate(`/project/${id}`)
    }
  return (
    <div className=" w-full h-full">
        <div className=" w-full h-full flex flex-col">
            <div className="w-full flex flex-col items-start justify-start">
            <h1 className="text-4xl font-bold">Project Home</h1>
            </div>
            <div className="w-full grid grid-cols-4 gap-5 mt-5">
            {projectCards.map((project) => (
                <div key={project.project_id} className="flex items-center justify-center w-full h-full" onClick={() => navigate(`/project/${project.project_id}`)}>
                    <ProjectDataCard projectCard={project} />
                </div>
            ))}
            {projectLoading && <div className="flex items-center justify-center w-full h-full">Loading...</div>}
            <div className="w-80 h-80 border rounded-sm border-[#5bd787] text-[#5bd787] flex flex-col justify-center items-center p-5 gap-5">
                <img src="/project_main.jpg" alt="Project Image" className=" w-full h-full object-cover" />
                <button className="w-full h-10 bg-[#5bd787] text-black rounded-md cursor-pointer font-bold" onClick={()=>{
                    navigateToProject('0')
                }
                }>
                    Create Project
                </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProjectHome