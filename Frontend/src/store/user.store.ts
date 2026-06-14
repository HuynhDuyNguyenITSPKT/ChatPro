import { User } from '@/types/user.type';

export interface UserState {
  users: User[];
  selectedUser: User | null;
  isLoading: boolean;
  error: string | null;
}

let state: UserState = {
  users: [],
  selectedUser: null,
  isLoading: false,
  error: null,
};

const listeners = new Set<(state: UserState) => void>();

export const userStore = {
  getState(): UserState {
    return state;
  },

  setState(newState: Partial<UserState>) {
    state = { ...state, ...newState };
    listeners.forEach((listener) => listener(state));
  },

  subscribe(listener: (state: UserState) => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};
