export interface DashboardStats {
  averageKPI: {
    score: number;
    standard: string;
    description: string;
    basedOn: string;
    trend: "up" | "down";
    improvement: string;
  };
  employee: {
    total: number;
    male: {
      count: number;
      percentage: number;
    };
    female: {
      count: number;
      percentage: number;
    };
    };
    devicesUsedToday: {
        totalEmployees: number;
        mobile: {
            percentage: number;
            count: number;
        };
        desktop: {
            percentage: number;
            count: number;
        };
    };
    projects: {
        onProgress: number;
        done: number;
        totalHandled: number;
        description: string;
    };
}
