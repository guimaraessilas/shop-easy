import { useMutation } from "@tanstack/react-query";
import { authAPI } from "@/api/auth";
import { useRouter } from "expo-router";
import { authStore } from "@/store/authStore";

export const useLogin = () => {
  const router = useRouter();
  const { login } = authStore((state) => state);

  return useMutation({
    mutationKey: ["login"],
    mutationFn: (auth: TAuth) => {
      return authAPI.login(auth);
    },
    onSuccess: async (user: TUser) => {
      login(user);
      router.push("/(tabs)/home");
    },
    onError: (error) => {
      throw new Error(String(error));
    },
  });
};
