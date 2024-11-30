import { AxiosInstance } from 'axios';
import { CounterSchema } from 'entities/Counter';
import { ILoginSliceSchema } from 'features/Auth/types/SliceSchema';
import { IRegisterSliceSchema } from 'features/Register';
import { ICompanyUsersSliceSchema } from 'features/CompanyUsers';
import { IAdminSliceSchema } from 'entities/Admin';

export interface StateSchema {
    counter: CounterSchema;
    login: ILoginSliceSchema;
    register: IRegisterSliceSchema;
    users: ICompanyUsersSliceSchema;
    admin: IAdminSliceSchema;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
}
