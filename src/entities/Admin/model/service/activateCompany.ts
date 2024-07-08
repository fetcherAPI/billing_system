import { createAsyncThunk } from '@reduxjs/toolkit';
import { AdminApi } from '../../api/AdminApi.ts';

export const activateCompany = createAsyncThunk(
    'activateCompany',
    async ({ id }: { id: string }, { rejectWithValue }) => {
        try {
            const response = await AdminApi.activateCompany(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
