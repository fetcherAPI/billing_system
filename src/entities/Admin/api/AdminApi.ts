import { AxiosResponse } from 'axios';
import api from 'shared/api/api';
import { IResponseList } from 'shared/types';
import { ICompany, ICompanyDetails } from '../type';

export class AdminApi {
    static async getCompanies({
        first,
        row,
    }: {
        first: number;
        row: number;
    }): Promise<AxiosResponse<IResponseList<ICompany>>> {
        return api.get(`/api/admin/company/getCompany?first=${first - 1}&rows=${row}`);
    }

    static async getCompanyDetails(id: number): Promise<AxiosResponse<ICompanyDetails>> {
        return api.get(`api/admin/company/${id}`);
    }
}
