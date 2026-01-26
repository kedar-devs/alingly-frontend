import { Link, useLocation } from "react-router-dom";
import { MdMenu, MdClose } from "react-icons/md";
import type { SidebarConfig } from "./sidebar.constant";
import { useSidebarStore } from "./sidebar.store";


interface SidebarProps {
  config: SidebarConfig;
  misalignmentsCount?: number;
}

export default function Sidebar({ config, misalignmentsCount = 0 }: SidebarProps) {
  const location = useLocation();

  const { isOpen, toggle } = useSidebarStore();

  const isActive = (path?: string, itemId?: string) => {
    if (path && path !== "#") {
      return location.pathname.includes(path);
    }
    // Check if item is marked as active
    return config.navItems.find(item => item.id === itemId)?.isActive || false;
  };

  const LogoIcon = config.logo.icon;
  if(!isOpen) {
  return (
    <aside className="w-16 border-r border-slate-200 dark:border-slate-800 flex flex-col bg-white dark:bg-slate-900 z-20 transition-all duration-300">
        <div className="p-4 flex items-center justify-center">
          <button
            onClick={toggle}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <MdMenu className="text-xl text-slate-600 dark:text-slate-400" />
          </button>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-1">
          {config.navItems.map((item) => {
            const IconComponent = item.icon;
            const active = isActive(item.path, item.id);
            const badgeCount = item.id === "misalignments" ? misalignmentsCount : item.badge;

            const className = `w-full flex items-center justify-center p-2.5 rounded-lg transition-colors relative ${
              active
                ? "bg-primary text-white"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`;

            const content = (
              <>
                <IconComponent className="text-[22px]" />
                {badgeCount !== undefined && Number(badgeCount) > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-status-red rounded-full"></span>
                )}
              </>
            );

            if (item.path && item.path !== "#") {
              return (
                <Link key={item.id} to={item.path} className={className} title={item.label}>
                  {content}
                </Link>
              );
            }

            return (
              <button key={item.id} onClick={item.onClick} className={className} title={item.label}>
                {content}
              </button>
            );
          })}
        </nav>
        {config.footerAction && (
          <div className="p-2 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={config.footerAction.onClick}
              className="w-full bg-primary text-white p-2.5 rounded-lg flex items-center justify-center hover:bg-primary/90 transition-all"
              title={config.footerAction.label}
            >
              <config.footerAction.icon className="text-lg" />
            </button>
          </div>
        )}
      </aside>
  );
}
return (
  <aside className="w-64 border-r border-slate-200 dark:border-slate-800 flex flex-col bg-white dark:bg-slate-900 z-20 transition-all duration-300">
      <div className="p-6 flex items-center gap-3">
        <button
          onClick={toggle}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <MdClose className="text-xl text-slate-600 dark:text-slate-400" />
        </button>
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
          <LogoIcon className="text-xl" />
        </div>
        <div>
          <h1 className="text-lg font-bold leading-none tracking-tight">{config.logo.title}</h1>
          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mt-1">
            {config.logo.subtitle}
          </p>
        </div>
      </div>
      <nav className="flex-1 px-4 py-4 space-y-1">
        {config.navItems.map((item) => {
          const IconComponent = item.icon;
          const active = isActive(item.path, item.id);
          const badgeCount = item.id === "misalignments" ? misalignmentsCount : item.badge;

          const linkContent = (
            <>
              <IconComponent className="text-[22px]" />
              <span className={`text-sm ${active ? 'font-medium' : 'font-medium'}`}>
                {item.label}
              </span>
              {badgeCount !== undefined && Number(badgeCount) > 0 && (
                <span className="ml-auto bg-status-red/10 text-status-red text-[10px] font-bold px-1.5 py-0.5 rounded">
                  {badgeCount}
                </span>
              )}
            </>
          );

          const className = `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
            active
              ? "bg-primary text-white font-medium"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`;

          if (item.onClick) {
            return (
              <button
                key={item.id}
                onClick={item.onClick}
                className={className}
              >
                {linkContent}
              </button>
            );
          }

          if (item.path && item.path !== "#") {
            return (
              <Link
                key={item.id}
                to={item.path}
                className={className}
              >
                {linkContent}
              </Link>
            );
          }

          return (
            <a
              key={item.id}
              href={item.path || "#"}
              className={className}
            >
              {linkContent}
            </a>
          );
        })}
      </nav>

      {config.footerAction && (
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={config.footerAction.onClick}
            className="w-full bg-primary text-white py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95"
          >
            <config.footerAction.icon className="text-lg" />
            {config.footerAction.label}
          </button>
        </div>
      )}
    </aside>
)
}
