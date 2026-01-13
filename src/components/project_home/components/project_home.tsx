import {  useGetProjectsForUserQuery } from "../store/api/project.api"
import { useAuthStore } from "../../auth/store/auth.store"
import { useNavigate } from "react-router-dom"
function ProjectHome() {
    const { user } = useAuthStore()
    const { data: projects, isLoading, error } = useGetProjectsForUserQuery(user?.id || '0')
    const navigate = useNavigate()

    if(isLoading) return <div className="flex items-center justify-center w-full h-full">Loading...</div>
    if(error) return <div className="flex items-center justify-center w-full h-full">Error: {error.message}</div>
    if(!projects) return <div className="flex items-center justify-center w-full h-full">No projects found</div>
  return (
    <div className=" w-full h-full">
        <div className=" w-full h-full flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold">Project Home</h1>
            {projects.map((project) => (
                <div key={project.id} className="flex items-center justify-center w-full h-full" onClick={() => navigate(`/project/${project.id}`)}>
                    <h2 className="text-2xl font-bold">{project.name}</h2>
                </div>
            ))}
        </div>
    </div>
  )
}

export default ProjectHome