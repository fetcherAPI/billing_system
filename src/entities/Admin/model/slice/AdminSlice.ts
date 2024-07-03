import { createSlice } from '@reduxjs/toolkit'
import { errorHandler } from 'shared/lib'
import { AxiosError } from 'axios'
import { IAdminSliceSchema } from '../../type/AdminSliceSchema.ts'
import { getCompanies } from '../service/getCompanies.ts'
import { IResponseList } from '../../../../shared/types'
import { ICompany } from '../../type'

const initialState: IAdminSliceSchema = {
    company: {
        companiesList: {} as IResponseList<ICompany>,
        isLoading: false,
        error: '',
    },
}

const AdminSlice = createSlice({
    name: 'AdminSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCompanies.pending, (state) => {
                state.company.isLoading = true
            })
            .addCase(getCompanies.fulfilled, (state, action) => {
                state.company.companiesList = action.payload
                state.company.isLoading = false
            })
            .addCase(getCompanies.rejected, (state, action) => {
                state.company.isLoading = false
                state.company.error = errorHandler(action.payload as AxiosError)
            })
    },
})

export const AdminSliceReducer = AdminSlice.reducer
