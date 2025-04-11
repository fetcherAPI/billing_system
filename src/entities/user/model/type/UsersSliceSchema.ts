import { IUser } from 'shared/types';

export interface IUsersSliceSchema {
    isLoading: boolean;
    error?: string | undefined;
    users: IUser[];
}
