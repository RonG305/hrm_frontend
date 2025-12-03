export interface LeaveType {
    id: string;
    name: string;
    description: string;
    date_created: string;
    date_updated: string;
}

export interface LeaveTypeResponse {
    results: LeaveType[];
    count: number;
    next: string | null;
    previous: string | null;
}    