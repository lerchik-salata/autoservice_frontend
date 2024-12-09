import apiClient from './apiClient';
import {
    GetMeResponse,
    LoginPayload,
    LoginResponse,
    RefreshPayload,
    RefreshResponse,
    RegisterPayload,
    RegisterResponse,
} from "../types/auth.ts";

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
