
export interface ProjectCategory {
  id: string;
  name: string;
  description: string;
  date_created: string;
  date_updated: string;
}

export interface Project {
  id: string;
  category: ProjectCategory;
  milestones: any[];
  files: string[] | null;
  name: string;
  project_code: string;
  status: "Completed" | "In Progress" | "Pending";
  description: string;
  start_date: string;
  end_date: string;
  date_created: Date;
  date_updated: Date;
  assigned_to: string[];
}