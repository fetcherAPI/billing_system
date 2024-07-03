import $api from 'shared/api/api'
import { configureStore } from '@reduxjs/toolkit'
import { StateSchema } from './StateSchema'
import { counterReducer } from 'entities/Counter/'
import { useDispatch } from 'react-redux'
import { LoginSliceReducer } from 'features/Login'
import { RegisterSliceReducer } from 'features/Register'
import { AdminSliceReducer } from 'entities/Admin/model/slice/AdminSlice.ts'

export function createReduxStore(initialState?: StateSchema) {
    return configureStore({
        reducer: {
            counter: counterReducer,
            login: LoginSliceReducer,
            register: RegisterSliceReducer,
            admin: AdminSliceReducer,
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
    })
}

const store = createReduxStore()

export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
