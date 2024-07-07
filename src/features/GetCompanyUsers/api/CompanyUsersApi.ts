import { AxiosResponse } from 'axios';
import api from 'shared/api/api';
import { IUser } from '../../../shared/types';

export class CompanyUsersApi {
    static async getCompanyUsers(id: number): Promise<AxiosResponse<Array<IUser>>> {
        return api.get(`/api/user/listByCompanyId/{companyId}?companyId=${id}`);
    }
}
