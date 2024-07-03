import { RootState } from 'app/providers/StoreProvider'

export const $userRole = (state: RootState) => state.login.userData?.role
