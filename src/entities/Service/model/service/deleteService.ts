import { createAsyncThunk } from '@reduxjs/toolkit';
import { ServiceApi } from 'entities/Service/api';

export const deleteService = createAsyncThunk(
    'delete',
    async ({ id }: { id: number }, { rejectWithValue }) => {
        try {
            const response = await ServiceApi.deleteService(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
