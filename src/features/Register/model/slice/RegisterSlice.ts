import { AxiosError } from 'axios';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { errorHandler } from 'shared/lib';
import { IRegisterSliceSchema, keyOfRegisterSliceSchema } from '../../types/SliceSchema';
import { registerCompany } from '../service/registerCompany.ts';
import { ICompanyRegister } from '../../types/Company.ts';
import { IUserRegister } from 'features/Register/types/User.ts';

const initialState: IRegisterSliceSchema = {
    companyData: {} as ICompanyRegister,
    userData: {} as IUserRegister,
    isLoading: false,
    error: undefined,
};

export const RegisterSlice = createSlice({
    name: 'RegisterSlice',
    initialState,
    reducers: {
        setRegisterProperty(state, action: PayloadAction<{ key: keyOfRegisterSliceSchema; data: any }>) {
            state.companyData = {
                ...state.companyData,
                [action.payload.key]: action.payload.data,
            };
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(registerCompany.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerCompany.fulfilled, (state, action) => {
                state.isLoading = false;
                state.createdCompanyId = action.payload.id;
            })
            .addCase(registerCompany.rejected, (state, action) => {
                state.isLoading = false;
                state.error = errorHandler(action.payload as AxiosError);
            });
    },
});

export const { setRegisterProperty } = RegisterSlice.actions;
export const RegisterSliceReducer = RegisterSlice.reducer;
