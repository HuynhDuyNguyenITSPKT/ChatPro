import { User } from './user.type';

export interface LoginPayload {
  email: string;
  otp?: string;
  password?: string;
}

export interface RegisterPayload {
  email: string;
  name: string;
  password?: string;
}

export interface VerifyOtpPayload {
  email: string;
  otp: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}
