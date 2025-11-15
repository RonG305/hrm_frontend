import { fetchData } from "@/lib/api";

export async function getRoles () {
    const response = await fetchData('/auth/roles/');
    if (response.error) {
        throw new Error(response.message);
    }
    console.log("ROLES RESPONSE:", response);
    return response;
}