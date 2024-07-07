import { createSlice } from '@reduxjs/toolkit';
import { errorHandler } from 'shared/lib';
import { AxiosError } from 'axios';
import { ICompanyUsersSliceSchema } from '../../type/CompanyUsersSliceSchema.ts';
import { getCompanyUsers } from '../service/getCompanyUsers.ts';


const initialState: ICompanyUsersSliceSchema = {
    isLoading: false,
    error: undefined,
    users: [],
};

const CompanyUsers = createSlice({
    name: 'CompanyUsers',
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
            });
    },
});

export const CompanyUsersReducer = CompanyUsers.reducer;
