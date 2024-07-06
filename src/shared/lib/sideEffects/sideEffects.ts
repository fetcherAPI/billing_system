import { TOKEN } from '../const/localstorage';

export const onSuccessLogin = (token: string) => {
    localStorage.setItem(TOKEN, token);
};

export const onFailedLogin = () => {
    localStorage.removeItem(TOKEN);
};

export const tokenAvailability = () => {
    return localStorage.getItem(TOKEN);
};
