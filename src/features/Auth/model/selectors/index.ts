import { RootState } from 'app/providers/StoreProvider';

export const $userRole = (state: RootState) => state.login.userData?.role;

export const $isAuth = (s: RootState) => s.login.isAuth;

export const $userCompanyId = (s: RootState) => s.login.userData?.companyId;

export const $userName = (s: RootState) => s.login.userData?.username;
