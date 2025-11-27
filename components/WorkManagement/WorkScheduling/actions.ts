'use server'

import { createData, deleteData, fetchData, updateData } from "@/lib/api";
import { WorkSchedule } from "./types";

export async function getAllWorkSchedules(){
    const response = await fetchData(`/work-management/shift-schedules/list/`);
      if(response.error) {
        return {
            error: response.error
        }
    }
    return response;
}

export async function createWorkSchedule(scheduleData: any) {
    const response = await createData(`/work-management/shift-schedules/create/`, scheduleData, {}, true);
      if(response.error) {
        return {
            error: response.error
        }
    }
    return response;
}

export async function updateWorkSchedule(scheduleId: number, scheduleData: any) {
    const response = await updateData(`/work-management/shift-schedules/${scheduleId}/update/`, scheduleData);
      if(response.error) {
        return {
            error: response.error
        }
    }
    return response;
}

export async function deleteWorkSchedule(scheduleId: number) {
    const response = await deleteData(`/work-management/shift-schedules/${scheduleId}/delete/`);
      if(response?.error) {
        return {
            error: response.error
        }
    }
    return response;
}