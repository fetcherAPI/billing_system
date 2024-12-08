import $api from 'shared/api/api';
import { configureStore } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { counterReducer } from 'entities/Counter/';
import { useDispatch } from 'react-redux';
import { LoginSliceReducer } from 'features/Auth';
import { RegisterSliceReducer } from 'features/Register';
import { AdminSliceReducer } from 'entities/Admin/model/slice/AdminSlice.ts';
import { CompanyUsersReducer } from 'features/CompanyUsers';
import { ServiceSliceReducer } from 'entities/Service/model/slice/ServiceSlice';
import { PaymentCodesSliceReducer } from 'entities/PaymentCodes/model/slice/PaymentCodesSlice';

export function createReduxStore(initialState?: StateSchema) {
    return configureStore({
        reducer: {
            counter: counterReducer,
            login: LoginSliceReducer,
            register: RegisterSliceReducer,
            users: CompanyUsersReducer,
            admin: AdminSliceReducer,
            service: ServiceSliceReducer,
            paymentCode: PaymentCodesSliceReducer,
        },
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument: {
                        api: $api,
                    },
                },
            }),
    });
}

const store = createReduxStore();

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
