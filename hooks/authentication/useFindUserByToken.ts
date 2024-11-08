import { useQuery } from "@tanstack/react-query";
import { authAPI } from "@/api/auth";
import { authStore } from "@/store/authStore";
import { router } from "expo-router";

export const useFindUserByToken = () => {
  const { setUser, logout, user } = authStore((state) => state);

  return useQuery({
    queryKey: ["me"],
    enabled: !user,
    queryFn: async () => {
      const userData = await authAPI.me();
      if (userData) {
        setUser(userData);
        return userData;
      } else {
        logout();
        router.replace("/login");
      }
    },
  });
};
