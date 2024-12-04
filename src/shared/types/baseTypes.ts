import { AxiosError } from 'axios';

export interface IBaseSliceSchema {
    isLoading: boolean;
    error: string | undefined | AxiosError;
}

export interface IBaseProps {
    className?: string;
}

export interface IPaginationQueryParams {
    first: number;
    rows: number;
}

export type UserRoles = 'manager' | 'merchant' | 'admin';
