import { createAsyncThunk } from '@reduxjs/toolkit';
import { ServiceApi } from 'entities/Service/api';
import { ISplitterCreateDto } from '../types/splitter';

export const createSplitter = createAsyncThunk(
    'createSplitter',
    async (param: ISplitterCreateDto, { rejectWithValue }) => {
        try {
            const response = await ServiceApi.createSplitter(param);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
