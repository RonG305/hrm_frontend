'use server'
import { createData, deleteData, fetchData, updateData } from '@/lib/api'
import { revalidatePath } from 'next/cache';

export async function getAssetRequests() {
    const  response = await fetchData(`/assets-inventory/asset-requests/list/`);
    if (response.error) {
        throw new Error(response.message);
    }
    return response;
}


export async function createAssetRequest(assetRequestData: any) {
    const response = await createData(`/assets-inventory/asset-requests/create/`, assetRequestData, {}, true);
    if(response.error) {
        return {
            error: response.error
        }
    }
    revalidatePath('/dashboard/asset-requests');
    return response;
}

export async function updateAssetRequest(assetRequestId: string, assetRequestData: any) {
    const response = await updateData(`/assets-inventory/asset-requests/${assetRequestId}/update/`, assetRequestData);
    if(response.error) {
        return {
            error: response.error
        }
    }
    revalidatePath('/dashboard/asset-requests');
    return response;
}

export async function assetRequestAction(assetRequestId: string, assetRequestData: any) {
    const response = await updateData(`/assets-inventory/asset-requests/${assetRequestId}/action/`, assetRequestData);
    if(response.error) {
        return {
            error: response.error
        }
    }
    revalidatePath('/dashboard/asset-requests');
    return response;
}


export async function deleteAssetRequest(assetRequestId: string) {
    const response = await deleteData(`/assets-inventory/asset-requests/${assetRequestId}/delete/`);
    
    if(response?.error) {
        return {
            error: response.error
        }
    }
    revalidatePath('/dashboard/asset-requests');
    return response;
}
