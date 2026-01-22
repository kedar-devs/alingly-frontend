import {  
  MdAddCircle,
  MdEdit,
  MdExpandMore,
  MdSearch,
  MdNotifications,
  MdCalendarToday,
  MdFileDownload,
  MdStorage,
  MdSecurity,
  MdApi
} from "react-icons/md";
import { useParams } from "react-router-dom";
import { useGetDashboardDataQuery } from "../store/api/dashboard.api";
import { useAuthStore } from "../../auth/store/auth.store";
import { useNavigate } from "react-router-dom";
import DashboardCard from "./dashboard/dashboard_card";
import Sidebar from "../../../utils/sidebar/sidebar";
import { defaultSidebarConfig } from "../../../utils/sidebar/sidebar.constant";
import { calculateCircularProgress } from "../../../utils/formatters/number.format";
import { getStatusColor, getProgressColor } from "../../../utils/formatters/color.format";
import AppPaths from "../../../routes/routes.constant";
import ActionCard from "./dashboard/action_card";
import ActivityCard from "./dashboard/activity_card";



// Helper function to get icon component
const getIconComponent = (iconName?: string) => {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    'database': MdStorage,
    'storage': MdStorage,
    'security': MdSecurity,
    'api': MdApi,
  };
  return iconMap[iconName || ''] || MdStorage;
};


