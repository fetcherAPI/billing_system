import { createAsyncThunk } from '@reduxjs/toolkit';
import { PaymentCodeApi } from 'entities/PaymentCodes/api';
import { IPaginationQueryParams } from 'shared/types/baseTypes';

export const getPaymentCodes = createAsyncThunk(
    'getPaymentCodes',
    async (param: IPaginationQueryParams, { rejectWithValue }) => {
        try {
            const response = await PaymentCodeApi.getPaymentCodes(param);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
