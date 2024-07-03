import { createAsyncThunk } from '@reduxjs/toolkit'
import { AdminApi } from '../../api/AdminApi.ts'
import { IPaginationQueryParams } from '../../../../shared/types/baseTypes.ts'

export const getCompanies = createAsyncThunk(
    'getCompanies',
    async (param: IPaginationQueryParams, { rejectWithValue }) => {
        try {
            const response = await AdminApi.getCompanies(param)
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
