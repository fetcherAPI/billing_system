import { createSlice } from '@reduxjs/toolkit';
import { errorHandler } from 'shared/lib';
import { AxiosError } from 'axios';
import { ISerivceSliceSchema } from '../types/sliceSchema.ts';
import { createService, updateService } from '../service/createService.ts';
import { getServices } from '../service/getServices.ts';
import { getServiceById } from '../service/getServiceById.ts';
import { getSplittersByChapterId } from '../service/getSplittersByChapterId.ts';
import { createSplitter } from '../service/createSplitter.ts';
import { getServicesByParentId } from '../service/getServicesByParentId.ts';
import { IService } from '../types/service.ts';
import { deleteService } from '../service/deleteService.ts';

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

            //delete
            .addCase(deleteService.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(deleteService.fulfilled, (state, action) => {
                console.log('action', action);
                delete state.nodes[action.payload];
                state.isLoading = false;
                state.error = undefined;
                state.nodes = { ...state.nodes };
                state.servicesTotalCount = --state.servicesTotalCount;
            })
            .addCase(deleteService.rejected, (state, action) => {
                state.isLoading = false;
                state.error = errorHandler(action.payload as AxiosError);
            })
            //create
            .addCase(createService.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(createService.fulfilled, (state, action) => {
                state.serivcesList = [...state.serivcesList, action.payload];
                if (!action.payload.parentId) {
                    state.nodes = { firstLevel: [...state.nodes['firstLevel'], action.payload] };
                }
                state.isLoading = false;
                state.error = undefined;
                state.servicesTotalCount = ++state.servicesTotalCount;
            })
            .addCase(createService.rejected, (state, action) => {
                state.isLoading = false;
                state.error = errorHandler(action.payload as AxiosError);
            })
            //updateService
            .addCase(updateService.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(updateService.fulfilled, (state) => {
                state.isLoading = false;
                state.error = undefined;
            })
            .addCase(updateService.rejected, (state, action) => {
                state.isLoading = false;
                state.error = errorHandler(action.payload as AxiosError);
            })
            ///
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
                state.splitters = [action.payload.data, ...state.splitters];
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
                const { parentId, children, total } = action.payload;

                if (parentId) {
                    const newNode: Record<string, IService[]> = {
                        [parentId]: children,
                    };
                    state.nodes = { ...state.nodes, ...newNode };
                } else {
                    state.nodes = { ...state.nodes, firstLevel: children };
                }

                state.servicesTotalCount = total;
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
