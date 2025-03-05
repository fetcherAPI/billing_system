import { COMPANY_ID, TOKEN } from '../const/localstorage';

export const onSuccessLogin = (token: string, companyId: number) => {
    localStorage.setItem(COMPANY_ID, companyId.toString());
    localStorage.setItem(TOKEN, token);
};

export const onFailedLogin = () => {
    localStorage.removeItem(TOKEN);
};

export const tokenAvailability = () => {
    return localStorage.getItem(TOKEN);
};

export const companyIdLocalStore = () => {
    return localStorage.getItem(COMPANY_ID);
};
