import { 
    MdDashboard, 
    MdFolder, 
    MdError, 
    MdTaskAlt, 
    MdInsights,
    MdAddCircle,
    MdLayers
  } from "react-icons/md";
  import type { IconType } from "react-icons";
  import AppPaths from "../../routes/routes.constant";
  
  export interface SidebarNavItem {
    id: string;
    label: string;
    icon: IconType;
    path?: string;
    badge?: number | string;
    isActive?: boolean;
    onClick?: () => void;
  }
  
  export interface SidebarConfig {
    logo: {
      icon: IconType;
      title: string;
      subtitle: string;
    };
    navItems: SidebarNavItem[];
    footerAction?: {
      label: string;
      icon: IconType;
      onClick: () => void;
    };
  }
  
  export const defaultSidebarConfig: SidebarConfig = {
    logo: {
      icon: MdLayers,
      title: "Alignly",
      subtitle: "Enterprise SaaS"
    },
    navItems: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: MdDashboard,
        path: "#",
        isActive: true
      },
      {
        id: "projects",
        label: "Projects",
        icon: MdFolder,
        path: AppPaths.PROJECT_HOME
      },
      {
        id: "misalignments",
        label: "Misalignments",
        icon: MdError,
        path: "#"
      },
      {
        id: "approvals",
        label: "Approvals",
        icon: MdTaskAlt,
        path: "#"
      },
      {
        id: "insights",
        label: "Insights",
        icon: MdInsights,
        path: "#"
      }
    ],
    footerAction: {
      label: "New Project",
      icon: MdAddCircle,
      onClick: () => {} // Will be set dynamically
    }
  };