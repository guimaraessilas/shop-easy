type TUser = {
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  id: number;
  image: string;
} & TAuth &
  TAuthTokens;
