import { createData, deleteData, fetchData, updateData } from "@/lib/api";


export async function getAllTasks() {
    const response = await fetchData(`/tasks/list/`)
    if(response.error) {
        return {
            error: response.error
        }
    }
    return response;
}


export async function getUserTasks() {
    const response = await fetchData(`/tasks/user-tasks/`)
    if(response.error) {
        return {
            error: response.error
        }
    }
    return response;
}

export async function createTask(taskData: any) {
    const response = await createData(`/tasks/create/`, taskData, {}, true);
    if(response.error) {
        return {
            error: response.error
        }
    }
    return response;
}

export async function updateTask(taskId: string, taskData: any) {
    const response = await updateData(`/tasks/${taskId}/update/`, taskData);
    if(response.error) {
        return {
            error: response.error
        }
    }
    return response;
}

export async function getTaskDetails(taskId: string) {
    const response = await fetchData(`/tasks/${taskId}/`);
    if(response.error) {
        return {
            error: response.error
        }
    }
    return response;
}

export async function deleteTask(taskId: string) {
    const response = await deleteData(`/tasks/${taskId}/delete/`);
    if(response?.error) {
        return {
            error: response.error
        }
    }
    return response;
}