import { useMutation } from "@tanstack/react-query";
import { authAPI } from "@/api/auth";
import { useRouter } from "expo-router";
import { authStore } from "@/store/authStore";

export const useLogin = () => {
  const router = useRouter();
  const loginToStore = authStore((state) => state.login);

  return useMutation({
    mutationKey: ["login"],
    mutationFn: (auth: TAuth) => {
      return authAPI.login(auth);
    },
    onSuccess: async (user: TUser) => {
      await loginToStore(user.accessToken, user);
      router.push("/(tabs)/home");
    },
    onError: (error) => {
      console.error("Erro ao realizar o login: ", error);
    },
  });
};
