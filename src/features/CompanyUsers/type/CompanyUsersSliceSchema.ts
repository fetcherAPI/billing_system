import { IUser } from 'shared/types';

export interface ICompanyUsersSliceSchema {
    isLoading: boolean;
    error?: string | undefined;
    users: IUser[];
}
