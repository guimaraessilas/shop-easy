import { TAuth } from "@/types/TAuth";
import client from "./client";

export const authAPI = {
  login: async (data: TAuth) => {
    const response = await client({
      method: "post",
      url: "/auth/login",
      data,
    });
    return response;
  },
};
