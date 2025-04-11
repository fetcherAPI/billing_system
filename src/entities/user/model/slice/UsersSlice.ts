import { createSlice } from '@reduxjs/toolkit';
import { errorHandler } from 'shared/lib';
import { AxiosError } from 'axios';
import { getCompanyUsers } from '../service/getCompanyUsers.ts';
import { activateUser, deactivateUser } from '../service/activateUser.ts';
import { IUsersSliceSchema } from '../type/UsersSliceSchema.ts';
import { registerUser, updateUser } from '../service/userService.ts';

const initialState: IUsersSliceSchema = {
    isLoading: false,
    error: undefined,
    users: [],
};

const Users = createSlice({
    name: 'Users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCompanyUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCompanyUsers.fulfilled, (state, action) => {
                state.users = action.payload;
                state.isLoading = false;
            })
            .addCase(getCompanyUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = errorHandler(action.payload as AxiosError);
            })
            .addCase(activateUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(activateUser.fulfilled, (state, action) => {
                state.users = state.users.map((obj) => (obj.id === action.payload.id ? action.payload : obj));
                state.isLoading = false;
            })
            .addCase(activateUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = errorHandler(action.payload as AxiosError);
            })
            .addCase(deactivateUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deactivateUser.fulfilled, (state, action) => {
                state.users = state.users.map((obj) => (obj.id === action.payload.id ? action.payload : obj));
                state.isLoading = false;
            })
            .addCase(deactivateUser.rejected, (state, action) => {
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
            })
            ///update user
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.users = state.users.map((obj) => (obj.id === action.payload.id ? action.payload : obj));
                state.isLoading = false;
                state.error = undefined;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = errorHandler(action.payload as AxiosError);
            });
    },
});

export const UsersReducer = Users.reducer;
