import { ICompanyCreate } from './Company.ts'

export interface IRegisterSliceSchema {
    registerData: ICompanyCreate
    createdCompanyId?: string
    isLoading: boolean
    error: string | undefined
}

export type keyOfRegisterSliceSchema = keyof ICompanyCreate
