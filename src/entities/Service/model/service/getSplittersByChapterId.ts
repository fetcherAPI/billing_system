import { createAsyncThunk } from '@reduxjs/toolkit';
import { ServiceApi } from 'entities/Service/api';

export const getSplittersByChapterId = createAsyncThunk(
    'getSplittersByChapterId',
    async ({ id }: { id: number }, { rejectWithValue }) => {
        try {
            const response = await ServiceApi.getSplittersByChapterId(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
