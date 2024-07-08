import { RootState } from 'app/providers/StoreProvider';

export const $companiesList = (s: RootState) => s.admin.company.companiesList.content;
export const $companiesTotalCount = (s: RootState) => s.admin.company.companiesList.totalElements;
export const $companyDetails = (s: RootState) => s.admin.company.companyDetails;

export const $isLoading = (s: RootState) => s.admin.company.isLoading;
