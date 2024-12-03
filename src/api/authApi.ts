import apiClient from './apiClient';

interface LoginPayload {
    email: string;
    password: string;
}

interface RegisterPayload {
    email: string;
    password: string;
    name: string;
    surname: string;
}

export interface LoginResponse {
    access_token: string;
    refresh_token: string;
}

interface RegisterResponse {
    message: string;
}

interface RefreshResponse {
    access_token: string;
}

interface RefreshPayload {
    refresh_token: string;
}

interface User {
    id: string,
    email: string,
    created_at: string,
    name: string,
    surname: string,
    role: string;
}

interface GetMeResponse {
    user: User;
}


export const login = async (data: LoginPayload): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/auth/login', data);
    return response.data;
};

export const register = async (data: RegisterPayload): Promise<RegisterResponse> => {
    const response = await apiClient.post<RegisterResponse>('/auth/register', data);
    return response.data;
};

export const refresh = async(data: RefreshPayload): Promise<RefreshResponse> => {
    const response = await apiClient.post<RefreshResponse>('/auth/refresh-token', data);
    return response.data;
}

export const getMe = async (): Promise<GetMeResponse> => {
    const response = await apiClient.get<GetMeResponse>('/auth/me');
    return response.data;
};
