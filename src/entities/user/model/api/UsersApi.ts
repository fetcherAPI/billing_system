import { AxiosResponse } from 'axios';
import api from 'shared/api/api';
import { IUser, IUserRegister } from 'shared/types';
import { UserRoles } from 'shared/types/baseTypes';

export class UsersApi {
    static async getCompanyUsers(id: number): Promise<AxiosResponse<Array<IUser>>> {
        return api.get(`/api/user/listByCompanyId/${id}`);
    }

    static async activateUser(id: number): Promise<AxiosResponse<IUser>> {
        return api.put(`/api/user/activate/${id}`);
    }

    static async deactivateUser(id: number): Promise<AxiosResponse<IUser>> {
        return api.put(`/api/user/deactivate/${id}`);
    }

    static async registerUser(params: IUserRegister, userRole: UserRoles): Promise<AxiosResponse<IUser>> {
        const url = userRole === 'merchant' ? '/api/user/create' : '/api/company/user/create';
        return api.post<IUser>(url, params);
    }

    static async updateUser(params: IUserRegister, userId: number): Promise<AxiosResponse<IUser>> {
        return api.put<IUser>(`/api/user/updateUser/${userId}`, params);
    }

    static async deleteUser(id: number): Promise<AxiosResponse<IUser>> {
        return api.delete<IUser>(`/api/user/${id}`);
    }
}
