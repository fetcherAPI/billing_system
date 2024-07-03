import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IRegisterSliceSchema, keyOfRegisterSliceSchema } from 'features/Register/types/SliceSchema'
import { registerCompany } from '../service/registerCompany.ts'
import { errorHandler } from '../../../../shared/lib'
import { AxiosError } from 'axios'
import { ICompanyCreate } from '../../types/Company.ts'

const initialState: IRegisterSliceSchema = {
    registerData: {} as ICompanyCreate,
    isLoading: false,
    error: undefined,
}

export const RegisterSlice = createSlice({
    name: 'RegisterSlice',
    initialState,
    reducers: {
        setRegisterProperty(state, action: PayloadAction<{ key: keyOfRegisterSliceSchema; data: any }>) {
            state.registerData = {
                ...state.registerData,
                [action.payload.key]: action.payload.data,
            }
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(registerCompany.pending, (state) => {
                state.isLoading = true
            })
            .addCase(registerCompany.fulfilled, (state, action) => {
                state.isLoading = false
                state.createdCompanyId = action.payload.id
            })
            .addCase(registerCompany.rejected, (state, action) => {
                state.isLoading = false
                state.error = errorHandler(action.payload as AxiosError)
            })
    },
})

export const { setRegisterProperty } = RegisterSlice.actions
export const RegisterSliceReducer = RegisterSlice.reducer
