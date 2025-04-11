import { createAsyncThunk } from '@reduxjs/toolkit';
import { UsersApi } from '../api/UsersApi';

export const getCompanyUsers = createAsyncThunk(
    'getCompanyUsers',
    async ({ id }: { id: number }, { rejectWithValue }) => {
        try {
            const response = await UsersApi.getCompanyUsers(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
