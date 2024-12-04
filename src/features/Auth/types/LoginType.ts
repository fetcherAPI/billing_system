import { UserRoles } from 'shared/types/baseTypes.ts';

export interface ILogin {
    username: string;
    password: string;
}

export interface ILoginResponse {
    token: string;
    type: string;
    role: UserRoles;
    userId: number;
    username: string;
    expiryDate: Date;
    currentTime: Date;
    companyId: number;
}
