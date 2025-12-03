import { Profile } from "../Profile/types";

export interface AddEmployeeParams {
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
    gender: string;
    employment_type: string;
    contract_start_date?: string | null;
    contract_end_date?: string | null;
    is_active: boolean | null | undefined;
    is_staff: boolean | null | undefined    ;
    role: number;
    profile: Profile;
    department: number;
    position: number;
    password: string;
    confirm_password: string;
}

export interface Employee {
    id: string;
    profile: Profile;
    last_login: string | null;
    is_superuser: boolean;
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
    birth_date: string | null;
    gender: string;
    resetPasswordToken: string | null;
    resetPasswordExpires: string | null;
    otp_code: string | null;
    otp_expires: string | null;
    employment_type: string;
    contract_start_date: string | null;
    contract_end_date: string | null;
    is_active: boolean;
    is_staff: boolean;
    role: string;
    status: string;
    department: string;
    position: string;
    groups: string[];
    user_permissions: string[];
}
