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

export interface IService {
    id: number;
    date_created: string;
    destination: string;
    number: number;
    amount: number;
    role: string;
    payer_inn: string;
    payer_name: string;
    chapter_id: number;
    splitter: string;
    pay_id: number;
    status: number;
    payment_code: string;
}
