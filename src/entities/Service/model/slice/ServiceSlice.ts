import { createSlice } from '@reduxjs/toolkit';
import { errorHandler } from 'shared/lib';
import { AxiosError } from 'axios';
import { ISerivceSliceSchema } from '../types/sliceSchema.ts';
import { createService } from '../service/createService.ts';
import { getServices } from '../service/getServices.ts';
import { getServiceById } from '../service/getServiceById.ts';
import { getSplittersByChapterId } from '../service/getSplittersByChapterId.ts';
import { createSplitter } from '../service/createSplitter.ts';
import { getServicesByParentId } from '../service/getServicesByParentId.ts';

const initialState: ISerivceSliceSchema = {
    serivcesList: [],
    splitters: [],
    servicesTotalCount: 0,
    nodes: {},
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
            })
            // getSplittersByChapterId
            .addCase(getSplittersByChapterId.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(getSplittersByChapterId.fulfilled, (state, action) => {
                state.splitters = action.payload;
                state.isLoading = false;
                state.error = undefined;
            })
            .addCase(getSplittersByChapterId.rejected, (state, action) => {
                state.isLoading = false;
                state.error = errorHandler(action.payload as AxiosError);
            })
            // createSplitter
            .addCase(createSplitter.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(createSplitter.fulfilled, (state, action) => {
                state.splitters = [action.payload, ...state.splitters];
                state.isLoading = false;
                state.error = undefined;
            })
            .addCase(createSplitter.rejected, (state, action) => {
                state.isLoading = false;
                state.error = errorHandler(action.payload as AxiosError);
            })
            //getServicesByParentId
            .addCase(getServicesByParentId.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(getServicesByParentId.fulfilled, (state, action) => {
                const { parentId, children } = action.payload;
                children.data.content.forEach((child) => {
                    state.nodes[child.id] = {
                        ...child,
                        children: state.nodes[child.id]?.children || [],
                    };
                });

                if (parentId !== null && parentId !== undefined) {
                    const parent = state.nodes[parentId];
                    if (parent) {
                        parent.children = children.data.content.map((child) => state.nodes[child.id]);
                    }
                }
                state.servicesTotalCount = action.payload.children.data.totalElements;
                state.isLoading = false;
                state.error = undefined;
            })
            .addCase(getServicesByParentId.rejected, (state, action) => {
                state.isLoading = false;
                state.error = errorHandler(action.payload as AxiosError);
            });
    },
});

export const ServiceSliceReducer = ServiceSlice.reducer;
