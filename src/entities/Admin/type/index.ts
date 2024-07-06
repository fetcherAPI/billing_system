export interface ICompany {
    id: number;
    inn: string;
    title: string;
    status: string;
}

export interface ICompanyDetails extends ICompany {
    notes?: string;
    legalAddress: string;
    factAddress: string;
    website: string;
    workPhone: string;
    dateCreated: string;
    ateId: string;
    ateName: string;
    managerInn: string;
    managerName: string;
    managerPosition: string;
}
