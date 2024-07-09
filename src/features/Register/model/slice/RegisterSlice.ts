import { AxiosError } from 'axios';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { errorHandler } from 'shared/lib';
import { IRegisterSliceSchema, keyOfRegisterSliceSchema, keyOfUserRegister } from '../../types/SliceSchema';
import { registerCompany, registerUser } from '../service/registerCompany.ts';
import { ICompanyRegister, IUserRegister } from 'shared/types';

interface IRegisterPayload<T> {
    key: T;
    data: any;
    type: 'User' | 'Company';
}

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
        /**
         * Updates the state based on the provided action payload.
         *
         * @param {IRegisterSliceSchema} state - The current state of the slice.
         * @param {PayloadAction<IRegisterPayload<keyOfRegisterSliceSchema | keyOfUserRegister>>} action - The action containing the payload to update the state.
         * @param {string} action.type - The type of the entity being updated ('User' or 'Company').
         * @param {IRegisterPayload<keyOfRegisterSliceSchema | keyOfUserRegister>} action.payload - The payload containing the key and data to update.
         * @param {string} action.payload.key - The key of the property to update.
         * @param {any} action.payload.data - The data to set for the specified key.
         */
        setRegisterProperty(
            state: IRegisterSliceSchema,
            action: PayloadAction<IRegisterPayload<keyOfRegisterSliceSchema | keyOfUserRegister>>
        ) {
            switch (action.payload.type) {
                case 'User':
                    state.userData = {
                        ...state.userData,
                        [action.payload.key]: action.payload.data,
                    };
                    break;
                case 'Company':
                    state.companyData = {
                        ...state.companyData,
                        [action.payload.key]: action.payload.data,
                    };
                    break;
                default:
                    throw new Error('Unknown action type');
            }
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(registerCompany.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(registerCompany.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = undefined;
                state.createdCompanyId = action.payload.id;
                state.userData.companyId = +action.payload.id;
            })
            .addCase(registerCompany.rejected, (state, action) => {
                state.isLoading = false;
                state.error = errorHandler(action.payload as AxiosError);
            })
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.isLoading = false;
                state.error = undefined;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = errorHandler(action.payload as AxiosError);
            });
    },
});

export const { setRegisterProperty } = RegisterSlice.actions;
export const RegisterSliceReducer = RegisterSlice.reducer;
