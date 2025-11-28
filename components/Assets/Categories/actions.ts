'use server'
import { createData, deleteData, fetchData, updateData } from '@/lib/api'

export async function getAssetCategories() {
    const  response = await fetchData(`/assets-inventory/categories/list/`);
    if (response.error) {
        throw new Error(response.message);
    }
    return response;
}


export async function createAssetCategory(categoryData: any) {
    const response = await createData(`/assets-inventory/categories/create/`, categoryData, {}, true);
    if(response.error) {
        return {
            error: response.error
        }
    }
    return response;
}

export async function updateAssetCategory(categoryId: string, categoryData: any) {
    const response = await updateData(`/assets-inventory/categories/${categoryId}/update/`, categoryData);
    if(response.error) {
        return {
            error: response.error
        }
    }
    return response;
}


export async function deleteAssetCategory(categoryId: string) {
    const response = await deleteData(`/assets-inventory/categories/${categoryId}/delete/`);
    
    if(response?.error) {
        return {
            error: response.error
        }
    }
    return response;
}
