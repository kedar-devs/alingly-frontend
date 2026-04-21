export type DashboardStats = {
  totalRequirements: number;
  totalRequirementsChange: number; // percentage change
  activeMisalignments: number;
  activeMisalignmentsChange: number; // percentage change
  approvalRate: number; // percentage
  approvalRateChange: number; // percentage change
}

export type AlignmentScore = {
  score: number; // percentage (0-100)
  status: 'Good' | 'Fair' | 'Poor'; // status label
  benchmark: number; // industry benchmark percentage
  collaboratingUsers: CollaboratingUser[];
}

export type CollaboratingUser = {
  id: string;
  name: string;
  avatarUrl?: string;
}

export type FocusArea = {
  name: string; // e.g., "Technical Specs", "Business Goals", "SLA Adherence"
  percentage: number; // 0-100
}

export type Workstream = {
  id: string;
  name: string;
  description: string;
  status: 'Aligned' | 'Needs Attention' | 'At Risk';
  completionPercentage: number; // 0-100
  icon?: string; // icon identifier
}

export type PendingAction = {
  id: string;
  title: string;
  assignee: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  dueDate: Date; // ISO date string or relative time
  priority: 'high' | 'medium' | 'low';
}

export type ActivityItem = {
  id: string;
  type: 'comment' | 'milestone' | 'upload' | 'update';
  user: {
    id: string;
    name: string;
  };
  description: string;
  timestamp: Date; // ISO date string or relative time
  link?: string; // optional link to related item
}

export type DashboardData = {
  projectName: string;
  stats: DashboardStats;
  alignmentScore: AlignmentScore;
  focusAreas: FocusArea[];
  workstreams: Workstream[];
  pendingActions: PendingAction[];
  recentActivities: ActivityItem[];
  misalignmentsCount: number; // for sidebar badge
}
