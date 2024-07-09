import { createAsyncThunk } from '@reduxjs/toolkit';
import { RegisterApi } from '../../api/RegisterApi.ts';
import { ICompanyRegister, IUserRegister } from 'shared/types';

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

export const registerUser = createAsyncThunk(
    'registerUser',
    async (
        { param, userRole }: { param: IUserRegister; userRole: 'manager' | 'merchant' },
        { rejectWithValue }
    ) => {
        try {
            const response = await RegisterApi.registerUser(param, userRole);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
