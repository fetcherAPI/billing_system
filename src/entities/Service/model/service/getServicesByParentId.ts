import { createAsyncThunk } from '@reduxjs/toolkit';
import { ServiceApi } from 'entities/Service/api';
import { IPaginationQueryParams } from 'shared/types/baseTypes';

interface IParams extends IPaginationQueryParams {
    parentId?: string | null;
}

export const getServicesByParentId = createAsyncThunk(
    'getServicesByParentId',
    async ({ first, rows, parentId }: IParams, { rejectWithValue }) => {
        try {
            const response = await ServiceApi.getSerivcesTree({ first, rows }, parentId);
            const data = response;
            return { parentId, children: data };
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
