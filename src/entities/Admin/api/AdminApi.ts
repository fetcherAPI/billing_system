import { AxiosResponse } from 'axios';
import api from 'shared/api/api';
import { IResponseList } from 'shared/types';
import { ICompany } from '../type';

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

    static async refreshToken(): Promise<AxiosResponse> {
        return api.get(`/api/auth/refresh_token`);
    }
}
