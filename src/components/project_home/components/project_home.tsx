import {  useGetProjectsForUserQuery } from "../store/api/project.api"
import { useAuthStore } from "../../auth/store/auth.store"
import { useNavigate } from "react-router-dom"
import type { ProjectCard } from "../interface/project.interface"
import { useState,useEffect } from "react"
import ProjectDataCard from "./project_card"
function ProjectHome() {
    const { user } = useAuthStore()
    const { data: projects, isLoading, error } = useGetProjectsForUserQuery(user?.id || '0')
    const [projectCards, setProjectCards] = useState<ProjectCard[]>([])
    const [projectLoading, setProjectLoading] = useState(false)
    
    const navigate = useNavigate()
    if(isLoading) return <div className="flex items-center justify-center w-full h-full">Loading...</div>
    if(error) return <div className="flex items-center justify-center w-full h-full">Error: {error.message}</div>
    if(!projects) return <div className="flex items-center justify-center w-full h-full">No projects found</div>
    useEffect(() => {
        if(projects) {
            setProjectCards(projects.map((project) => ({
                project_id: project.id,
                name: project.name,
                description: project.description,
            })))
        }
        setProjectLoading(false)
    }, [projects])
    const navigateToProject = (id: string) => {
        navigate(`/project/${id}`)
    }
  return (
    <div className=" w-full h-full">
        <div className=" w-full h-full flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold">Project Home</h1>
            <div className=" grid grid-cols-4 gap-5">
            {projectCards.map((project) => (
                <div key={project.project_id} className="flex items-center justify-center w-full h-full" onClick={() => navigate(`/project/${project.project_id}`)}>
                    <ProjectDataCard projectCard={project} />
                </div>
            ))}
            {projectLoading && <div className="flex items-center justify-center w-full h-full">Loading...</div>}
            {error && <div className="flex items-center justify-center w-full h-full">Error: {error}</div>}
            <div className="w-96 h-96 border rounded-sm border-[#5bd787] text-[#5bd787] flex justify-center items-center p-5">
                <img src="/project_main.jpg" alt="Project Image" className=" w-2/3" />
                <button className="w-2/3 " onClick={()=>{
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