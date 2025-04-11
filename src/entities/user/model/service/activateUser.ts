import { createAsyncThunk } from '@reduxjs/toolkit';
import { UsersApi } from '../api/UsersApi';

export const activateUser = createAsyncThunk(
    'activateUser',
    async ({ id }: { id: number }, { rejectWithValue }) => {
        try {
            const response = await UsersApi.activateUser(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const deactivateUser = createAsyncThunk(
    'deactivateUser',
    async ({ id }: { id: number }, { rejectWithValue }) => {
        try {
            const response = await UsersApi.deactivateUser(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
