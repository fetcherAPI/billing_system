import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthApi } from '../../api/AuthApi.ts';
import { ILogin, ILoginResponse } from '../../types/LoginType';

export const login = createAsyncThunk('login/post', async (param: ILogin, { rejectWithValue }) => {
    try {
        const response = await AuthApi.Login(param);
        return response.data as ILoginResponse;
    } catch (error) {
        return rejectWithValue(error);
    }
});
