'use server'
import { createData, deleteData, fetchData, updateData } from '@/lib/api'

export async function getDepartments() {
    const  response = await fetchData(`/departments/list/`);
    if (response.error) {
        throw new Error(response.message);
    }
    return response;
}


export async function createDepartment(departmentData: any) {
    const response = await createData(`/departments/create/`, departmentData, {}, true);
    if(response.error) {
        return {
            error: response.error
        }
    }
    return response;
}

export async function updateDepartment(departmentId: string, departmentData: any) {
    const response = await updateData(`/departments/${departmentId}/update/`, departmentData);
    if(response.error) {
        return {
            error: response.error
        }
    }
    return response;
}


export async function deleteDepartment(departmentId: string) {
    const response = await deleteData(`/departments/${departmentId}/delete/`);
    
    if(response?.error) {
        return {
            error: response.error
        }
    }
    return response;
}
