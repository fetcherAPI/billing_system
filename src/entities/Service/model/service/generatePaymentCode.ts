import { createAsyncThunk } from '@reduxjs/toolkit';
import { ServiceApi } from 'entities/Service/api';
import { IGeneratePaymentCodeDto } from '../types/generatePaymentCode';

export const generatePaymentCode = createAsyncThunk(
    'generatePaymentCode',
    async (param: IGeneratePaymentCodeDto, { rejectWithValue }) => {
        try {
            const response = await ServiceApi.generatePaymentCode(param);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
