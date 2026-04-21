import { useState } from "react"
import { useGetProjectsForUserQuery } from "../store/api/project.api"
import { useAuthStore } from "../../auth/store/auth.store"
import { useNavigate } from "react-router-dom"
import ProjectDataCard from "./project_card"
import ProjectTable from "./project_table"
import AppPaths from "../../../routes/routes.constant"
import { MdAddCircle } from "react-icons/md"
import { MdViewModule, MdTableRows } from "react-icons/md"

type ViewTab = "table" | "cards"

function ProjectHome() {
    const [activeTab, setActiveTab] = useState<ViewTab>("table")
    const { user } = useAuthStore()
    const { data: projects, isLoading, error } = useGetProjectsForUserQuery(user?.id || "user-1")
    const navigate = useNavigate()

    const projectCards = (projects ?? []).map((project) => ({
        project_id: project.id,
        name: project.name,
        description: project.description,
    }))

    const navigateToProject = (id: string) => {
        if (id === "0") {
            navigate(AppPaths.CREATE_PROJECT)
            return
        }
        navigate(`${AppPaths.PROJECT_DASHBOARD}/${id}`)
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
                        className="bg-[#5bd787] text-black p-2 rounded-md cursor-pointer font-bold flex flex-row items-center justify-center gap-2"
                        onClick={() => navigateToProject("0")}
                    >
                        <MdAddCircle className="text-lg" />
                        Create Project
                    </button>
                </div>
            </div>

            <div className="mt-6 flex gap-1 border-b border-gray-200">
                <button
                    type="button"
                    className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-md transition-colors ${
                        activeTab === "table"
                            ? "bg-gray-100 text-[#5bd787] border-b-2 border-[#5bd787] -mb-px"
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
                            ? "bg-gray-100 text-[#5bd787] border-b-2 border-[#5bd787] -mb-px"
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
                        data={projects ?? []}
                        onVisitProject={navigateToProject}
                    />
                )}
                {!isLoading && !error && activeTab === "cards" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {projectCards.map((card) => (
                            <ProjectDataCard
                                key={card.project_id}
                                projectCard={card}
                                onVisit={navigateToProject}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
export default ProjectHome