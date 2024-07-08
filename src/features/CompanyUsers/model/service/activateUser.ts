import { createAsyncThunk } from '@reduxjs/toolkit';
import { CompanyUsersApi } from '../../api/CompanyUsersApi.ts';

export const activateUser = createAsyncThunk(
    'activateUser',
    async ({ id }: { id: number }, { rejectWithValue }) => {
        try {
            const response = await CompanyUsersApi.activateUser(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const deactivateUser = createAsyncThunk(
    'deactivateUser',
    async ({ id }: { id: number }, { rejectWithValue }) => {
        try {
            const response = await CompanyUsersApi.deactivateUser(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
