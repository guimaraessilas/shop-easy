import { create } from "zustand";
import { STORE_KEYS } from "@/constants/storeKeys";
import * as PortableSecureStore from "@/utils/secureStore";
import { router } from "expo-router";

type AuthState = {
  accessToken?: string;
  refreshToken?: string;
  user?: TUser;
  login: (user: TUser) => void;
  logout: () => Promise<void>;
  loadToken: () => Promise<void>;
  updateTokens: ({ accessToken, refreshToken }: TAuthTokens) => Promise<void>;
  setUser: (user: TUser) => void;
};

export const authStore = create<AuthState>((set) => ({
  user: undefined,
  accessToken: undefined,
  refreshToken: undefined,

  login: async (user: TUser) => {
    await PortableSecureStore.setItemAsync(
      STORE_KEYS.ACCESS_TOKEN,
      user.accessToken
    );
    await PortableSecureStore.setItemAsync(
      STORE_KEYS.REFRESH_TOKEN,
      user.refreshToken
    );
    set({
      user,
      accessToken: user.accessToken,
      refreshToken: user.refreshToken,
    });
  },
  logout: async () => {
    await PortableSecureStore.deleteItemAsync(STORE_KEYS.ACCESS_TOKEN);
    await PortableSecureStore.deleteItemAsync(STORE_KEYS.REFRESH_TOKEN);
    set({ accessToken: undefined, user: undefined, refreshToken: undefined });
    router.replace("/login");
  },
  loadToken: async () => {
    const accessToken = await PortableSecureStore.getItemAsync(
      STORE_KEYS.ACCESS_TOKEN
    );
    const refreshToken = await PortableSecureStore.getItemAsync(
      STORE_KEYS.REFRESH_TOKEN
    );
    if (accessToken && refreshToken) {
      set({ accessToken, refreshToken });
    }
  },
  setUser: (user: TUser) => {
    set({ user });
  },
  updateTokens: async ({ accessToken, refreshToken }: TAuthTokens) => {
    await PortableSecureStore.setItemAsync(
      STORE_KEYS.ACCESS_TOKEN,
      accessToken
    );
    await PortableSecureStore.setItemAsync(
      STORE_KEYS.REFRESH_TOKEN,
      refreshToken
    );
    set({ accessToken, refreshToken });
  },
}));
