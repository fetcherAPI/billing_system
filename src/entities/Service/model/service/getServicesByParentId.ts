import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'app/providers/StoreProvider';
import { ServiceApi } from 'entities/Service/api';
import { IPaginationQueryParams } from 'shared/types/baseTypes';

interface IParams extends IPaginationQueryParams {
    parentId?: string | null;
}

export const getServicesByParentId = createAsyncThunk(
    'getServicesByParentId',
    async ({ first, rows, parentId }: IParams, { rejectWithValue, getState }) => {
        try {
            const state = getState() as RootState;
            const nodes = state.service.nodes;
            if (parentId && nodes[parentId]) {
                return { parentId, children: nodes[parentId], total: state.service.servicesTotalCount };
            } else if (!parentId && nodes['firstLevel']) {
                return { parentId, children: nodes['firstLevel'], total: state.service.servicesTotalCount };
            } else {
                const response = await ServiceApi.getSerivcesTree({ first, rows }, parentId);
                return { parentId, children: response.data.content, total: response.data.totalElements };
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
