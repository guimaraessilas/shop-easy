import axios, { AxiosRequestConfig, HttpStatusCode } from "axios";
import { Alert } from "react-native";
import { authStore } from "@/store/authStore";

const errorHandler = async (
  error: TErrorResponse,
  handleError: boolean,
  originalRequest?: AxiosRequestConfig,
  refreshToken?: () => Promise<string>
) => {
  if (!handleError) {
    return Promise.reject(error);
  }

  const { response } = error;

  if (
    response?.status === HttpStatusCode.Unauthorized &&
    originalRequest &&
    refreshToken
  ) {
    try {
      const newAccessToken = await refreshToken();
      originalRequest.headers!.Authorization = `Bearer ${newAccessToken}`;
      return axios(originalRequest);
    } catch (refreshError) {
      console.log("Erro ao renovar token: ", refreshError);
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
