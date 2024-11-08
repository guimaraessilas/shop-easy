import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import errorHandler from "./errorHandler";
import { authStore } from "@/store/authStore";
import { refreshToken } from "./refreshToken";

const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    headers: {
      "content-type": "application/json",
    },
  });

  instance.interceptors.request.use(
    async (config) => {
      await authStore.getState().loadToken();
      const accessToken = authStore.getState().accessToken;
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return instance;
};

const instance = createAxiosInstance();

const client = async (options: AxiosRequestConfig, handleError = true) => {
  try {
    const response: AxiosResponse = await instance(options);
    return response.data;
  } catch (error) {
    return await errorHandler(
      error as TErrorResponse,
      handleError,
      options,
      refreshToken
    );
  }
};

export default client;
