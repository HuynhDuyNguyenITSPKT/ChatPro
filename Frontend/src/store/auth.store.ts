import { User } from '@/types/user.type';
import { LOCAL_STORAGE_KEYS } from '@/lib/constants';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

let state: AuthState = {
  user: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.USER) || 'null') : null,
  isAuthenticated: typeof window !== 'undefined' ? !!localStorage.getItem(LOCAL_STORAGE_KEYS.USER) : false,
  isLoading: true,
};

const listeners = new Set<(state: AuthState) => void>();

export const authStore = {
  getState(): AuthState {
    return state;
  },
  
  setState(newState: Partial<AuthState>) {
    state = { ...state, ...newState };
    if (typeof window !== 'undefined') {
      if (state.user) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(state.user));
      } else {
        localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
      }
    }
    listeners.forEach((listener) => listener(state));
  },
  
  subscribe(listener: (state: AuthState) => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};
