import axiosClient from '@/lib/axios';
import { ApiResponse } from '@/types/api.type';

export const apiService = {
  get: async <T>(url: string, params?: Record<string, any>): Promise<ApiResponse<T>> => {
    const response = await axiosClient.get<ApiResponse<T>>(url, { params });
    return response.data;
  },

  post: async <T>(url: string, data?: any): Promise<ApiResponse<T>> => {
    const response = await axiosClient.post<ApiResponse<T>>(url, data);
    return response.data;
  },

  put: async <T>(url: string, data?: any): Promise<ApiResponse<T>> => {
    const response = await axiosClient.put<ApiResponse<T>>(url, data);
    return response.data;
  },

  delete: async <T>(url: string): Promise<ApiResponse<T>> => {
    const response = await axiosClient.delete<ApiResponse<T>>(url);
    return response.data;
  },
};
