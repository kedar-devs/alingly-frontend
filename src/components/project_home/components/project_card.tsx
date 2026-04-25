import { useMemo } from "react"
import type { ProjectCard } from "../interface/project.interface"
import { formatDate } from "../../../utils/formatters/time.format"
import { ProjectStatus } from "../interface/project.interface"

const SPARKLINE_BARS = [
  { bg: "bg-[#1877f2]/20", height: "h-4" },
  { bg: "bg-[#1877f2]/30", height: "h-6" },
  { bg: "bg-[#1877f2]/40", height: "h-5" },
  { bg: "bg-[#1877f2]/50", height: "h-8" },
  { bg: "bg-[#1877f2]/60", height: "h-7" },
  { bg: "bg-[#1877f2]/70", height: "h-9" },
  { bg: "bg-[#1877f2]", height: "h-10" },
] as const

function shuffle<T>(items: readonly T[]): T[] {
  const out = [...items]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j]!, out[i]!]
  }
  return out
}

type ProjectDataCardProps = {
  projectCard: ProjectCard
  onVisit?: (id: string) => void
}

function ProjectDataCard({ projectCard, onVisit }: ProjectDataCardProps) {
  const sparklineBars = useMemo(() => shuffle(SPARKLINE_BARS), [])

  return (
    <div className=" w-full h-80 border rounded-sm shadow-md flex flex-col justify-center gap-y-5 cursor-pointer items-center px-5 py-2" onClick={()=>{
      onVisit?.(projectCard.project_id)
    }}>

      <div className="flex justify-between items-center gap-x-1" >
        <h1 className="text-xl font-bold">
          {projectCard.name}
          </h1>
          <div className={`text-sm p-2 uppercase font-bold rounded-md ${projectCard.status === ProjectStatus.ACTIVE ? 'bg-green-200/50  text-green-600' : 'bg-yellow-200/50 text-yellow-600'}`}>{projectCard.status}</div>
        </div>
      <div className="h-10 w-full flex items-end gap-1 sparkline-container">
        {sparklineBars.map((bar, i) => (
          <div
            key={`${bar.bg}-${bar.height}-${i}`}
            className={`w-full ${bar.bg} ${bar.height} rounded-t-sm`}
          />
        ))}
      </div>
      <div className=" w-full flex flex-col gap-y-5">
        
        <div className="flex flex-col col-span-3 gap-y-4">
          {(projectCard.description?.slice(0, 150) ?? "")}{(projectCard.description?.length ?? 0) > 150 ? "..." : ""}
          <div className=" flex justify-between items-center mt-2">
          <span className="text-sm text-gray-500">Created: {formatDate(projectCard.created_at)}</span>
          <span className="text-sm text-gray-500">Updated: {formatDate(projectCard.updated_at)}</span>
          </div>
        </div>
        
    
      </div>

    </div>
  )
}

export default ProjectDataCard