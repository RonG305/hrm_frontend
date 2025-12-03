import { Employee } from "../Employees/types";

export interface UserResponse {
    results: Employee[];
    total: number;
    previous?: string;
    next?: string;
}