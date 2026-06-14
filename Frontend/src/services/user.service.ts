import { apiService } from './api';
import { User, UpdateUserPayload } from '@/types/user.type';

export const userService = {
  getProfile: async (): Promise<User> => {
    const response = await apiService.get<User>('/users/profile');
    return response.data;
  },

  updateProfile: async (payload: UpdateUserPayload): Promise<User> => {
    const response = await apiService.put<User>('/users/profile', payload);
    return response.data;
  },
};
