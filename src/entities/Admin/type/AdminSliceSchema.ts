import { ICompany } from './index.ts'
import { IResponseList } from '../../../shared/types'

export interface IAdminSliceSchema {
    company: ICompanyInSlice
}

interface ICompanyInSlice {
    companiesList: IResponseList<ICompany>
    isLoading: boolean
    error: string | undefined
}