function ProjectDashboard() {
  const { projectId } = useParams<{ projectId: string }>();
  const { data: dashboardData, isLoading, error } = useGetDashboardDataQuery(projectId || '');
  const { user } = useAuthStore();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="text-slate-500">Loading dashboard...</div>
      </div>
    );
  }

  if (error || !dashboardData) {
    return (
      <div className="flex h-screen items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="text-status-red">Error loading dashboard data</div>
      </div>
    );
  }

  const { stats, alignmentScore, focusAreas, workstreams, pendingActions, recentActivities, projectName, misalignmentsCount } = dashboardData;
  const { dashArray, dashOffset } = calculateCircularProgress(alignmentScore.score);

  const sidebarConfig = {
    ...defaultSidebarConfig,
    navItems: defaultSidebarConfig.navItems.map(item => ({
      ...item,
      isActive: item.id === "dashboard" // Set active based on current route
    })),
    footerAction: {
      ...defaultSidebarConfig.footerAction!,
      onClick: () => navigate(AppPaths.CREATE_PROJECT)
    }
  };
  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased font-display">
      {/* Sidebar */}
      <Sidebar config={sidebarConfig} misalignmentsCount={misalignmentsCount} />

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-8 z-10">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 group-hover:text-primary transition-colors">
                <MdEdit className="text-lg" />
              </div>
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{projectName}</span>
              <MdExpandMore className="text-slate-400 text-sm" />
            </div>
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800"></div>
            <div className="relative w-64">
              <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
              <input 
                className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg pl-10 pr-4 py-1.5 text-sm focus:ring-1 focus:ring-primary/30 dark:placeholder-slate-500" 
                placeholder="Search requirements..." 
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors">
              <MdNotifications />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-status-red rounded-full border-2 border-white dark:border-slate-900"></span>
            </button>
            <div className="flex items-center gap-3 pl-2">
              <div className="text-right">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-100">{user?.name || 'User'}</p>
                <p className="text-[10px] text-slate-500">{user?.email || 'User'}</p>
              </div>
              <div 
                className="w-9 h-9 rounded-full bg-cover bg-center border border-slate-200 dark:border-slate-700 shadow-sm bg-slate-200" 
                style={(user as any)?.avatarUrl ? { backgroundImage: `url('${(user as any).avatarUrl}')` } : {}}
              ></div>
            </div>
          </div>
        </header>

        {/* Dashboard Content Scrollable */}
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Executive Overview</h2>
              <p className="text-slate-500 text-sm mt-1">Real-time requirement alignment across active workstreams.</p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-slate-50 transition-colors">
                <MdCalendarToday className="text-lg" />
                Last 30 Days
              </button>
              <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-slate-50 transition-colors">
                <MdFileDownload className="text-lg" />
                Export
              </button>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Main Left Column */}
            <div className="col-span-12 lg:col-span-8 space-y-6">
              {/* Top Stats Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DashboardCard title="Total Requirements" value={stats.totalRequirements} change={stats.totalRequirementsChange} />
                <DashboardCard title="Active Misalignments" value={stats.activeMisalignments} change={stats.activeMisalignmentsChange} />
                <DashboardCard title="Approval Rate" value={stats.approvalRate} change={stats.approvalRateChange} />  
              </div>

              {/* Alignment Score Card */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col md:flex-row">
                <div className="p-8 flex-1 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800">
                  <h4 className="text-lg font-bold mb-6">Alignment Score</h4>
                  <div className="flex items-center gap-8">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle 
                          className="text-slate-100 dark:text-slate-800" 
                          cx="50" 
                          cy="50" 
                          fill="none" 
                          r="45" 
                          stroke="currentColor" 
                          strokeWidth="8"
                        ></circle>
                        <circle 
                          className="text-primary" 
                          cx="50" 
                          cy="50" 
                          fill="none" 
                          r="45" 
                          stroke="currentColor" 
                          strokeDasharray={dashArray} 
                          strokeDashoffset={dashOffset} 
                          strokeWidth="8"
                        ></circle>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-black">{alignmentScore.score}%</span>
                        <span className={`text-[10px] font-bold uppercase ${
                          alignmentScore.status === 'Good' ? 'text-status-green' : 
                          alignmentScore.status === 'Fair' ? 'text-status-amber' : 
                          'text-status-red'
                        }`}>{alignmentScore.status}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <p className="text-sm text-slate-500 leading-relaxed">
                        Your project alignment is {alignmentScore.score >= alignmentScore.benchmark ? 'above' : 'below'} the industry benchmark of {alignmentScore.benchmark}% for this phase.
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="flex -space-x-2">
                          {alignmentScore.collaboratingUsers.slice(0, 2).map((user) => (
                            <div 
                              key={user.id}
                              className="w-7 h-7 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 bg-cover" 
                              style={user.avatarUrl ? { backgroundImage: `url('${user.avatarUrl}')` } : {}}
                            ></div>
                          ))}
                          {alignmentScore.collaboratingUsers.length > 2 && (
                            <div className="w-7 h-7 rounded-full border-2 border-white dark:border-slate-900 bg-slate-100 flex items-center justify-center text-[10px] font-bold">
                              +{alignmentScore.collaboratingUsers.length - 2}
                            </div>
                          )}
                        </div>
                        <span className="text-xs font-medium text-slate-400">Collaborating now</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-8 bg-slate-50/50 dark:bg-slate-800/20 w-full md:w-72">
                  <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Focus Areas</h5>
                  <div className="space-y-4">
                    {focusAreas.map((area) => {
                      const isLow = area.percentage < 70;
                      return (
                        <div key={area.name}>
                          <div className="flex justify-between text-xs mb-1.5">
                            <span className="font-medium">{area.name}</span>
                            <span className="text-slate-500">{area.percentage}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${isLow ? 'bg-status-amber' : 'bg-primary'}`} 
                              style={{ width: `${area.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Project Status Grid */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold px-1">Active Workstreams</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {workstreams.map((workstream) => {
                    const IconComponent = getIconComponent(workstream.icon);
                    return (
                      <div 
                        key={workstream.id}
                        className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group cursor-pointer"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg group-hover:bg-primary/10 transition-colors">
                            <IconComponent className="text-slate-400 group-hover:text-primary" />
                          </div>
                          <span className={`px-2 py-1 text-[10px] font-black uppercase rounded ${getStatusColor(workstream.status)}`}>
                            {workstream.status}
                          </span>
                        </div>
                        <h5 className="font-bold text-slate-900 dark:text-white">{workstream.name}</h5>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-1">{workstream.description}</p>
                        <div className="mt-6 flex items-center justify-between">
                          <div className="h-2 w-32 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${getProgressColor(workstream.status)}`} 
                              style={{ width: `${workstream.completionPercentage}%` }}
                            ></div>
                          </div>
                          <span className="text-[10px] font-bold text-slate-400">{workstream.completionPercentage}% Complete</span>
                        </div>
                      </div>
                    );
                  })}
                  {/* Add New Workstream Card */}
                  <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col items-center justify-center opacity-70 cursor-pointer">
                    <MdAddCircle className="text-3xl text-slate-300" />
                    <span className="text-sm font-bold text-slate-400 mt-2">Add New Workstream</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (Contextual Panel) */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              {/* Pending Actions */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-[400px]">
                <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <h4 className="font-bold">Pending Actions</h4>
                  {pendingActions.length > 0 && (
                    <span className="bg-primary text-white text-[10px] font-black px-2 py-0.5 rounded-full">{pendingActions.length}</span>
                  )}
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                  {pendingActions.length === 0 ? (
                    <div className="text-center text-slate-400 text-sm py-8">No pending actions</div>
                  ) : (
                    pendingActions.map((action) => {
                      const borderColor = 
                        action.priority === 'high' ? 'border-status-amber' :
                        action.priority === 'medium' ? 'border-primary' :
                        'border-slate-300 dark:border-slate-600';
                      return (
                        <ActionCard key={action.id} action={action} borderColor={borderColor} />
                      );
                    })
                  )}
                </div>
                <button className="p-3 text-[11px] font-bold text-primary dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors uppercase tracking-widest text-center border-t border-slate-100 dark:border-slate-800">
                  View All Tasks
                </button>
              </div>

              {/* Recent Activity Timeline */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-[400px]">
                <div className="p-5 border-b border-slate-100 dark:border-slate-800">
                  <h4 className="font-bold">Recent Activity</h4>
                </div>
                <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">
                  {recentActivities.length === 0 ? (
                    <div className="text-center text-slate-400 text-sm py-8">No recent activity</div>
                  ) : (
                    recentActivities.map((activity) => {
                      return (
                        <ActivityCard key={activity.id} activity={activity} />
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ProjectDashboard;
