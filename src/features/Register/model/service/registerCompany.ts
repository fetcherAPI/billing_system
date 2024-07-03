import { createAsyncThunk } from '@reduxjs/toolkit'
import { RegisterApi } from '../../api/RegisterApi.ts'
import { ICompanyCreate } from '../../types/Company.ts'

export const registerCompany = createAsyncThunk(
    'createNewTender/send',
    async ({ param }: { param: ICompanyCreate }, { rejectWithValue }) => {
        try {
            const response = await RegisterApi.registerCompany(param)
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
