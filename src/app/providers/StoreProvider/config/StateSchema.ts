import { AxiosInstance } from 'axios'
import { CounterSchema } from 'entities/Counter'
import { ILoginSliceSchema } from 'features/Login/types/SliceSchema'
import { IRegisterSliceSchema } from 'features/Register'
import { IAdminSliceSchema } from 'entities/Admin/type/AdminSliceSchema.ts'

export interface StateSchema {
    counter: CounterSchema
    login: ILoginSliceSchema
    register: IRegisterSliceSchema
    admin: IAdminSliceSchema
}

export interface ThunkExtraArg {
    api: AxiosInstance
}

export interface ThunkConfig<T> {
    rejectValue: T
    extra: ThunkExtraArg
}
