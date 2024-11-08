import client from "./client";

export const authAPI = {
  login: async (data: TAuth): Promise<TUser> => {
    return client({
      method: "post",
      url: "/auth/login",
      data,
    });
  },
  me: async (): Promise<TUser> => {
    return client({
      method: "get",
      url: "/auth/me",
    });
  },
  refresh: async (data: Partial<TAuthTokens>): Promise<TAuthTokens> => {
    return client({
      method: "post",
      url: "/auth/refresh",
      data,
    });
  },
};
