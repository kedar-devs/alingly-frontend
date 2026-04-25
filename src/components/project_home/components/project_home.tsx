import { useState, useEffect } from "react"
import { useGetProjectsForUserQuery } from "../store/api/project.api"
import { useAuthStore } from "../../auth/store/auth.store"
import { useNavigate } from "react-router-dom"
import ProjectDataCard from "./project_card"
import ProjectTable from "./project_table"
import AppPaths from "../../../routes/routes.constant"
import { MdAddCircle } from "react-icons/md"
import { MdViewModule, MdTableRows } from "react-icons/md"
import type { Project, ProjectCard } from "../interface/project.interface"
import { ProjectStatus } from "../interface/project.interface"

type ViewTab = "table" | "cards"


function ProjectHome() {
    const [activeTab, setActiveTab] = useState<ViewTab>("table")
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
    const [FilteredProjectCards, setFilteredProjectCards] = useState<ProjectCard[]>([])
    const { user } = useAuthStore()
    const [activeFilter, setActiveFilter] = useState<string>("all")

    const { data: projects, isLoading, error } = useGetProjectsForUserQuery(user?.id || "user-1")
    const navigate = useNavigate()

    const projectCards = (projects ?? []).map((project) => ({
        project_id: project.id,
        name: project.name,
        description: project.description,
        status: project.status,
        created_at: project.created_at,
        updated_at: project.updated_at,
    }))

    useEffect(() => {
        const filteredProjects = handleProjectFilter(activeFilter)
        const filteredProjectCards = filteredProjects?.map((project) => ({
            project_id: project.id,
            name: project.name,
            description: project.description,
            status: project.status,
            created_at: project.created_at,
            updated_at: project.updated_at,
        }))
        setFilteredProjects(filteredProjects ?? [])
        setFilteredProjectCards(filteredProjectCards ?? [])
    }, [activeFilter])

    const handleProjectFilter = (filter: string) => {
        switch (filter) {
            case "all":
                return projects ?? []
            case "active":
                return projects?.filter((project) => project.status === ProjectStatus.ACTIVE) ?? []
            case "archived":
                return projects?.filter((project) => project.status === ProjectStatus.ARCHIVED) ?? []
        }
    }

    return (
        <div className="w-full h-full px-10 py-5">
            <div className="w-full flex flex-row items-start justify-between">
                <div className="w-1/2 flex flex-col items-start justify-center gap-1">
                    <h1 className="text-2xl font-bold">Project Home</h1>
                    <span className="text-sm text-gray-500">Manage and track all your projects here</span>
                </div>
                <div className="w-1/2 flex items-end justify-end ml-auto">
                    <button
                        className="bg-[#1877f2] text-white py-2 px-4 rounded-md cursor-pointer font-bold flex flex-row items-center justify-center gap-2"
                        onClick={() => navigate(AppPaths.CREATE_PROJECT)}
                    >
                        <MdAddCircle className="text-lg" />
                         New Project
                    </button>
                </div>
            </div>
            <div className="w-full flex flex-row items-start border-b-2 border-gray-200 gap-x-4 mt-4">
                <button type="button" className={` flex items-center gap-2 px-4 py-2.5 text-sm font-bold rounded-t-md transition-colors ${activeFilter === "all" ? "bg-gray-100 text-[#1877f2] border-b-0 border-[#1877f2] -mb-px" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`} onClick={() => setActiveFilter("all")}>
                    All Projects
                </button>
                <button type="button" className={` flex items-center gap-2 px-4 py-2.5 text-sm font-bold rounded-t-md transition-colors ${activeFilter === "active" ? "bg-gray-100 text-[#1877f2] border-b-0 border-[#1877f2] -mb-px" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`} onClick={() => setActiveFilter("active")}> 
                    Active Projects    
                </button>
                <button type="button" className={` flex items-center gap-2 px-4 py-2.5 text-sm font-bold rounded-t-md transition-colors ${activeFilter === "archived" ? "bg-gray-100 text-[#1877f2] border-b-0 border-[#1877f2] -mb-px" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`} onClick={() => setActiveFilter("archived")}>
                    Archived Projects
                </button>
            </div>

            <div className="mt-4 flex gap-1 border border-gray-200 bg-white rounded-md p-2">
                <button
                    type="button"
                    className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-md transition-colors ${
                        activeTab === "table"
                            ? "bg-gray-100 text-[#1877f2] border-b-0 border-[#1877f2] -mb-px"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                    onClick={() => setActiveTab("table")}
                >
                    <MdTableRows className="text-lg" />
                    Table view
                </button>
                <button
                    type="button"
                    className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-md transition-colors ${
                        activeTab === "cards"
                            ? "bg-gray-100 text-[#1877f2] border-b-0 border-[#1877f2] -mb-px"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                    onClick={() => setActiveTab("cards")}
                >
                    <MdViewModule className="text-lg" />
                    Card view
                </button>
            </div>

            <div className="mt-4">
                {isLoading && (
                    <div className="py-8 text-center text-gray-500">Loading projects...</div>
                )}
                {error && (
                    <div className="py-8 text-center text-red-600">Failed to load projects.</div>
                )}
                {!isLoading && !error && activeTab === "table" && (
                    <ProjectTable
                        data={filteredProjects ?? []}
                        onVisitProject={(id) => navigate(`${AppPaths.PROJECT_DASHBOARD}/${id}`)}
                    />
                )}
                {!isLoading && !error && activeTab === "cards" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 p-5">
                        {FilteredProjectCards.map((card) => (
                            <ProjectDataCard
                                key={card.project_id}
                                projectCard={card}
                                onVisit={(id) => navigate(`${AppPaths.PROJECT_DASHBOARD}/${id}`)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
export default ProjectHome