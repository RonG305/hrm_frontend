'use server'
import { createData, deleteData, fetchData, updateData } from '@/lib/api'
import { revalidatePath } from 'next/cache';

export async function getLeaveApplications() {
    const  response = await fetchData(`/leave-management/leave-applications/list/`);
    if (response.error) {
        return {
            error: response.message
        }
    }
    return response;
}

export async function createLeaveApplication(leaveApplicationData: any) {
    const response = await createData(`/leave-management/leave-applications/create/`, leaveApplicationData, {}, true);
    if(response.error) {
        return {
            error: response.error
        }
    }
    revalidatePath('/dashboard/leave-applications');
    return response;
}

export async function updateLeaveApplication(leaveApplicationId: string, leaveApplicationData: any) {
    const response = await updateData(`/leave-management/leave-applications/${leaveApplicationId}/update/`, leaveApplicationData);
    if(response.error) {
        return {
            error: response.error
        }
    }
    revalidatePath('/dashboard/leave-applications');
    return response;
}

export async function updateLeaveApplicationStatus(leaveApplicationId: string, leaveApplicationData: any) {
    const response = await updateData(`/leave-management/leave-applications/${leaveApplicationId}/status-update/`, leaveApplicationData);
    if(response.error) {
        return {
            error: response.error
        }
    }
    revalidatePath('/dashboard/leave-applications');
    return response;
}


export async function deleteLeaveApplication(leaveApplicationId: string) {
    const response = await deleteData(`/leave-management/leave-applications/${leaveApplicationId}/delete/`);
    
    if(response?.error) {
        return {
            error: response.error
        }
    }
    revalidatePath('/dashboard/leave-applications');
    return response;
}
