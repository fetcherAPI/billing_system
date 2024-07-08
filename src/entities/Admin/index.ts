import { IAdminSliceSchema } from './type/AdminSliceSchema.ts';

export { activateCompany } from './model/service/activateCompany.ts';

export { useHandleGetCompanyDetails } from './hooks/useHandleGetCompanyDetails.ts';

export { getCompanies, getCompanyDetails } from './model/service/getCompanies.ts';

export { $companiesList, $companiesTotalCount, $companyDetails } from './model/selector';

export type { IAdminSliceSchema };
