import { createAsyncThunk } from '@reduxjs/toolkit';
import { RegisterApi } from '../../api/RegisterApi.ts';
import { ICompanyRegister } from 'shared/types';

export const registerCompany = createAsyncThunk(
    'registerCompany',
    async ({ param }: { param: ICompanyRegister }, { rejectWithValue }) => {
        try {
            const response = await RegisterApi.registerCompany(param);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const updateCompany = createAsyncThunk(
    'updateCompany',
    async ({ param, companyId }: { param: ICompanyRegister; companyId: number }, { rejectWithValue }) => {
        try {
            const response = await RegisterApi.updateCompany(param, companyId);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
