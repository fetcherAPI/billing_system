import { createAsyncThunk } from '@reduxjs/toolkit';
import { PaymentCodeApi } from 'entities/PaymentCodes/api';

export const checkPayment = createAsyncThunk(
    'checkPayment',
    async ({ orderId }: { orderId: string }, { rejectWithValue }) => {
        try {
            const response = await PaymentCodeApi.checkPayment(orderId);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
