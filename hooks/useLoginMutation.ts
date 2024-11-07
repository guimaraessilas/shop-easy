import { useMutation } from "@tanstack/react-query";
import { authAPI } from "@/api/auth";
import { TAuth } from "@/types/TAuth";
import { TUser } from "@/types/TUser";
import { useRouter } from "expo-router";

export const useAuth = () => {
  const router = useRouter();

  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: (auth: TAuth) => {
      return authAPI.login(auth);
    },
    onSuccess: (user: TUser) => {
      // TODO: adicionar user ao zustand
      // TODO: armazenar accessKey on SecureAsyncStore
      router.push("product/list");
    },
    onError: (error: any) => alert("Erro ao realizar o login"),
  });

  return {
    auth: {
      mutate: loginMutation.mutate,
      isLoading: loginMutation.isPending,
      error: loginMutation.error,
    },
  };
};
