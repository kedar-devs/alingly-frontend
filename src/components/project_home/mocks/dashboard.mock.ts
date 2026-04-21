import type { DashboardData } from "../interface/dashboard.interface.ts";

export const mockDashboardData: DashboardData = {
  projectName: "Project Alpha - Enterprise Upgrade",
  stats: {
    totalRequirements: 1240,
    totalRequirementsChange: 5,
    activeMisalignments: 12,
    activeMisalignmentsChange: -2,
    approvalRate: 92,
    approvalRateChange: 1,
  },
  alignmentScore: {
    score: 84,
    status: "Good",
    benchmark: 72,
    collaboratingUsers: [
      {
        id: "1",
        name: "Sarah M.",
        avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPTI-arwIlDb8b2GSJ1bhOpAL9ULZXp3aOdFv1DZSujPcamV4yy7DwLqX-5EiElNXt3qYPg120wG7m4jqANShu3ys18CSEiy4Da8ysarv7Pn8CKpCNn-eUYGVZp_efP2yldfAWnEnqke6kBNd53vAa1vG25odw7Qz3jyIIRmtEirEotQaCRe2QVo1g40hSNELbJkPVP9tZYNvpxtVf--rL8ASnYw-C1UHlEn8K_Vs-WYGMXYxHp62rxGp2MEsAY6ikjAvYN5EbT1SS",
      },
      {
        id: "2",
        name: "David Chen",
        avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPfzyHNZj5D4ikEZJM60jhFZJHZoYh_3i1LGghgUBzwuz-fBhI0tN5ydeMJVaEdVk3uK32yR10CV-BGV3gObZv2eFiEA0Hkszy-tP4Gc2EZYZ6n_MoWXJ50WgzK-_az1ti7zC0BvwTsy2aOgZNvPiQa5DxbJw7uVqrbol5TtcomSRaFETm1la2HrrYA6eb0O1YYHppsPx7HfTyQ6WwQyJkMUMoObIkFxPHKlWBYdRVnRSdYoeT_5Mopur2OjJNIGgpaaHvILWkSh01",
      },
      {
        id: "3",
        name: "Marcus Sterling",
      },
      {
        id: "4",
        name: "Emily Johnson",
      },
      {
        id: "5",
        name: "Alex Kumar",
      },
      {
        id: "6",
        name: "Jessica Lee",
      },
    ],
  },
  focusAreas: [
    {
      name: "Technical Specs",
      percentage: 92,
    },
    {
      name: "Business Goals",
      percentage: 78,
    },
    {
      name: "SLA Adherence",
      percentage: 64,
    },
  ],
  workstreams: [
    {
      id: "1",
      name: "Cloud Architecture Migration",
      description: "Mapping legacy databases to AWS instances.",
      status: "Aligned",
      completionPercentage: 100,
      icon: "database",
    },
    {
      id: "2",
      name: "Security & Compliance Audit",
      description: "SLA requirements mismatch in Section 4.2.",
      status: "Needs Attention",
      completionPercentage: 65,
      icon: "security",
    },
    {
      id: "3",
      name: "Third-Party API Integration",
      description: "Endpoint documentation lacks auth schema.",
      status: "At Risk",
      completionPercentage: 32,
      icon: "api",
    },
    {
      id: "4",
      name: "Data Pipeline Optimization",
      description: "Improving ETL processes for better performance.",
      status: "Aligned",
      completionPercentage: 87,
      icon: "database",
    },
  ],
  pendingActions: [
    {
      id: "1",
      title: "Review SLA requirements for Section 4.2",
      assignee: {
        id: "1",
        name: "Sarah M.",
        avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqQL5gysajLo_tMbYWXIpAPEIhm_hQUEYBmgnNb60C7-05VX8xBJVBtu2ARMkqR7jThzkOhD5YzuJG3l-By9t4fP0hW7N3jXhf2fS6DjeR4dww8ZJtBCHdqZSW3626PT3R9OCQoYSpeCGd6wtksJOFhojjIC2gC8KhOZwn5P-Yo0UTL2Wo4D3-al09ntL9oicSKNvRRqxRd5AqHhKUNXMDAR5RMDLHSefRJIFlN2-4OP34PCQMqxOFPGNpv4sn1SZDm2AusjmRHb9Z",
      },
      dueDate: new Date(),
      priority: "high",
    },
    {
      id: "2",
      title: "Approve architectural diagram v2.4",
      assignee: {
        id: "2",
        name: "David Chen",
        avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkoovw_atdQwn4wQRj_ljiVs-OVKD4lig_3Q-HkMZ8YfilLgWfNFqidVo0GzJqszmWC6LEaH3cZYe8B06w4S5dVwgqZEbVmxaDUORvgo9O1veMBxQvV-YiIwcsusgxqlaCru2Fi6dnTVIFH5HIkvEKbGd9yYNSkAFJkG7W53k-X4wQtO7Mgzx1OYPnJuPM4Mgrl-XCCBQMtFkPwoysm8fsudwOgZ8QsLL88XqYPW1ThvK8XO5PRP1VQJk9LOfKpQdJh0z8Ql-fF8gB",
      },
      dueDate: new Date(),
      priority: "medium",
    },
    {
      id: "3",
      title: "Sync meeting with backend engineers",
      assignee: {
        id: "3",
        name: "Marcus Sterling",
      },
      dueDate: new Date(),
      priority: "low",
    },
    {
      id: "4",
      title: "Draft Q4 technical requirements",
      assignee: {
        id: "4",
        name: "Emily Johnson",
        avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAKUck3uhvf2EwIPgD37iWzD2qtU16NUzoHYcLngWoxH-ensW30Mlk6igZoV-I6r1M5g4WyXUZGSrCDQTre8a6REsMBh19CGl20gi6FNGAGX7rY3JYoQQUMvVkFYmXw0RsTS2nqBNoTpVF3Lkqne6kcPUzzbpmrN-R2mlzlm3b03eJ6EUwC4yT55dcip1gooSe3J5HSqLQz9u_4QQOjAaoFAerjO_bGDYjdTO7rieSZQudsOEBVVWxY-TRzE5onCo8kxBhshtZvL30D",
      },
      dueDate: new Date(),
      priority: "low",
    },
  ],
  recentActivities: [
    {
      id: "1",
      type: "comment",
      user: {
        id: "1",
        name: "Sarah M.",
      },
      description: "commented on Security Specs",
      timestamp: new Date(),
      link: "Security Specs",
    },
    {
      id: "2",
      type: "milestone",
      user: {
        id: "2",
        name: "System",
      },
      description: "Project Alpha reached 90% alignment",
      timestamp: new Date(),
    },
    {
      id: "3",
      type: "upload",
      user: {
        id: "2",
        name: "David Chen",
      },
      description: "uploaded ER Diagram v2.4",
      timestamp: new Date(),
      link: "ER Diagram v2.4",
    },
    {
      id: "4",
      type: "update",
      user: {
        id: "3",
        name: "System",
      },
      description: "Requirement #1240 marked as Requires Update",
      timestamp: new Date(),
    },
  ],
  misalignmentsCount: 12,
};
