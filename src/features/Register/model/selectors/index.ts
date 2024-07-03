import { RootState } from 'app/providers/StoreProvider'

export const $registerData = (state: RootState) => state.register.registerData
export const $createdCompanyId = (state: RootState) => state.register.createdCompanyId
