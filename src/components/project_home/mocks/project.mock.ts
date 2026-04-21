import type { Project } from "../interface/project.interface";
import type { Stack } from "../interface/project.interface";

export const projects: Project[] = [
  {
    id: "1",
    name: "Enterprise Alignment Initiative",
    description: "Strategic project to align business requirements across departments and ensure compliance with organizational goals.",
    organization_id: "org-1",
    users: ["user-1", "user-2", "user-3"],
    requirements: ["req-1", "req-2", "req-3", "req-4"],
    created_at: "2025-01-15T09:00:00.000Z",
    updated_at: "2025-02-01T14:30:00.000Z",
  },
  {
    id: "2",
    name: "Digital Transformation Roadmap",
    description: "End-to-end digital transformation program covering process automation, data migration, and stakeholder alignment.",
    organization_id: "org-1",
    users: ["user-1", "user-4", "user-5"],
    requirements: ["req-5", "req-6", "req-7"],
    created_at: "2025-01-20T10:15:00.000Z",
    updated_at: "2025-01-31T11:00:00.000Z",
  },
  {
    id: "3",
    name: "Compliance & Governance Framework",
    description: "Centralized compliance tracking and governance framework to meet regulatory requirements and audit standards.",
    organization_id: "org-2",
    users: ["user-2", "user-6", "user-7", "user-8"],
    requirements: ["req-8", "req-9", "req-10", "req-11", "req-12"],
    created_at: "2025-01-10T08:00:00.000Z",
    updated_at: "2025-02-02T09:45:00.000Z",
  },
  {
    id: "4",
    name: "Customer Experience Alignment",
    description: "Unify customer-facing requirements across sales, support, and product teams for a consistent experience.",
    organization_id: "org-1",
    users: ["user-3", "user-4", "user-9"],
    requirements: ["req-13", "req-14"],
    created_at: "2025-01-25T13:00:00.000Z",
    updated_at: "2025-01-30T16:20:00.000Z",
  },
  {
    id: "5",
    name: "Technical Debt & Modernization",
    description: "Track and prioritize technical debt items alongside new feature requirements for balanced delivery.",
    organization_id: "org-2",
    users: ["user-5", "user-6", "user-10"],
    requirements: ["req-15", "req-16", "req-17", "req-18"],
    created_at: "2025-01-18T11:30:00.000Z",
    updated_at: "2025-02-01T12:00:00.000Z",
  },
];

export const stacks: Stack[] = [
  {
    id: "1",
    name: "Slack",
    description: "Real-time messaging and collaboration platform",
    icon: "https://slack.com/img/icons/favicon-32x32.png",
  },
  {
    id: "2",
    name: "Google Workspace",
    description: "Google's suite of productivity tools",
    icon: "https://www.google.com/img/icons/favicon-32x32.png",
  },
  {
    id: "3",
    name: "Microsoft Teams",
    description: "Microsoft's team collaboration platform",
    icon: "https://teams.microsoft.com/img/favicon.ico",
  },
  {
    id: "4",
    name: "Jira",
    description: "Jira is a project management tool",
    icon: "https://www.atlassian.com/img/icons/favicon-32x32.png",
  },
  {
    id: "5",
    name: "Trello",
    description: "Trello is a project management tool",
    icon: "https://trello.com/img/favicon-32x32.png",
  },
];