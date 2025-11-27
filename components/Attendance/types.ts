export interface AttendanceRecord {
    id: string;
    timestamp: string;
    latitude: number;
    longitude: number;
    distance_meters: number;
    status: string;
    created_at: string;
    user: string;
}