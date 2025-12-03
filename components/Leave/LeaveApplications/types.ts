export interface LeaveApplication {
    id: string;
    leave_type: {
        id: string;
        name: string;
        description: string;
        date_created: string;
        date_updated: string;
    };
    user: string;
    approved_by: string | null;
    start_date: string;
    end_date: string;
    reason: string;
    status: "pending" | "approved" | "rejected";
    date_created: string;
    date_updated: string;
}

export interface LeaveApplicationResponse {
    results: LeaveApplication[];
    count: number;
    next: string | null;
    previous: string | null;
}