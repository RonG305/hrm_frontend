'use server';

import { deleteData, fetchData } from "@/lib/api";

export async function getAllProjects() {
    const response  = await fetchData(`/projects/list/`);
    if(response.error) {
        return {
            error: response.error
        }
    }
    return response;
}

export async function createProject(projectData: any) {
    const response = await fetchData(`/projects/create/`, projectData);
    
    if(response.error) {
        return {
            error: response.error
        }
    }
    return response;
}

export async function deleteProject(projectId: string) {
    const response = await deleteData(`/projects/${projectId}/delete/`);
    
    if(response?.error) {
        return {
            error: response.error
        }
    }
    return response;
}