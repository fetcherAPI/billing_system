import { createAsyncThunk } from '@reduxjs/toolkit';
import { CompanyUsersApi } from '../../api/CompanyUsersApi.ts';

export const getCompanyUsers = createAsyncThunk(
    'getCompanyUsers',
    async ({ id }: { id: number }, { rejectWithValue }) => {
        try {
            const response = await CompanyUsersApi.getCompanyUsers(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);