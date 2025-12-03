import React from "react";
import { Icon } from "@iconify/react";

const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    icon: React.createElement(Icon, {
      icon: "solar:widget-4-bold",
      className: "w-6 h-6",
    }),
    url: "/dashboard",
    children: [],
    allowedRoles: ["admin", "hr_manager", "supervisor"],
  },
  {
    title: "Projects Management",
    icon: React.createElement(Icon, {
      icon: "",
      className: "w-6 h-6",
    }),
    allowedRoles: ["admin", "hr_manager", "supervisor"],
    children: [
      {
        title: "Projects",
        url: "/dashboard/projects",
        allowedRoles: ["admin", "hr_manager", "supervisor"],
        icon: React.createElement(Icon, {
          icon: "solar:settings-linear",
          className: "w-6 h-6",
        }),
      },
       {
        title: "Categories",
        url: "/dashboard/project-categories",
        allowedRoles: ["admin","supervisor"],
        icon: React.createElement(Icon, {
          icon: "solar:tag-linear",
          className: "w-6 h-6",
        }),
      },
      
    ],

  },


  {
    title: "Work Management",
    icon: React.createElement(Icon, {
      icon: "",
      className: "w-6 h-6",
    }),
    children: [
      {
        title: "Task Assignments",
        url: "/dashboard/tasks",
        allowedRoles: ["admin", "employee"],
        icon: React.createElement(Icon, {
          icon: "solar:clipboard-list-linear",
          className: "w-6 h-6",
        }),
      },

      {
        title: "Shift Scheduling",
        url: "/dashboard/shift-scheduling",
        icon: React.createElement(Icon, {
      icon: "solar:calendar-mark-outline",
          className: "w-6 h-6",
        }),
        allowedRoles: ["admin", "employee"],
      },
      {
        title: "Performance Analytics",
        url: "/dashboard/performance-analytics",
        icon: React.createElement(Icon, {
          icon: "solar:chart-bold-duotone",
          className: "w-6 h-6",
        }),
        allowedRoles: ["admin",],
      },

        {
        title: "Reports ",
        url: "/dashboard/work-reports",
        icon: React.createElement(Icon, {
          icon: "solar:book-outline",
          className: "w-6 h-6",
        }),
        allowedRoles: ["admin",],
      },
    ],
    allowedRoles: ["admin", "employee", "hr_manager"],
  },

   {
    title: "Time & Attendance",
    icon: React.createElement(Icon, {
      icon: "",
      className: "w-6 h-6",
    }),
    children: [
      {
        title: "Geofence Attendance",
        url: "/dashboard/geofence-attendance",
        icon: React.createElement(Icon, {
          icon: "solar:earth-linear",
          className: "w-6 h-6",
        }),
        allowedRoles: ["admin", "employee", "hr_manager"],
      },

        {
        title: "Attendance Reports ",
        url: "/dashboard/attendance-reports",
        icon: React.createElement(Icon, {
          icon: "solar:book-outline",
          className: "w-6 h-6",
        }),
        allowedRoles: ["admin", "employee", "hr_manager"],
      },

     
    ],
    allowedRoles: ["admin", "employee", "hr_manager"],
  },

  {
    title: "Leave Management",
    icon: React.createElement(Icon, {
      icon: "",
      className: "w-6 h-6",
    }),
    children: [
      {
        title: "Leave Applications",
        url: "/dashboard/leave-applications",
        allowedRoles: ["admin", "hr_manager"],
        icon: React.createElement(Icon, {
          icon: "solar:calendar-linear",
          className: "w-6 h-6",
        }),
      },
      {
        title: "Leave Types",
        url: "/dashboard/leave-types",
        allowedRoles: ["admin", "hr_manager"],
        icon: React.createElement(Icon, {
          icon: "solar:tag-linear",
          className: "w-6 h-6",
        }),
      },

      // {
      //   title: "Leave Policies",
      //   url: "/dashboard/leave-policies",
      //   icon: React.createElement(Icon, {
      //     icon: "solar:letter-opened-linear",
      //     className: "w-6 h-6",
      //   }),
      //   allowedRoles: ["admin", "employee", "hr_manager"],
      // },
    ],
    allowedRoles: ["admin", "hr_manager", "supervisor", "employee"],
  },

    {
    title: "Organization & Employees",
    icon: React.createElement(Icon, {
      icon: "",
      className: "w-6 h-6",
    }),

    allowedRoles: ["admin", "hr_manager", "supervisor"],
    children: [
      {
        title: "Departments",
        url: "/dashboard/departments",
        allowedRoles: ["admin", "hr_manager"],
        icon: React.createElement(Icon, {
          icon: "solar:buildings-linear",
          className: "w-6 h-6",
        }),
      },

      {
        title: "Branches",
        url: "/dashboard/branches",
        allowedRoles: ["admin"],
        icon: React.createElement(Icon, {
          icon: "tabler:binary-tree-2",
          className: "w-6 h-6",
        }),
      },

      {
        title: "Units",
        url: "/dashboard/units",
        allowedRoles: ["admin" ],
        icon: React.createElement(Icon, {
          icon: "solar:home-angle-2-linear",
          className: "w-6 h-6",
        }),
      },

      {
        title: "Employees",
        url: "/dashboard/employees",
        allowedRoles: ["admin", "hr_manager"],
        icon: React.createElement(Icon, {
          icon: "solar:users-group-rounded-linear",
          className: "w-6 h-6",
        }),
      },

    ],
  },

  {
    title: "Recruitment & Onboarding",
    icon: React.createElement(Icon, {
      icon: "",
      className: "w-6 h-6",
    }),
       
    children: [
      {
        title: "Job Requisitions",
        url: "/dashboard/job-requisitions",
        allowedRoles: ["admin", "hr_manager"],
        icon: React.createElement(Icon, {
          icon: "solar:plaaylist-minimalistic-broken",
          className: "w-6 h-6",
        }),
      },
      {
        title: "Job Postings",
        url: "/dashboard/job-postings",
        allowedRoles: ["admin", "hr_manager"],
        icon: React.createElement(Icon, {
          icon: "solar:map-arrow-square-line-duotone",
          className: "w-6 h-6",
        }),
      },
      {
        title: "Evaluation Criteria",
        url: "/dashboard/evaluation-criteria",
        allowedRoles: ["admin", "hr_manager"],
        icon: React.createElement(Icon, {
          icon: "solar:clipboard-check-linear",
          className: "w-6 h-6",
        }),
      },
      {
        title: "Applications",
        url: "/dashboard/applications",
        allowedRoles: ["admin", "hr_manager"],
        icon: React.createElement(Icon, {
          icon: "solar:checklist-minimalistic-outline",
          className: "w-6 h-6",
        }),
      },

      {
        title: "Interview evaluations",
        url: "/dashboard/interview-evaluations",
        allowedRoles: ["admin", "hr_manager"],
        icon: React.createElement(Icon, {
          icon: "solar:user-speak-rounded-linear",
          className: "w-6 h-6",
        }),
      },

      {
        title: "Onboarding tasks",
        url: "/dashboard/onboarding-tasks",
        allowedRoles: ["admin", "hr_manager"],
        icon: React.createElement(Icon, {
          icon: "solar:list-up-minimalistic-broken",
          className: "w-6 h-6",
        }),
      },

      {
        title: "Probation Records",
        url: "/dashboard/probation-records",
        allowedRoles: ["admin", "hr_manager"],
        icon: React.createElement(Icon, {
          icon: "solar:notebook-broken",
          className: "w-6 h-6",
        }),
      },
    ],
    allowedRoles: ["admin", "hr_manager", "supervisor"],
  },

   {
    title: "Assets & Inventory",
    icon: React.createElement(Icon, {
      icon: "",
      className: "w-6 h-6",
    }),
    children: [
      {
        title: "All assets",
        url: "/dashboard/assets",
        allowedRoles: ["admin"],
        icon: React.createElement(Icon, {
          icon: "solar:laptop-linear",
          className: "w-6 h-6",
        }),
      },
      {
        title: "Asset Requests and Approvals",
        url: "/dashboard/asset-requests",
        icon: React.createElement(Icon, {
          icon: "solar:map-arrow-square-linear",
          className: "w-6 h-6",
        }),
        allowedRoles: ["admin",],
      },
      {
        title: "Asset categories",
        url: "/dashboard/asset-categories",
        icon: React.createElement(Icon, {
          icon: "solar:layers-linear",
          className: "w-6 h-6",
        }),
        allowedRoles: ["admin",],
      },
    ],
    allowedRoles: ["admin"],
  },

    {
    title: "Users  & Roles",
    icon: React.createElement(Icon, {
      icon: "",
      className: "w-6 h-6",
    }),
    children: [
      {
        title: "All users",
        url: "/dashboard/users",
        allowedRoles: ["admin"],
        icon: React.createElement(Icon, {
          icon: "solar:users-group-rounded-linear",
          className: "w-6 h-6",
        }),
      },
      {
        title: "Roles & Permissions",
        url: "/dashboard/roles&permissions",
        icon: React.createElement(Icon, {
          icon: "solar:lock-keyhole-linear",
          className: "w-6 h-6",
        }),
        allowedRoles: ["admin",],
      },
    ],
    allowedRoles: ["admin"],
  },

 {
    title: "Help & Support",
    icon: React.createElement(Icon, {
      icon: "",
      className: "w-6 h-6",
    }),
    children: [

      {
        title: "Issues & Tickets",
        url: "/dashboard/issues-tickets",
        icon: React.createElement(Icon, {
          icon: "solar:ticket-sale-linear",
          className: "w-6 h-6",
        }),
        allowedRoles: ["admin",],
      },
      {
        title: "Help-desk categories",
        url: "/dashboard/help-desk-categories",
        icon: React.createElement(Icon, {
          icon: "solar:help-linear",
          className: "w-6 h-6",
        }),
        allowedRoles: ["admin",],
      },
    ],
    allowedRoles: ["admin"],
  },

] as const;

export type SidebarItem = {
  title: string;
  icon?: React.ReactNode;
  url?: string;
  position?: "top" | "bottom";
  allowedRoles: string[];
  roles?: string[];
  children?: SidebarItem[];
};

export default sidebarItems;
