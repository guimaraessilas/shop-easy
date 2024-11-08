import axios, { AxiosRequestConfig, HttpStatusCode } from "axios";
import { Alert } from "react-native";
import { authStore } from "@/store/authStore";
import { authAPI } from "@/api/auth";

const errorHandler = async (
  error: TErrorResponse,
  handleError: boolean,
  originalRequest?: AxiosRequestConfig
) => {
  if (!handleError) {
    return Promise.reject(error);
  }

  const { response } = error;

  if (response?.status === HttpStatusCode.Unauthorized && originalRequest) {
    try {
      const oldRefreshToken = authStore.getState().refreshToken;

      if (oldRefreshToken) {
        const { accessToken, refreshToken } = await authAPI.refresh({
          refreshToken: oldRefreshToken,
        });

        authStore.getState().updateTokens({ accessToken, refreshToken });

        originalRequest.headers!.Authorization = `Bearer ${accessToken}`;

        return axios(originalRequest);
      } else {
        authStore.getState().logout();
      }
    } catch (refreshError) {
      authStore.getState().logout();
      return Promise.reject(refreshError);
    }
  }

  if (
    response &&
    Number(response?.status) >= HttpStatusCode.InternalServerError
  ) {
    Alert.alert(
      "Opss...",
      "Ocorreu um erro ao tentar realizar a requisição. Tente novamente mais tarde!"
    );
  }

  console.warn("Request error => ", JSON.stringify(response));
  return Promise.reject(error);
};

export default errorHandler;
