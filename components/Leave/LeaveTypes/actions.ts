'use server'
import { createData, deleteData, fetchData, updateData } from '@/lib/api'
import { revalidatePath } from 'next/cache';

export async function getLeaveTypes() {
    const  response = await fetchData(`/leave-management/leave-types/list/`);
    if (response.error) {
        return {
            error: response.error
        }
    }
    return response;
}

export async function createLeaveType(leaveTypeData: any) {
    const response = await createData(`/leave-management/leave-types/create/`, leaveTypeData, {}, true);
    if(response.error) {
        return {
            error: response.error
        }
    }
    revalidatePath('/dashboard/leave-types');
    return response;
}

export async function updateLeaveType(leaveTypeId: string, leaveTypeData: any) {
    const response = await updateData(`/leave-management/leave-types/${leaveTypeId}/update/`, leaveTypeData);
    if(response.error) {
        return {
            error: response.error
        }
    }
    revalidatePath('/dashboard/leave-types');
    return response;
}


export async function deleteLeaveType(leaveTypeId: string) {
    const response = await deleteData(`/leave-management/leave-types/${leaveTypeId}/delete/`);
    
    if(response?.error) {
        return {
            error: response.error
        }
    }
    revalidatePath('/dashboard/leave-types');
    return response;
}
