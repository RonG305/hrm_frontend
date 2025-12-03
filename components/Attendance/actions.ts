'use server'

import { createData, fetchData } from "@/lib/api"

interface AttendanceRecord {
    latitude: number;
    longitude: number;
}

export async function getAllAttendanceRecords() {
    const response = await fetchData(`/geo_location/attendance/list/`);
     if(response.error) {
        return {
            error: response.error
        }
    }
    return response;
}

export async function markAttendance(attendanceData: AttendanceRecord) {
    const response = await createData(`/geo_location/attendance/mark/`, attendanceData, {}, true);
    console.log("markAttendance response:", response);
    
    if(response.error) {
        return {
            error: response.error
        }
    }
    return response;
}
