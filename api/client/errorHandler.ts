import axios, { AxiosRequestConfig, HttpStatusCode } from "axios";
import { Alert } from "react-native";
import { authStore } from "@/store/authStore";
import { refreshToken } from "./refreshToken";
import { router } from "expo-router";

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
      const newAccessToken = await refreshToken();

      originalRequest.headers!.Authorization = `Bearer ${newAccessToken}`;
      return axios(originalRequest);
    } catch (refreshError) {
      console.error("Erro ao tentar atualizar o token: ", refreshError);
      authStore.getState().logout();
      router.replace("/login");
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
