export interface ILogin {
  username: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  type: string;
  role: string;
  userId: number;
  username: string;
  expiryDate: Date;
  currentTime: Date;
}
