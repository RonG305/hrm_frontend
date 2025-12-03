'use server'

import { createData, deleteData, fetchData, updateData } from '@/lib/api'

export async function getAssets() {
    const  response = await fetchData(`/assets-inventory/assets/list/`);
    if (response.error) {
        throw new Error(response.message);
    }
    return response;
}


export async function createAsset(assetData: any) {
    const response = await createData(`/assets-inventory/assets/create/`, assetData, {}, true);
    if(response.error) {
        return {
            error: response.error
        }
    }
    return response;
}

export async function updateAsset(assetId: string, assetData: any) {
    const response = await updateData(`/assets-inventory/assets/${assetId}/update/`, assetData);
    if(response.error) {
        return {
            error: response.error
        }
    }
    return response;
}

export async function assignAsset(assetId: string, assetData: any) {
    const response = await updateData(`/assets-inventory/assets/${assetId}/update/`, assetData);
    if(response.error) {
        return {
            error: response.error
        }
    }
    return response;
}


export async function deleteAsset(assetId: string) {
    const response = await deleteData(`/assets-inventory/assets/${assetId}/delete/`);
    
    if(response?.error) {
        return {
            error: response.error
        }
    }
    return response;
}
