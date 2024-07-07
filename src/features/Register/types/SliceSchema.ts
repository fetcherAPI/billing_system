import { ICompanyRegister } from './Company.ts';
import { IUserRegister } from './User.ts';

export interface IRegisterSliceSchema {
    companyData: ICompanyRegister;
    userData: IUserRegister;
    createdCompanyId?: string;
    isLoading: boolean;
    error: string | undefined;
}

export type keyOfRegisterSliceSchema = keyof ICompanyRegister;

export type keyOfUserRegister = keyof IUserRegister;
