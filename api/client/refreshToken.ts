import { authAPI } from "@/api/auth";
import { authStore } from "@/store/authStore";

export const refreshToken = async (): Promise<string> => {
  const oldRefreshToken = authStore.getState().refreshToken;

  if (!oldRefreshToken) {
    throw new Error("Refresh token não encontrado.");
  }

  const { accessToken, refreshToken } = await authAPI.refresh({
    refreshToken: oldRefreshToken,
  });

  authStore.getState().updateTokens({ accessToken, refreshToken });

  return accessToken;
};
