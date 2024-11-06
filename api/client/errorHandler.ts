import { HttpStatusCode } from "axios";
import { Alert } from "react-native";

const errorHandler = (error: TErrorResponse, handleError: boolean) => {
  if (!handleError) {
    return Promise.reject(error);
  }

  const { response } = error;

  if (Number(response?.status) >= HttpStatusCode.BadRequest) {
    Alert.alert(
      "Opss...",
      "Ocorreu um erro ao tentar realizar a requisição. Tente novamente mais tarde!"
    );
  } else {
    Alert.alert("Opss...", "Ocorreu um erro inesperado");
  }

  return Promise.reject(error);
};

export default errorHandler;
