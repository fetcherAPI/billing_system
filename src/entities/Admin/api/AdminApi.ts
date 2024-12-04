import { AxiosResponse } from 'axios';
import api from 'shared/api/api';
import { IResponseList } from 'shared/types';
import { ICompany, ICompanyDetails } from '../type';
import { IPaginationQueryParams } from 'shared/types/baseTypes';

export class AdminApi {
    static async getCompanies({
        first,
        rows,
    }: IPaginationQueryParams): Promise<AxiosResponse<IResponseList<ICompany>>> {
        return api.get(`/api/admin/company/getCompany?first=${first - 1}&rows=${rows}`);
    }

    static async getCompanyDetails(id: number): Promise<AxiosResponse<ICompanyDetails>> {
        return api.get(`api/admin/company/${id}`);
    }

    static async activateCompany(id: string): Promise<AxiosResponse<ICompanyDetails>> {
        return api.put(`/api/admin/company/activate/${id}`);
    }
}
