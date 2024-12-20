import apiClient from './apiClient';
import {AddApplicationPayload, Application, GetApplicationsResponse} from "../types/applications.ts";

export const addApplication = async (data: AddApplicationPayload): Promise<any> => {
    const response = await apiClient.post<any>('/applications', data);
    return response.data;
};

export const getApplications = async (): Promise<Application[]> => {
    const response = await apiClient.get<GetApplicationsResponse>('/admin/applications');
    return response.data.items;
};

export const deleteApplication = async (id: string): Promise<any> => {
    const response = await apiClient.delete<any>(`/admin/applications/${id}`);
    return response.data;
};