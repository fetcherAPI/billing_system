import { ICompany, ICompanyDetails } from './index.ts';
import { IResponseList } from '../../../shared/types';

export interface IAdminSliceSchema {
    company: ICompanyInSlice;
}

interface ICompanyInSlice {
    companiesList: IResponseList<ICompany>;
    companyDetails: ICompanyDetails;
    isLoading: boolean;
    error: string | undefined;
}
