import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthApi } from '../../api/AuthApi.ts';
import { ILoginResponse } from '../../types/LoginType';

export const refreshToken = createAsyncThunk('refreshToken/get', async (_, { rejectWithValue }) => {
    try {
        const response = await AuthApi.refreshToken();
        return response.data as ILoginResponse;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || error.message);
    }
});
