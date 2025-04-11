import { createAsyncThunk } from '@reduxjs/toolkit';
import { ServiceApi } from 'entities/Service/api';

export const deleteService = createAsyncThunk(
    'delete/service',
    async ({ id }: { id: number }, { rejectWithValue }) => {
        try {
            await ServiceApi.deleteService(id);
            return id;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
