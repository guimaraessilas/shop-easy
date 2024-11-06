import client from "./client";

type TAuth = {
  username: string;
  password: string;
};

export type TUser = {
  accessToken: string;
  refreshToken: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  id: number;
  image: string;
} & TAuth;

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
