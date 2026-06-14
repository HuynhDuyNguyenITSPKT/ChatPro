import axiosClient from '@/lib/axios';
import { ApiResponse } from '@/types/api.type';

export const uploadService = {
  uploadFile: async (file: File): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axiosClient.post<ApiResponse<{ url: string }>>('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.data;
  },
};
