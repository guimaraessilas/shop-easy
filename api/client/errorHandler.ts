import { HttpStatusCode } from "axios";
import { Alert } from "react-native";

const errorHandler = (error: TErrorResponse, handleError: boolean) => {
  if (!handleError) {
    return Promise.reject(error);
  }

  const { response } = error;

  if (Number(response?.status) >= HttpStatusCode.InternalServerError) {
    Alert.alert(
      "Opss...",
      "Ocorreu um erro ao tentar realizar a requisição. Tente novamente mais tarde!"
    );
  }
  console.warn("request error => ", response);
  return Promise.reject(error);
};

export default errorHandler;
