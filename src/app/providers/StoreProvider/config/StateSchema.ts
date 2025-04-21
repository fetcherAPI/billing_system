import { AxiosInstance } from 'axios';
import { CounterSchema } from 'entities/Counter';
import { ILoginSliceSchema } from 'features/Auth/types/SliceSchema';
import { IRegisterSliceSchema } from 'features/Register';
import { IAdminSliceSchema } from 'entities/Admin';
import { ISerivceSliceSchema } from 'entities/Service/model/types/sliceSchema';
import { IPaymentCodesSliceSchema } from 'entities/PaymentCodes/model/types/sliceSchema';
import { IUsersSliceSchema } from 'entities/user/model/type/UsersSliceSchema';

export interface StateSchema {
    counter: CounterSchema;
    login: ILoginSliceSchema;
    register: IRegisterSliceSchema;
    users: IUsersSliceSchema;
    admin: IAdminSliceSchema;
    service: ISerivceSliceSchema;
    paymentCode: IPaymentCodesSliceSchema;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
}
