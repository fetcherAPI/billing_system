export interface IRegisterSliceSchema {
  registerData: IRegisterCompany;
  isLoading: boolean;
  error: string | undefined;
}

export interface IRegisterCompany {
  inn: string;
  title: string;
  notes: string;
  legalAddress: string;
  factAddress: string;
  website: string;
  workPhone: string;
  ateId: number;
}

export type keyOfRegisterSliceSchema = keyof IRegisterCompany;
