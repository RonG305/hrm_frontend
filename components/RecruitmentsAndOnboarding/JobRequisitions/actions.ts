'use server'
import { createData, deleteData, fetchData, updateData } from '@/lib/api'
import { revalidatePath } from 'next/cache';

export async function getJobRequisitions() {
    const  response = await fetchData(`/recruitment/job-requisitions/`);
    if (response.error) {
        return {
            error: response.message
        }
    }
    return response;
}

export async function createJobPosting(jobPostingData: any) {
    const response = await createData(`/recruitment/job-requisitions/create/`, jobPostingData, {}, true);
    if(response.error) {
        return {
            error: response.error
        }
    }
    revalidatePath('/dashboard/job-requisitions');
    return response;
}

export async function updateJobRequisitions(requisitionId: string, jobRequisitionData: any) {
    const response = await updateData(`/recruitment/job-requisitions/${requisitionId}/update/`, jobRequisitionData);
    if(response.error) {
        return {
            error: response.error
        }
    }
    revalidatePath('/dashboard/job-requisitions');
    return response;
}

export async function deleteJobRequisitions(requisitionId: string) {
    const response = await deleteData(`/recruitment/job-requisitions/${requisitionId}/delete/`);
    
    if(response?.error) {
        return {
            error: response.error
        }
    }
    revalidatePath('/dashboard/job-requisitions');
    return response;
}
