import { create } from "zustand";
import { STORE_KEYS } from "@/constants/storeKeys";
import * as PortableSecureStore from "@/utils/secureStore";

type AuthState = {
  accessToken?: string;
  user?: TUser;
  login: (token: string, user: TUser) => void;
  logout: () => Promise<void>;
  loadToken: () => Promise<void>;
};

export const authStore = create<AuthState>((set) => ({
  accessToken: undefined,
  user: undefined,
  login: async (accessToken: string, user: TUser) => {
    await PortableSecureStore.setItemAsync(
      STORE_KEYS.ACCESS_TOKEN,
      accessToken
    );
    set({ accessToken, user });
  },
  logout: async () => {
    await PortableSecureStore.deleteItemAsync(STORE_KEYS.ACCESS_TOKEN);
    set({ accessToken: undefined, user: undefined });
  },
  loadToken: async () => {
    const accessToken = await PortableSecureStore.getItemAsync(
      STORE_KEYS.ACCESS_TOKEN
    );
    if (accessToken) {
      set({ accessToken });
    }
  },
}));
