import { TAuth } from "@/types/TAuth";
import client from "./client";
import { TUser } from "@/types/TUser";

export const authAPI = {
  login: async (data: TAuth): Promise<TUser> => {
    const response = await client({
      method: "post",
      url: "/auth/login",
      data,
    });
    return response;
  },
};
