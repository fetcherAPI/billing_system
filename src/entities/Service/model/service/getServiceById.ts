import { createAsyncThunk } from '@reduxjs/toolkit';
import { ServiceApi } from 'entities/Service/api';

export const getServiceById = createAsyncThunk(
    'getServiceById',
    async ({ id }: { id: number }, { rejectWithValue }) => {
        try {
            const response = await ServiceApi.getServiceById(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
