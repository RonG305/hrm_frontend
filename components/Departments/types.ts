export interface Department {
    id: number;
    name: string;
    code: string;
    description: string;
    date_created: string;
    date_updated: string;
}

export interface DepartmentResponse {
    results: Department[];
    total: number;
    previous?: string;
    next?: string;
}