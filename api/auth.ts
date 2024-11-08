import client from "./client";

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
