export interface Branch {
    id: string;
    name:  string;
    code: string;
    address: string;
    phone: string;
    email: string;
    created_at: string;
    updated_at: string;
    manager: string;
}

export interface BranchResponse {
    results: Branch[];
    count: number;
}