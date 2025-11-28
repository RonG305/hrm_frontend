export interface Asset {
    id: string;
    name: string;
    serial_number: string;
    purchase_date: string;
    warranty_expiry_date: string;
    status: 'Available' | 'Assigned' | 'Under Maintenance' | 'Retired';
    category: string;
    assigned_to: string | null | undefined;
    description: string;
    date_created: string;
    date_updated: string;
}        