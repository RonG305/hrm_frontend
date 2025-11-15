'use server'
import { fetchData } from '@/lib/api'

export async function getDepartments() {
    const  response = await fetchData(`/departments/list/`);
    if (response.error) {
        throw new Error(response.message);
    }
    return response;
}

