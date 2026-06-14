import { useSyncExternalStore, useEffect } from 'react';
import { authStore } from '@/store/auth.store';
import { authService } from '@/services/auth.service';
import { userService } from '@/services/user.service';
import { LoginPayload, RegisterPayload, VerifyOtpPayload } from '@/types/auth.type';

const initialServerState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

const getServerSnapshot = () => initialServerState;

export const useAuth = () => {
  const state = useSyncExternalStore(
    authStore.subscribe,
    authStore.getState,
    getServerSnapshot
  );

  // Auto load profile if tokens exist in browser
  useEffect(() => {
    const initAuth = async () => {
      if (!state.user && state.isLoading) {
        try {
          const profile = await userService.getProfile();
          authStore.setState({ user: profile, isAuthenticated: true, isLoading: false });
        } catch {
          authStore.setState({ user: null, isAuthenticated: false, isLoading: false });
        }
      } else {
        authStore.setState({ isLoading: false });
      }
    };
    initAuth();
  }, [state.user, state.isLoading]);

  const login = async (payload: LoginPayload) => {
    authStore.setState({ isLoading: true });
    try {
      const response = await authService.login(payload);
      authStore.setState({ user: response.user, isAuthenticated: true, isLoading: false });
      return response;
    } catch (error) {
      authStore.setState({ isLoading: false });
      throw error;
    }
  };

  const register = async (payload: RegisterPayload) => {
    authStore.setState({ isLoading: true });
    try {
      const response = await authService.register(payload);
      authStore.setState({ user: response.user, isAuthenticated: true, isLoading: false });
      return response;
    } catch (error) {
      authStore.setState({ isLoading: false });
      throw error;
    }
  };

  const verifyOtp = async (payload: VerifyOtpPayload) => {
    authStore.setState({ isLoading: true });
    try {
      const response = await authService.verifyOtp(payload);
      authStore.setState({ user: response.user, isAuthenticated: true, isLoading: false });
      return response;
    } catch (error) {
      authStore.setState({ isLoading: false });
      throw error;
    }
  };

  const logout = async () => {
    await authService.logout();
    authStore.setState({ user: null, isAuthenticated: false, isLoading: false });
  };

  return {
    ...state,
    login,
    register,
    verifyOtp,
    logout,
  };
};
