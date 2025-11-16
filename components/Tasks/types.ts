export interface Task {
    id: string;
    assigned_by: string;
    assigned_by_id: string;
    assigned_to_id: string;
    assigned_to: string;
    title: string;
    description: string;
    files: string[] | null;
    due_date: string;
    status: "Pending" | "In Progress" | "Completed";
    priority: "Low" | "Medium" | "High";
    is_completed: boolean;
    date_created: string;
    date_updated: string;
}