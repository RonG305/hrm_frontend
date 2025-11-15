import { fetchData } from "@/lib/api";

export async function getProfileById(id: string) {
    const response = await fetchData(`/auth/users/${id}/`);
    if(response.error) {
        throw new Error(response.error);
    }
    return response;
}