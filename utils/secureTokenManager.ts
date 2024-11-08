import { STORE_KEYS } from "@/constants/storeKeys";
import * as PortableSecureStore from "@/utils/portableSecureStore";

export const saveTokens = async ({
  accessToken,
  refreshToken,
}: TAuthTokens) => {
  await PortableSecureStore.setItemAsync(STORE_KEYS.ACCESS_TOKEN, accessToken);
  await PortableSecureStore.setItemAsync(
    STORE_KEYS.REFRESH_TOKEN,
    refreshToken
  );
};

export const clearTokens = async () => {
  await PortableSecureStore.deleteItemAsync(STORE_KEYS.ACCESS_TOKEN);
  await PortableSecureStore.deleteItemAsync(STORE_KEYS.REFRESH_TOKEN);
};

export const loadStoredTokens = async () => {
  const accessToken = await PortableSecureStore.getItemAsync(
    STORE_KEYS.ACCESS_TOKEN
  );
  const refreshToken = await PortableSecureStore.getItemAsync(
    STORE_KEYS.REFRESH_TOKEN
  );
  return { accessToken, refreshToken };
};
