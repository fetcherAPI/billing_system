import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUserRegister } from 'shared/types';
import { UserRoles } from 'shared/types/baseTypes.ts';
import { UsersApi } from '../api/UsersApi';

export const registerUser = createAsyncThunk(
    'registerUser',
    async ({ param, userRole }: { param: IUserRegister; userRole: UserRoles }, { rejectWithValue }) => {
        try {
            const response = await UsersApi.registerUser(param, userRole);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const updateUser = createAsyncThunk(
    'updateUser',
    async ({ param, userId }: { param: IUserRegister; userId: number }, { rejectWithValue }) => {
        try {
            const response = await UsersApi.updateUser(param, userId);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const deleteUser = createAsyncThunk(
    'deleteUser',
    async ({ id }: { id: number }, { rejectWithValue }) => {
        try {
            await UsersApi.deleteUser(id);
            return id;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
