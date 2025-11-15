'use server'
import { createData, deleteData, fetchData, updateData } from '@/lib/api'
import { revalidatePath } from 'next/cache'
import { AddEmployeeParams } from './types';


export async function getEmployees({search}: {search?: string} = {}) {
    const  response = await fetchData(`/auth/employees/?search=${search || ''}`);
    if (response.error) {
        throw new Error(response.message);
    }
    return response;
}

export async function createEmployee(data: any) {
    const response = await createData('/auth/register/', data);
    if (response.error) {
        throw new Error(response.message);
    }
    revalidatePath('/dashboard/employees');
    return response;
}

export async function updateEmployee(id: string, data: any) {
    const response = await updateData(`/auth/users/${id}/`, data);
    if (response.error) {
        throw new Error(response.message);
    }
    revalidatePath('/dashboard/employees');
    return response;
}

export async function deleteEmployee(id: string) {
    const response = await deleteData(`/auth/users/${id}/`);
    if (response?.error) {
        throw new Error(response.message);
    }
    revalidatePath('/dashboard/employees');
    return response;
}

export async function toggleActiveStatus(id: string, is_active: boolean) {
    const response = await updateData(`/auth/users/${id}/`, { is_active });
    if (response?.error) {
        throw new Error(response.message);
    }
    revalidatePath('/dashboard/employees');
    return response;
}



// export async function updateEmployee(id: number, data: AddEmployeeParams) {
//     const response = await createData(`/auth/employees/${id}/update/`, data, 'PUT');
//     if (response.error) {
//         throw new Error(response.message);
//     }
//     revalidatePath('/dashboard/employees');
//     return response;
// }

// export async function deactivateEmployee(id: number) {
//     const response = await createData(`/auth/employees/${id}/deactivate/`, {}, 'POST');
//     if (response.error) {
//         throw new Error(response.message);
//     }
//     revalidatePath('/dashboard/employees');
//     return response;
// }

// export async function activateEmployee(id: number) {
//     const response = await createData(`/auth/employees/${id}/activate/`, {}, 'POST');
//     if (response.error) {
//         throw new Error(response.message);
//     }
//     revalidatePath('/dashboard/employees');
//     return response;
// }

// export async function resetEmployeePassword(id: number) {
//     const response = await createData(`/auth/employees/${id}/reset-password/`, {}, 'POST');
//     if (response.error) {
//         throw new Error(response.message);
//     }
//     revalidatePath('/dashboard/employees');
//     return response;
// }