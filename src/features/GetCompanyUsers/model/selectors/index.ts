import { RootState } from 'app/providers/StoreProvider';

export const $companyUsers = (s: RootState) => s.users.users;

export const $isLoading = (s: RootState) => s.users.isLoading;

export const $error = (s: RootState) => s.users.error;