export interface FormData {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    confirmPassword?: string;
}

export interface FormField {
    id: string;
    name: string;
    label: string;
    type: string;
}

export interface User {
    id: string,
    email: string,
    created_at: string,
    name: string,
    surname: string,
    role: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    email: string;
    password: string;
    name: string;
    surname: string;
}

export interface LoginResponse {
    access_token: string;
    refresh_token: string;
}

export interface RegisterResponse {
    message: string;
}

export interface RefreshResponse {
    access_token: string;
}

export interface RefreshPayload {
    refresh_token: string;
}

export interface GetMeResponse {
    user: User;
}
