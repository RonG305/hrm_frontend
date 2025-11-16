import { createData, deleteData, fetchData, updateData } from "@/lib/api";
import { Task } from "./types";

export async function getUserTasks() {
    const response = await fetchData(`/tasks/user-tasks/`)
    if(response.error) {
        console.error("Error fetching user tasks:", response.error);
        throw new Error(response.error);
    }
    return response;
}

export async function createTask(taskData: any) {
    const response = await createData(`/tasks/create/`, taskData);
    if(response.error) {
        console.error("Error creating task:", response.error);
        throw new Error(response.error);
    }
    return response;
}

export async function updateTask(taskId: string, taskData: any) {
    const response = await updateData(`/tasks/${taskId}/update/`, taskData);
    if(response.error) {
        console.error("Error updating task:", response.error);
        throw new Error(response.error);
    }
    return response;
}

export async function deleteTask(taskId: string) {
    const response = await deleteData(`/tasks/${taskId}/delete/`);
    if(response?.error) {
        console.error("Error deleting task:", response.error);
        throw new Error(response.error);
    }
    return response;
}