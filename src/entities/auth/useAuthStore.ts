import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthStore = {
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
};

const ACCESS_TOKEN_STORAGE_KEY = 'accessToken';

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      isLoggedIn: false,
      login: (token: string) => {
        localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token);
        if (token) {
          set({ isLoggedIn: true });
        }
      },
      logout: () => {
        set({ isLoggedIn: false });
        localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
      },
    }),
    {
      name: 'authStatus',
    },
  ),
);
