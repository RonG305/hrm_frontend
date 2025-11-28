'use server'
import { createData, deleteData, fetchData, updateData } from '@/lib/api'

export async function getAllUnits() {
    const  response = await fetchData(`/organizations/units/list/`);
    if (response.error) {
        throw new Error(response.message);
    }
    return response;
}


export async function createUnit(unitData: any) {
    const response = await createData(`/organizations/units/create/`, unitData, {}, true);
    if(response.error) {
        return {
            error: response.error
        }
    }
    return response;
}

export async function updateUnit(unitId: string, unitData: any) {
    const response = await updateData(`/organizations/units/${unitId}/update/`, unitData);
    if(response.error) {
        return {
            error: response.error
        }
    }
    return response;
}


export async function deleteUnit(unitId: string) {
    const response = await deleteData(`/organizations/units/${unitId}/delete/`);
    
    if(response?.error) {
        return {
            error: response.error
        }
    }
    return response;
}
