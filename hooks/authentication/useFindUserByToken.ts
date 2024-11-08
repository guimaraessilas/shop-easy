import { useQuery } from "@tanstack/react-query";
import { authAPI } from "@/api/auth";
import { authStore } from "@/store/authStore";

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
      }
    },
  });
};
