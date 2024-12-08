import { createSlice } from '@reduxjs/toolkit';
import { errorHandler } from 'shared/lib';
import { AxiosError } from 'axios';
import { IPaymentCodesSliceSchema } from '../types/sliceSchema';
import { getPaymentCodes } from '../service/getPaymentCodes';

const initialState: IPaymentCodesSliceSchema = {
    isLoading: false,
    error: undefined,
    paymentCodes: [],
    totalCount: 0,
};

const PaymentCodesSlice = createSlice({
    name: 'PaymentCodesSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPaymentCodes.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(getPaymentCodes.fulfilled, (state, action) => {
                state.paymentCodes = action.payload.content;
                state.isLoading = false;
                state.error = undefined;
                state.totalCount = action.payload.totalElements;
            })
            .addCase(getPaymentCodes.rejected, (state, action) => {
                state.isLoading = false;
                state.error = errorHandler(action.payload as AxiosError);
            });
    },
});

export const PaymentCodesSliceReducer = PaymentCodesSlice.reducer;
