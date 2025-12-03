"use server";

import { cookies } from "next/headers";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchData = async (url: string, options?: RequestInit) => {
  const token = (await cookies()).get("token")?.value;
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(options?.headers || {}),
      },
      ...options,
    });

    if (!response.ok) {
      return {
        error: `HTTP error!, status: ${response.statusText}`,
        message: "Failed to fetch data",
      };
    }

    return  await response.json()
     
  } catch (error) {
     return {
      error: `Fetch error: ${error}`,
      message: "Failed to fetch data",
     }
  }
};

export const createData = async (
  url: string,
  data: object,
  options?: RequestInit,
  auth?: boolean
) => {
  let token = "";
  if (auth) {
    token = (await cookies()).get("token")?.value || "";
  }
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && auth ? { Authorization: `Bearer ${token}` } : {}),
        ...(options?.headers || {}),
      },
      body: JSON.stringify(data),
      ...options,
    });

    if(response.status === 400) {
      const errorData = await response.json();
      return {
        error: `HTTP error!, status: ${response.statusText}`,
        ...errorData
      };
    }

    if (!response.ok) {
      return {
        error: `HTTP error!, status: ${response.statusText}`,
        message: `${response.status} Failed to fetch data`,
      };
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
   return {
      error: `Fetch error: ${error}`,
      message: "Failed to create data",
   }
  }
};

export const updateData = async (
  url: string,
  data: object,
  options?: RequestInit
) => {
  const token = (await cookies()).get("token")?.value;
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(options?.headers || {}),
      },
      body: JSON.stringify(data),

      ...options,
    });

    if (!response.ok) {
      return {
        error: `HTTP error!, status: ${response.statusText}`,
        message: "Failed to fetch data",
      };
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    return {
      error: `Fetch error: ${error}`,
      message: "Failed to update data",
    }
  }
};

export const deleteData = async (url: string, options?: RequestInit) => {
  const token = (await cookies()).get("token")?.value;
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      ...options,
      
    });

    if (!response.ok)
      return {
        error: `HTTP error!, status: ${response.statusText}`,
        message: "Failed to fetch data",
      };
  } catch (error) {
    return {
      error: `Fetch error: ${error}`,
      message: "Failed to delete data",
    }
  }
};

