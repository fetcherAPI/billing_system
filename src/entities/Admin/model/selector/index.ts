import { RootState } from 'app/providers/StoreProvider'

export const $companiesList = (s: RootState) => s.admin.company.companiesList.content
export const $companiesTotalCount = (s: RootState) => s.admin.company.companiesList.totalElements
