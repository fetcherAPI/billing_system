import { AxiosResponse } from 'axios';
import api from 'shared/api/api';
import { ICompany, ICompanyRegister, IResponseList, IUser, IUserRegister } from 'shared/types';
import { IAte } from '../types/Ate.ts';

export class RegisterApi {
    static async getPersonByInn({ INN }: { INN: string }): Promise<AxiosResponse> {
        return api.get<string>(`/api/public/util/getNameByPin?pin=${INN}`);
    }

    static async getAtesById({ ateId }: { ateId: number }): Promise<AxiosResponse> {
        return api.get<IResponseList<IAte>>(`dictionary/ate/children?id=${ateId}&first=0&rows=100`);
    }

    static async registerCompany(params: ICompanyRegister): Promise<AxiosResponse<ICompany>> {
        return api.post<ICompany>(`/api/company/create`, params);
    }

    static async registerUser(
        params: IUserRegister,
        userRole: 'manager' | 'merchant'
    ): Promise<AxiosResponse<IUser>> {
        const url = userRole === 'merchant' ? '/api/user/create' : '/api/company/user/create';
        return api.post<IUser>(url, params);
    }
}
