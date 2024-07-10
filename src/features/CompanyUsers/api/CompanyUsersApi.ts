import { AxiosResponse } from 'axios';
import api from 'shared/api/api';
import { IUser } from 'shared/types';

export class CompanyUsersApi {
    static async getCompanyUsers(id: number): Promise<AxiosResponse<Array<IUser>>> {
        return api.get(`/api/user/listByCompanyId/${id}`);
    }

    static async activateUser(id: number): Promise<AxiosResponse<IUser>> {
        return api.put(`/api/user/activate/${id}`);
    }

    static async deactivateUser(id: number): Promise<AxiosResponse<IUser>> {
        return api.put(`/api/user/deactivate/${id}`);
    }
}
