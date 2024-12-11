import apiClient from './apiClient';
import {AddProductPayload, GetProductsResponse, Product, UpdateProductPayload} from "../types/products.ts";

export const getProducts = async (): Promise<Product[]> => {
    const response = await apiClient.get<GetProductsResponse>('/products');
    return response.data.items;
};

export const getProductById = async (id: string) => {
    const response = await apiClient.get<Product>(`/products/${id}`);
    return response.data;
};

export const addProduct = async (data: AddProductPayload): Promise<any> => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
        const value = data[key as keyof AddProductPayload];
        if (value !== undefined && value !== null) {
            if (value instanceof File || value instanceof Blob) {
                formData.append(key, value);
            } else {
                formData.append(key, String(value));
            }
        }
    });

    const response = await apiClient.post<any>('/admin/products', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return response.data;
}

export const updateProduct = async (id: string, data: UpdateProductPayload): Promise<any> => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            if (value instanceof File || value instanceof Blob) {
                formData.append(key, value);
            } else {
                formData.append(key, String(value));
            }
        }
    });

    const response = await apiClient.patch<any>(`/admin/products/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return response.data;
};

export const deleteProduct = async (id: string): Promise<any> => {
    const response = await apiClient.delete<any>(`/admin/products/${id}`);
    return response.data;
};
