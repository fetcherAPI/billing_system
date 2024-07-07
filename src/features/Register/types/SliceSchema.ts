import { ICompanyRegister, IUserRegister } from 'shared/types';

export interface IRegisterSliceSchema {
    companyData: ICompanyRegister;
    userData: IUserRegister;
    createdCompanyId?: string;
    isLoading: boolean;
    error: string | undefined;
}

export type keyOfRegisterSliceSchema = keyof ICompanyRegister;

export type keyOfUserRegister = keyof IUserRegister;
