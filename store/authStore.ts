import {
  clearTokens,
  loadStoredTokens,
  saveTokens,
} from "@/utils/secureTokenManager";
import { create } from "zustand";

type AuthState = {
  accessToken?: string;
  refreshToken?: string;
  user?: TUser;
  login: (user: TUser) => Promise<void>;
  logout: () => Promise<void>;
  loadTokens: () => Promise<void>;
  updateTokens: (tokens: TAuthTokens) => Promise<void>;
  setUser: (user: TUser) => void;
};

export const authStore = create<AuthState>((set) => ({
  user: undefined,
  accessToken: undefined,
  refreshToken: undefined,

  login: async (user: TUser) => {
    await saveTokens({
      accessToken: user.accessToken,
      refreshToken: user.refreshToken,
    });
    set({
      user,
      accessToken: user.accessToken,
      refreshToken: user.refreshToken,
    });
  },

  logout: async () => {
    await clearTokens();
    set({ accessToken: undefined, user: undefined, refreshToken: undefined });
  },

  loadTokens: async () => {
    const { accessToken, refreshToken } = await loadStoredTokens();
    if (accessToken && refreshToken) {
      set({ accessToken, refreshToken });
    }
  },

  setUser: (user: TUser) => {
    set({ user });
  },

  updateTokens: async ({ accessToken, refreshToken }: TAuthTokens) => {
    await saveTokens({ accessToken, refreshToken });
    set({ accessToken, refreshToken });
  },
}));
