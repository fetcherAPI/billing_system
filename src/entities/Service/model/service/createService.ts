import { createAsyncThunk } from '@reduxjs/toolkit';
import { ServiceApi } from 'entities/Service/api';
import { ICreateServiceDto, IUpdateService } from '../types/service';

export const createService = createAsyncThunk(
    'createService',
    async (param: ICreateServiceDto, { rejectWithValue }) => {
        try {
            const response = await ServiceApi.createService(param);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const updateService = createAsyncThunk(
    'updateService',
    async (param: IUpdateService, { rejectWithValue }) => {
        try {
            const response = await ServiceApi.updateService(param);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
