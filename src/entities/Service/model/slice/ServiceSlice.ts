import { createSlice } from '@reduxjs/toolkit';
import { errorHandler } from 'shared/lib';
import { AxiosError } from 'axios';
import { ISerivceSliceSchema } from '../types/sliceSchema.ts';
import { createService } from '../service/createService.ts';
import { getServices } from '../service/getServices.ts';
import { getServiceById } from '../service/getServiceById.ts';

const initialState: ISerivceSliceSchema = {
    serivcesList: [],
    servicesTotalCount: 0,
};

const ServiceSlice = createSlice({
    name: 'ServiceSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createService.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(createService.fulfilled, (state, action) => {
                state.serivcesList = [...state.serivcesList, action.payload];
                state.isLoading = false;
                state.error = undefined;
                state.servicesTotalCount = ++state.servicesTotalCount;
            })
            .addCase(createService.rejected, (state, action) => {
                state.isLoading = false;
                state.error = errorHandler(action.payload as AxiosError);
            })
            .addCase(getServices.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(getServices.fulfilled, (state, action) => {
                state.serivcesList = action.payload.content;
                state.isLoading = false;
                state.error = undefined;
                state.servicesTotalCount = action.payload.totalElements;
            })
            .addCase(getServices.rejected, (state, action) => {
                state.isLoading = false;
                state.error = errorHandler(action.payload as AxiosError);
            })
            //getServiceById
            .addCase(getServiceById.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(getServiceById.fulfilled, (state, action) => {
                state.service = action.payload;
                state.isLoading = false;
                state.error = undefined;
            })
            .addCase(getServiceById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = errorHandler(action.payload as AxiosError);
            });
    },
});

export const ServiceSliceReducer = ServiceSlice.reducer;
