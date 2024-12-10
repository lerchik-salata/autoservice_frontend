import apiClient from './apiClient';
import {User} from "../types/auth.ts";
import {GetUsersResponse, UpdateUserPayload} from "../types/user.ts";

export const getUsers = async (): Promise<User[]> => {
    const response = await apiClient.get<GetUsersResponse>('/admin/users');
    return response.data.items;
};

export const deleteUser = async (id: string): Promise<any> => {
    const response = await apiClient.delete<any>(`/admin/users/${id}`);
    return response.data;
};

export const updateUser = async (
    data: UpdateUserPayload
): Promise<any> => {
    const response = await apiClient.patch<any>('/user', data);
    return response.data;
};