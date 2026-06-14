import { apiService } from './api';
import { AuthResponse, LoginPayload, RegisterPayload, VerifyOtpPayload } from '@/types/auth.type';
import { COOKIE_KEYS, LOCAL_STORAGE_KEYS } from '@/lib/constants';
import { setCookie, deleteCookie } from '@/lib/cookies';

export const authService = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const response = await apiService.post<AuthResponse>('/auth/login', payload);
    const { accessToken, refreshToken } = response.data;
    
    // Save tokens in cookies
    setCookie(COOKIE_KEYS.ACCESS_TOKEN, accessToken, 7); // 7 days
    setCookie(COOKIE_KEYS.REFRESH_TOKEN, refreshToken, 30); // 30 days
    
    return response.data;
  },

  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const response = await apiService.post<AuthResponse>('/auth/register', payload);
    const { accessToken, refreshToken } = response.data;
    
    // Save tokens in cookies
    setCookie(COOKIE_KEYS.ACCESS_TOKEN, accessToken, 7);
    setCookie(COOKIE_KEYS.REFRESH_TOKEN, refreshToken, 30);
    
    return response.data;
  },

  verifyOtp: async (payload: VerifyOtpPayload): Promise<AuthResponse> => {
    const response = await apiService.post<AuthResponse>('/auth/verify-otp', payload);
    const { accessToken, refreshToken } = response.data;
    
    setCookie(COOKIE_KEYS.ACCESS_TOKEN, accessToken, 7);
    setCookie(COOKIE_KEYS.REFRESH_TOKEN, refreshToken, 30);
    
    return response.data;
  },

  logout: async (): Promise<void> => {
    try {
      await apiService.post('/auth/logout');
    } catch (error) {
      console.error('Logout API failed:', error);
    } finally {
      deleteCookie(COOKIE_KEYS.ACCESS_TOKEN);
      deleteCookie(COOKIE_KEYS.REFRESH_TOKEN);
      if (typeof window !== 'undefined') {
        localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
      }
    }
  },
};
