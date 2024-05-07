import { REFRESH_TOKEN, TOKEN } from "../const/localstorage";

export const onSuccessLogin = (token: string) => {
  localStorage.setItem(TOKEN, token);
};

export const onFailedLogin = () => {
  localStorage.removeItem(TOKEN);
};

export const tokenAvailability = () => {
  return localStorage.getItem(TOKEN);
};

export const refreshTokenAvailability = () => {
  return localStorage.getItem(REFRESH_TOKEN);
};
