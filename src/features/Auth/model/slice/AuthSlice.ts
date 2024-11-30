import { createSlice } from '@reduxjs/toolkit';
import { login } from '../service/LoginService';
import { ILoginSliceSchema } from '../../types/SliceSchema';
import { errorHandler } from 'shared/lib';
import { AxiosError } from 'axios';
import { onFailedLogin, onSuccessLogin } from 'shared/lib/sideEffects/sideEffects';
import { refreshToken } from '../service/refreshToken';

const initialState: ILoginSliceSchema = {
    isLoading: false,
    error: undefined,
    isAuth: false,
};

const AuthSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.userData = action.payload;
                state.isLoading = false;
                state.isAuth = true;
                onSuccessLogin(action.payload.token);
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isAuth = false;
                state.error = errorHandler(action.payload as AxiosError);
                onFailedLogin();
            })
            .addCase(refreshToken.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.userData = action.payload;
                state.isLoading = false;
                state.isAuth = true;
                onSuccessLogin(action.payload.token);
            })
            .addCase(refreshToken.rejected, (state, action) => {
                state.isLoading = false;
                state.isAuth = false;
                state.error = errorHandler(action.payload as AxiosError);
                onFailedLogin();
            });
    },
});

export const LoginSliceReducer = AuthSlice.reducer;
