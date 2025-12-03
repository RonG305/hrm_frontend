export interface AssetRequest {
    id: string;
    asset: string;
    request_details: string;
    requested_by: {
        id: string;
        first_name: string;
        last_name: string;
        email: string;
    };
    comments: string;
    request_date: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    approved_by?: {
        id: string;
        first_name: string;
        last_name: string;
        email: string;
    } | null;
    approval_date?: string;
    date_created: string;
    date_updated: string;
}

export interface AssetRequestResponse {
    results: AssetRequest[];
    total: number;
    previous?: string;
    next?: string;
}