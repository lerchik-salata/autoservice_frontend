import apiClient from './apiClient';
import {AddOrderPayload, GetOrdersResponse, Order} from "../types/orders.ts";

export const getOrders = async (): Promise<Order[]> => {
    const response = await apiClient.get<GetOrdersResponse>('/admin/orders');
    return response.data.items;
};

export const getMyOrders = async (): Promise<Order[]> => {
    const response = await apiClient.get<GetOrdersResponse>('/orders/my');
    return response.data.items;
}

export const addOrder = async (data: AddOrderPayload): Promise<any> => {
    const response = await apiClient.post<any>('/orders', data);
    return response.data;
};

export const deleteOrder = async (id: string): Promise<any> => {
    const response = await apiClient.delete<any>(`/admin/orders/${id}`);
    return response.data;
};

export const updateOrder = async (id: string, data: AddOrderPayload): Promise<any> => {
    const response = await apiClient.patch<any>(`/admin/repairs/${id}`, data);
    return response.data;
};