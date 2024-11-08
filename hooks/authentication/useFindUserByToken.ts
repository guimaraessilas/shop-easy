import { useQuery } from "@tanstack/react-query";
import { authAPI } from "@/api/auth";
import { authStore } from "@/store/authStore";

export const useFindUserByToken = () => {
  const { setUser, logout } = authStore((state) => state);

  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const user = await authAPI.me();
      if (user) {
        setUser(user);
      } else {
        logout();
      }
    },
  });
};
