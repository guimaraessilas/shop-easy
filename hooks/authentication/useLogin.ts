import { useMutation } from "@tanstack/react-query";
import { authAPI } from "@/api/auth";
import { TAuth } from "@/types/TAuth";
import { TUser } from "@/types/TUser";
import { useRouter } from "expo-router";

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: (auth: TAuth) => {
      return authAPI.login(auth);
    },
    onSuccess: (user: TUser) => {
      // TODO: adicionar user ao zustand
      // TODO: armazenar accessKey on SecureAsyncStore
      router.push("/(tabs)/home");
    },
    onError: (error) => {
      console.error("Erro ao realizar o login: ", error);
    },
  });
};
