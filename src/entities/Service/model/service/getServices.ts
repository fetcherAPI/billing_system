import { createAsyncThunk } from '@reduxjs/toolkit';
import { ServiceApi } from 'entities/Service/api';
import { IPaginationQueryParams } from 'shared/types/baseTypes';

export const getServices = createAsyncThunk(
    'getServices',
    async (param: IPaginationQueryParams, { rejectWithValue }) => {
        try {
            const response = await ServiceApi.getServices(param);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
