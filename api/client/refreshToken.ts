import axios from "axios";
import { authStore } from "@/store/authStore";

export const refreshToken = async () => {
  const oldRefreshToken = authStore.getState().refreshToken;

  if (!oldRefreshToken) {
    throw new Error("No refresh token available");
  }

  const response = await axios.post(
    `${process.env.EXPO_PUBLIC_API_URL}/auth/refresh`,
    { refreshToken: oldRefreshToken },
    { headers: { "Content-Type": "application/json" } }
  );

  const { accessToken, refreshToken } = response.data;
  authStore.getState().updateTokens({ accessToken, refreshToken });

  return accessToken;
};
