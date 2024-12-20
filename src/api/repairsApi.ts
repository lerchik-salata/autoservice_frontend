import apiClient from './apiClient';
import {AddRepairPayload, GetMyRepairsResponse, GetRepairsResponse, Repair} from "../types/repairs.ts";

export const getRepairs = async (): Promise<Repair[]> => {
    const response = await apiClient.get<GetRepairsResponse>('/admin/repairs');
    return response.data.repairs;
};

export const addRepair = async (data: AddRepairPayload): Promise<any> => {
    const response = await apiClient.post<any>('/admin/repairs', data);
    return response.data;
};

export const updateRepair = async (id: string, data: AddRepairPayload): Promise<any> => {
    const updatedData = { ...data };

    if (updatedData.application) {
        updatedData.application_id = updatedData.application.id;
    }

    if (updatedData.customer) {
        updatedData.customer_id = updatedData.customer.id;
    }

    const response = await apiClient.patch<any>(`/admin/repairs/${id}`, updatedData);
    return response.data;
};


export const deleteRepair = async (id: string): Promise<any> => {
    const response = await apiClient.delete<any>(`/admin/repairs/${id}`);
    return response.data;
};

export const getMyRepairs = async (): Promise<Repair[]> => {
    const response = await apiClient.get<GetMyRepairsResponse>('/repairs/my');
    return response.data.items;
};

