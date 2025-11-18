'use server';

import { createData } from "@/lib/api";
import { LoginProps } from "./type";
import { cookies } from "next/headers";

export async function loginUser(formData: LoginProps) {
    const response = await createData(`/auth/login/`, formData);
    if(response.error) {
        return {
            error: response.error
        }
    }
    if(response?.access_token) {
        (await cookies()).set('token', response.access_token, { httpOnly: true, path: '/' });
    }
    console.log("Login response:", response);
    return response;    

}

export async function logoutUser() {
    (await cookies()).delete('token');
    return { message: "Logged out successfully" };
}