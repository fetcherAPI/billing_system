export interface ISplitterCreateDto {
    account: string;
    paymentCode: string;
    amount: number;
    chapterId: number;
}

export interface ISplitter {
    id: number;
    account: string;
    paymentCode: string;
    amount: number;
    serviceId: number;
    serviceName: string;
    chapterId: number;
}
