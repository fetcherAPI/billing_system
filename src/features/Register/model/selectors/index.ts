import { RootState } from 'app/providers/StoreProvider';

export const $registerData = (state: RootState) => state.register.companyData;

export const $createdCompanyId = (state: RootState) => state.register.createdCompanyId;

export const $registerUserData = (s: RootState) => s.register.userData;
