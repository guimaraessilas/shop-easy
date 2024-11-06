import { TAuth } from "./TAuth";

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
