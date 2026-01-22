import { formatRelativeTime } from "../../../../utils/formatters/time.format";
import type { ActivityItem } from "../../interface/dashboard.interface";
function ActivityCard({ activity }: { activity: ActivityItem }) {
    const getActivityColor = () => {
        switch (activity.type) {
          case 'comment':
            return 'bg-primary';
          case 'milestone':
            return 'bg-status-green';
          case 'upload':
            return 'bg-slate-300';
          case 'update':
            return 'bg-status-amber';
          default:
            return 'bg-slate-300';
        }
      };
    return(
        <div 
            key={activity.id} 
            className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-[2px] before:h-full before:bg-slate-100 dark:before:bg-slate-800 last:before:hidden"
        >
            <div className={`absolute left-[-4px] top-1.5 w-2 h-2 rounded-full ${getActivityColor()} border-4 border-white dark:border-slate-900 ring-1 ring-${getActivityColor()}/20`}></div>
            <p className="text-xs">
            <span className="font-bold">{activity.user.name}</span> {activity.description}
            {activity.link && (
                <span className="text-primary font-medium italic underline decoration-primary/20 cursor-pointer"> {activity.link}</span>
            )}
            </p>
            <p className="text-[10px] text-slate-400 mt-1">{formatRelativeTime(activity.timestamp)}</p>
        </div>
    )

}
export default ActivityCard