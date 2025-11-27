'use server'
import { createData, deleteData, fetchData, updateData } from '@/lib/api'

export async function getAllBranches() {
    const  response = await fetchData(`/organizations/branches/list/`);
    if (response.error) {
        throw new Error(response.message);
    }
    return response;
}


export async function createBranch(branchData: any) {
    const response = await createData(`/organizations/branches/create/`, branchData, {}, true);
    if(response.error) {
        return {
            error: response.error
        }
    }
    return response;
}

export async function updateBranch(branchId: string, branchData: any) {
    const response = await updateData(`/organizations/branches/${branchId}/update/`, branchData);
    if(response.error) {
        return {
            error: response.error
        }
    }
    return response;
}


export async function deleteBranch(branchId: string) {
    const response = await deleteData(`/organizations/branches/${branchId}/delete/`);
    
    if(response?.error) {
        return {
            error: response.error
        }
    }
    return response;
}
