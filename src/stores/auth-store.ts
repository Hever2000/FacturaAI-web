import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types/auth';
import { authApi } from '@/lib/api/auth';
import { STORAGE_KEYS } from '@/lib/constants';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      setUser: (user) => set({ user, isAuthenticated: !!user }),

      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const response = await authApi.login({ email, password });
          const { access_token, refresh_token } = response;

          localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, access_token);
          localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refresh_token);

          const userResponse = await authApi.me();
          set({ user: userResponse, isAuthenticated: true, isLoading: false });
          localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userResponse));
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (email, password, fullName) => {
        set({ isLoading: true });
        try {
          const response = await authApi.register({ email, password, full_name: fullName });
          const { access_token, refresh_token } = response;

          localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, access_token);
          localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refresh_token);

          const userResponse = await authApi.me();
          set({ user: userResponse, isAuthenticated: true, isLoading: false });
          localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userResponse));
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
        set({ user: null, isAuthenticated: false });
      },

      fetchUser: async () => {
        const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
        if (!token) return;

        try {
          const user = await authApi.me();
          set({ user, isAuthenticated: true });
          localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
        } catch {
          get().logout();
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
