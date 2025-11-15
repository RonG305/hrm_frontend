import { fetchData } from "@/lib/api";

export async function getOrganizationalRoles() {
    const response = await fetchData('/organization-roles/list/');
    if(response.error) {
        throw new Error('Failed to fetch organizational roles');
    }
    return response;
}