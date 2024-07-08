import { createSlice } from '@reduxjs/toolkit';
import { errorHandler } from 'shared/lib';
import { AxiosError } from 'axios';
import { IResponseList } from 'shared/types';
import { ICompany, ICompanyDetails } from '../../type';
import { IAdminSliceSchema } from '../../type/AdminSliceSchema.ts';
import { getCompanies, getCompanyDetails } from '../service/getCompanies.ts';
import { activateCompany } from '../service/activateCompany.ts';

const initialState: IAdminSliceSchema = {
    company: {
        companiesList: {} as IResponseList<ICompany>,
        companyDetails: {} as ICompanyDetails,
        isLoading: false,
        error: '',
    },
};

const AdminSlice = createSlice({
    name: 'AdminSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCompanies.pending, (state) => {
                state.company.isLoading = true;
            })
            .addCase(getCompanies.fulfilled, (state, action) => {
                state.company.companiesList = action.payload;
                state.company.isLoading = false;
            })
            .addCase(getCompanies.rejected, (state, action) => {
                state.company.isLoading = false;
                state.company.error = errorHandler(action.payload as AxiosError);
            })
            .addCase(getCompanyDetails.pending, (state) => {
                state.company.isLoading = true;
            })
            .addCase(getCompanyDetails.fulfilled, (state, action) => {
                state.company.companyDetails = action.payload;
                state.company.isLoading = false;
            })
            .addCase(getCompanyDetails.rejected, (state, action) => {
                state.company.isLoading = false;
                state.company.error = errorHandler(action.payload as AxiosError);
            })
            .addCase(activateCompany.pending, (state) => {
                state.company.isLoading = true;
            })
            .addCase(activateCompany.fulfilled, (state, action) => {
                state.company.companyDetails = action.payload;
                state.company.isLoading = false;
            })
            .addCase(activateCompany.rejected, (state, action) => {
                state.company.isLoading = false;
                state.company.error = errorHandler(action.payload as AxiosError);
            });
    },
});

export const AdminSliceReducer = AdminSlice.reducer;
