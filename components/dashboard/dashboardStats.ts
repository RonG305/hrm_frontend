import { DashboardStats } from "./types";

export const dashboardStats: DashboardStats = {
  averageKPI: {
    score: 9,
    standard: "Company Employee Standard",
    description: "Yay!! it’s an improvement 20% from last month!",
    basedOn: "All employee data",
    trend: "up",
    improvement: "20%"
  },
  employee: {
    total: 1218,
    male: {
      count: 782,
      percentage: 68
    },
    female: {
      count: 436,
      percentage: 32
    }
  },
  devicesUsedToday: {
    totalEmployees: 120,
    mobile: {
      percentage: 78,
      count: 84
    },
    desktop: {
      percentage: 22,
      count: 84
    }
  },
  projects: {
    onProgress: 73,
    done: 3089,
    totalHandled: 3162,
    description: "We’ve handled 3,162 projects so far!"
  }
};
