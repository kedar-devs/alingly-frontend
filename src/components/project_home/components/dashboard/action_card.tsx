import type{ PendingAction } from "../../interface/dashboard.interface";
import { formatRelativeTime } from "../../../../utils/formatters/time.format";

function ActionCard({ action, borderColor }: { action: PendingAction, borderColor: string }) {
  return (
    <div key={action.id} className={`p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border-l-4 ${borderColor}`}>
        <p className="text-xs font-bold leading-tight">{action.title}</p>
        <div className="mt-2 flex items-center gap-2">
        <div 
            className="w-5 h-5 rounded-full bg-cover bg-slate-200" 
            style={action.assignee.avatarUrl ? { backgroundImage: `url('${action.assignee.avatarUrl}')` } : {}}
        ></div>
        <span className="text-[10px] font-medium text-slate-400">{formatRelativeTime(action.dueDate)}</span>
        </div>
    </div>
  )
}

export default ActionCard