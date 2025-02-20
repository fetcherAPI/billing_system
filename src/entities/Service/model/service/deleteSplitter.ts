import { createAsyncThunk } from '@reduxjs/toolkit';
import { ServiceApi } from 'entities/Service/api';

export const deleteSplitter = createAsyncThunk(
    'deleteSplitter',
    async ({ splitterId }: { splitterId: number }, { rejectWithValue }) => {
        try {
            const response = await ServiceApi.deleteSplitter(splitterId);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
