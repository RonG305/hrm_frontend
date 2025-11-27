import { createData, deleteData, fetchData, updateData } from "@/lib/api";

export async function getAllProjectCategories() {
    const response  = await fetchData(`/projects/categories/list/`);
    if(response.error) {
        return {
            error: response.error
        }
    }
    return response;
}

export async function createProjectCategory(categoryData: any) {
    const response = await createData(`/projects/categories/create/`, categoryData, {}, true);
    if(response.error) {
        return {
            error: response.error
        }
    }
    return response;
}

export async function updateProjectCategory(categoryId: string, categoryData: any) {
    const response = await updateData(`/projects/categories/${categoryId}/update/`, categoryData);
    if(response.error) {
        return {
            error: response.error
        }
    }
    return response;
}

export async function deleteProjectCategory(categoryId: string) {
    const response = await deleteData(`/projects/categories/${categoryId}/delete/`);
    if(response?.error) {
        return {
            error: response.error
        }
    }
    return response;
}