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
    allowedRoles: ["admin", "hr_manager", "supervisor", "employee"],
  },
  {
    title: "Projects",
    icon: React.createElement(Icon, {
      icon: "solar:settings-bold",
      className: "w-6 h-6",
    }),
    children: [
      {
        title: "All Projects",
        url: "/dashboard/all-projects",
        allowedRoles: ["admin", "hr_manager", "supervisor", "employee"],
      },
      {
        title: "Pending Projects",
        url: "/dashboard/pending-projects",
        allowedRoles: ["admin", "hr_manager", "supervisor", "employee"],
      },
      {
        title: "In Progress Projects",
        url: "/dashboard/in-progress-projects",
        allowedRoles: ["admin", "hr_manager", "supervisor", "employee"],
      },
      {
        title: "Completed Projects",
        url: "/dashboard/completed-projects",
        allowedRoles: ["admin", "hr_manager", "supervisor", "employee"],
      },
    ],
    allowedRoles: ["admin", "hr_manager", "supervisor", "employee"],
  },

  {
    title: "Employees",
    icon: React.createElement(Icon, {
      icon: "solar:users-group-rounded-bold",
      className: "w-6 h-6",
    }),
    url: "/dashboard/employees",
    children: [],
    allowedRoles: ["admin", "hr_manager", "supervisor", "employee"],
  },

   {
    title: "Tickets",
    icon: React.createElement(Icon, {
      icon: "solar:users-group-rounded-bold",
      className: "w-6 h-6",
    }),
    children: [],
    url: "/dashboard/tickets",
    allowedRoles: ["admin", "hr_manager", "supervisor", "employee"],
  },

   {
    title: "Tasks",
    icon: React.createElement(Icon, {
      icon: "solar:users-group-rounded-bold",
      className: "w-6 h-6",
    }),
    children: [
      {
        title: "All Employees",
        url: "/dashboard/all-employees",
        allowedRoles: ["admin", "hr_manager", "supervisor", "employee"],
      },
      {
        title: "On Leave",
        url: "/dashboard/on-leave-employees",
        allowedRoles: ["admin", "hr_manager", "supervisor", "employee"],
      },
    ],
    allowedRoles: ["admin", "hr_manager", "supervisor", "employee"],
  },

   {
    title: "Holidays",
    icon: React.createElement(Icon, {
      icon: "solar:users-group-rounded-bold",
      className: "w-6 h-6",
    }),
    allowedRoles: ["admin", "hr_manager", "supervisor", "employee"],
    children: [
      {
        title: "All Employees",
        url: "/dashboard/all-employees",
        allowedRoles: ["admin", "hr_manager", "supervisor", "employee"],
      },
      {
        title: "On Leave",
        url: "/dashboard/on-leave-employees",
        allowedRoles: ["admin", "hr_manager", "supervisor", "employee"],
      },
    ],
  },

   {
    title: "Attendance",
    icon: React.createElement(Icon, {
      icon: "solar:users-group-rounded-bold",
      className: "w-6 h-6",
    }),
    children: [
      {
        title: "All Employees",
        url: "/dashboard/all-employees",
        allowedRoles: ["admin", "hr_manager", "supervisor", "employee"],
      },

      {
        title: "On Leave",
        url: "/dashboard/on-leave-employees",
        allowedRoles: ["admin", "hr_manager", "supervisor", "employee"],
      },
    ],
    allowedRoles: ["admin", "hr_manager", "supervisor", "employee"],
  },

   {
    title: "Performance",
    icon: React.createElement(Icon, {
      icon: "solar:users-group-rounded-bold",
      className: "w-6 h-6",
    }),
    children: [
      {
        title: "All Employees",
        url: "/dashboard/all-employees",
        allowedRoles: ["admin", "hr_manager", "supervisor", "employee"],
      },
      {
        title: "On Leave",
        url: "/dashboard/on-leave-employees",
        allowedRoles: ["admin", "hr_manager", "supervisor", "employee"],
      },
    ],
    allowedRoles: ["admin", "hr_manager", "supervisor", "employee"],
  },

] as const;


export type SidebarItem = {
  title: string;
  icon?: React.ReactNode;
  url?: string;
  position?: "top" | "bottom";
  allowedRoles: string[];
  children?: SidebarItem[];
};

export default sidebarItems;
