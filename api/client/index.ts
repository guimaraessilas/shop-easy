import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import errorHandler from "./errorHandler";

const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    headers: {
      "content-type": "application/json",
    },
  });

  instance.interceptors.request.use(
    (config) => config,
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
    errorHandler(error as TErrorResponse, handleError);
    throw error;
  }
};

export default client;
