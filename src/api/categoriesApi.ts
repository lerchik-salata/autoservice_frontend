import apiClient from './apiClient';
import {AddCategoryPayload, Category, GetCategoriesResponse} from "../types/categories.ts";

export const getCategories = async (): Promise<Category[]> => {
    const response = await apiClient.get<GetCategoriesResponse>('/categories');
    return response.data.items;
};

export const addCategory = async (data: AddCategoryPayload): Promise<any> => {
    const response = await apiClient.post<any>('/admin/categories', data);
    return response.data;
};

export const updateCategory = async (id: string, data: AddCategoryPayload): Promise<any> => {
    const response = await apiClient.patch<any>(`/admin/categories/${id}`, null, {
        params: { name: data.name },
    });
    return response.data;
};

export const deleteCategory = async (id: string): Promise<any> => {
    const response = await apiClient.delete<any>(`/admin/categories/${id}`);
    return response.data;
};
